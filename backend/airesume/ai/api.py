import os
from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .form import BasicDetailsForm, ExperienceFormSet, ProjectFormSet, EducationFormSet, LanguagesFormSet, CertificationFormSet
from .models import Basic_Details,Experience,Projects,Education,Languages,Certification
from .serializers import CVDetailSerializer
from useraccount.models import User
from rest_framework_simplejwt.tokens import AccessToken
import google.generativeai as genai

@api_view(['POST'])
def create_CV_Details(request):
    basic_details_form = BasicDetailsForm(request.POST)
    experience_formset = ExperienceFormSet(request.POST,prefix="experience")
    projects_formset = ProjectFormSet(request.POST,prefix="project")
    education_formset = EducationFormSet(request.POST,prefix="education")
    languages_formset = LanguagesFormSet(request.POST,prefix="language")
    certifications_formset = CertificationFormSet(request.POST,prefix="certification")
    print(basic_details_form, experience_formset, certifications_formset, languages_formset)
    if basic_details_form.is_valid and experience_formset.is_valid and projects_formset.is_valid and education_formset.is_valid and languages_formset.is_valid and certifications_formset.is_valid:
        basic_details = basic_details_form.save(commit=False)
        basic_details.user = request.user
        basic_details.save()

        experience_details = experience_formset.save(commit=False)
        for experience in experience_details:
            experience.user = request.user
            experience.save()

        projects_details = projects_formset.save(commit=False)
        for project in projects_details:
            project.user = request.user
            project.save()

        education_details = education_formset.save(commit=False)
        for education in education_details:
            education.user = request.user
            education.save()

        languages_details = languages_formset.save(commit=False)
        for language in languages_details:
            language.user = request.user
            language.save()

        certifications_details = certifications_formset.save(commit=False)
        for certification in certifications_details:
            certification.user = request.user
            certification.save()

        return JsonResponse({"success":True})
    else:
        return JsonResponse({'errors': basic_details_form.errors.as_json()}, status=400)
    
@api_view(['POST'])
def recieve_job_post(request):
    job_summary = request.data.get('job_summary', '')
    action = request.data.get('action', '')
    user = request.user
    
    print(request.user)
    print(job_summary)
    cv_details = getAndReturnDetails(user=user)

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



    
@api_view(['GET'])
@permission_classes([])
@authentication_classes([])
def get_details(request,pk):
    # try:
    #     token = request.META['HTTP_AUTHORIZATION'].split('Bearer ')[1]
    #     token = AccessToken(token)
    #     user_id = token.payload['user_id']
    #     user = User.objects.get(pk=user_id)
    # except Exception as e:
    #     user = None
    user = User.objects.get(pk=pk)
    
    cv_details = getAndReturnDetails(user=user)
    if len(cv_details)>0:
        return JsonResponse({"success":True,"content":cv_details})
    else:
        return JsonResponse({"success":False})

def getAndReturnDetails(user):
    cv_details = {}
    experience_details_list = []
    project_details_list = []
    education_details_list = []
    certification_details_list = []
    language_details_list = []
    
    try:

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
        
        for experience in experience_details:
            experience_details_dict = {}
            for field in experience_fields:
                experience_details_dict[field] = getattr(experience, field, None)
            experience_details_list.append(experience_details_dict)
        cv_details['Experience'] = experience_details_list
        
        for project in project_details:
            project_details_dict = {}
            for field in project_fields:
                project_details_dict[field] = getattr(project, field, None)
            project_details_list.append(project_details_dict)
        cv_details['Projects'] = project_details_list

        for education in education_details:
            education_details_dict = {}
            for field in education_fields:
                education_details_dict[field] = getattr(education, field, None)
            education_details_list.append(education_details_dict)
        cv_details['Education'] = education_details_list
        
        for certification in certification_details:
            certification_details_dict = {}
            for field in certification_fields:
                certification_details_dict[field] = getattr(certification, field, None)
            certification_details_list.append(certification_details_dict)
        cv_details['Certifications'] = certification_details_list
        
        for language in language_details:
            language_details_dict = {}
            for field in language_fields:
                language_details_dict[field] = getattr(language, field, None)
            language_details_list.append(language_details_dict)
        cv_details['Languages'] = language_details_list
    except:
        return cv_details


    return cv_details
