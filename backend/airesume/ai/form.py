from django.forms import ModelForm

from .models import Certification,Basic_Details, Experience,Education,Projects,Languages

class BasicDetailsForm(ModelForm):
    class Meta:
        model = Basic_Details
        fields = (
            'name',
            'phone',
            'email',
            'github',
            'profile_summary',
            'skills',
        )

class ExperienceForm(ModelForm):
    class Meta:
        model = Experience
        fields=(
            'designation',
            'company_name',
            'location',
            'start_date',
            'end_date',
            'still_working',
            'experience_summary',

        )

class ProjectsForm(ModelForm):
    class Meta:
        model = Projects
        fields=(
            'project_name',
            'project_link',
            'project_technologies_used',
            'project_description'
        )

class EducationForm(ModelForm):
    class Meta:
        model = Education
        fields=(
            'education_name',
            'education_course',
            'education_field_of_study',
            'start_date',
            'end_date',
            'still_studying',
            'education_summary'
        )

class CertificationsForm(ModelForm):
    class Meta:
        model = Certification
        fields=(
            'certification_link',
            'certification_name'
        )

class LanguagesForm(ModelForm):
    class Meta:
        model = Languages
        fields=(
            'language_name',
            'language_fluency'
        )



