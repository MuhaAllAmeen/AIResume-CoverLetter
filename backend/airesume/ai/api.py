import os
from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .form import BasicDetailsForm, ExperienceForm, ProjectsForm, EducationForm, LanguagesForm, CertificationsForm
from .models import Basic_Details,Experience,Projects,Education,Languages,Certification
from .serializers import CVDetailSerializer
from useraccount.models import User
from rest_framework_simplejwt.tokens import AccessToken
import google.generativeai as genai

@api_view(['POST'])
def create_CV_Details(request):
    basic_details_form = BasicDetailsForm(request.POST)
    experience_form = ExperienceForm(request.POST)
    projects_form = ProjectsForm(request.POST)
    education_form = EducationForm(request.POST)
    languages_form = LanguagesForm(request.POST)
    certifications_form = CertificationsForm(request.POST)
    print(basic_details_form, experience_form)
    if basic_details_form.is_valid and experience_form.is_valid and projects_form.is_valid and education_form.is_valid and languages_form.is_valid and certifications_form.is_valid:
        basic_details = basic_details_form.save(commit=False)
        basic_details.user = request.user
        basic_details.save()
        experience_details = experience_form.save(commit=False)
        experience_details.user = request.user
        experience_details.save()
        projects_details = projects_form.save(commit=False)
        projects_details.user = request.user
        projects_details.save()
        education_details = education_form.save(commit=False)
        education_details.user = request.user
        education_details.save()
        languages_details = languages_form.save(commit=False)
        languages_details.user = request.user
        languages_details.save()
        certifications_details = certifications_form.save(commit=False)
        certifications_details.user = request.user
        certifications_details.save()
        return JsonResponse({"success":True})
    else:
        return JsonResponse({'errors': basic_details_form.errors.as_json()}, status=400)
    
@api_view(['POST'])
def recieve_job_post(request):
    job_summary = request.data.get('job_summary', '')
    action = request.data.get('action', '')
    user = request.user
    cv_details = {}
    experience_details_dict = {}
    project_details_dict = {}
    education_details_dict = {}
    certification_details_dict = {}
    language_details_dict = {}
    print(request.user)
    print(job_summary)

    basic_details = Basic_Details.objects.get(user=user)
    basic_fields = [field.name for field in Basic_Details._meta.get_fields() if field.name not in ['id', 'user', 'project_id', 'education_id', 'certification_id', 'language_id']]    
    
    experience_details = Experience.objects.filter(user=user)
    experience_fields = [field.name for field in Experience._meta.get_fields() if field.name not in ['id', 'user', 'project_id', 'education_id', 'certification_id', 'language_id']]

    project_details = Projects.objects.filter(user=user)
    project_fields = [field.name for field in Projects._meta.get_fields() if field.name not in ['id', 'user', 'project_id', 'education_id', 'certification_id', 'language_id']]

    education_details = Education.objects.filter(user=user)
    education_fields = [field.name for field in Education._meta.get_fields() if field.name not in ['id', 'user', 'project_id', 'education_id', 'certification_id', 'language_id']]

    certification_details = Certification.objects.filter(user=user)
    certification_fields = [field.name for field in Certification._meta.get_fields() if field.name not in ['id', 'user', 'project_id', 'education_id', 'certification_id', 'language_id']]

    language_details = Languages.objects.filter(user=user)
    language_fields = [field.name for field in Languages._meta.get_fields() if field.name not in ['id', 'user', 'project_id', 'education_id', 'certification_id', 'language_id']]

    for field in basic_fields:
        cv_details[field] = getattr(basic_details, field, None)
    
    for field in experience_fields:
        experience_details_dict[field] = getattr(experience_details[0], field, None)
    cv_details['Experience'] = experience_details_dict
    
    for field in project_fields:
        project_details_dict[field] = getattr(project_details[0], field, None)
    cv_details['Projects'] = project_details_dict

    for field in education_fields:
        education_details_dict[field] = getattr(education_details[0], field, None)
    cv_details['Education'] = education_details_dict
    
    for field in certification_fields:
        certification_details_dict[field] = getattr(certification_details[0], field, None)
    cv_details['Certifications'] = certification_details_dict
    
    for field in language_fields:
        language_details_dict[field] = getattr(language_details[0], field, None)
    cv_details['Languages'] = language_details_dict
    print(cv_details)
    if action=="cover letter":
        cover_letter = generate_cover_letter(cv_details=cv_details,job_summary=job_summary)
        return JsonResponse({"success":True,"content":cover_letter})
    else:
        resume = generate_resume(cv_details=cv_details,job_summary=job_summary)
        return JsonResponse({"success":True,"content":resume})



def generate_cover_letter(cv_details,job_summary):
    instruction = "You are a cover letter writer.You will be provided with my details and the job Im trying to apply to. Generate a cover letter with the details you have and limit the letter to 4 paragraphs. Try to make the letter professional. Try to emphasize my experience and my achievements and how I would be a good fit. Start the letter with dear recruiter. Try to retrieve my name, email and phone number as well as my skills, experience and projects from the details provided to you. Give the Output in html format. Leave out the html and body tags. Try to divide content in paragraphs and give line breaks wherever necessary "
    genai.configure(api_key=os.environ.get("API_KEY"))
    model = genai.GenerativeModel("gemini-1.5-flash",system_instruction=instruction)
    response = model.generate_content(f"this is the summary: ${job_summary}and here are the person's details: ${cv_details}")
    print(response.text)
    return response.text

def generate_resume(cv_details, job_summary):
    instruction = "You are a Resume writer specializing in writing resumes for software developers. You recieve the my past details such as experiences, projects, education as JSON as well as the job summary of the job I'm applying to. Generate a Resume based on the my details and the job summary given. Try to enhance my experience according to the job summary. Your response must be a JSON object containing the keys: Name, Phone, Email, Github Link, Profile Summary, Skills, Experience, Projects, Education, Certifications, Languages"
    genai.configure(api_key=os.environ.get("API_KEY"))
    model = genai.GenerativeModel("gemini-1.5-flash",system_instruction=instruction)
    response = model.generate_content(f"this is the summary: ${job_summary}and here are the my details: ${cv_details}")
    print(response.text)
    return response.text

    
