from useraccount.serializers import UserDetailSerializer
from .models import Basic_Details, Experience, Projects, Education, Certification, Languages
from rest_framework import serializers

class CVDetailSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only = True, many = False)
    class Meta:
        model = Basic_Details
        fields = (
            'id',
            'name',
            'phone',
            'email',
            'github',
            'profile_summary',
            'skills',
        )
class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields=(
            'id',
            'designation',
            'company_name',
            'location',
            'start_date',
            'end_date',
            'still_working',
            'experience_summary',
        )

class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields=(
            'project_id',
            'project_name',
            'project_link',
            'project_technologies_used',
            'project_description'
        )

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields=(
            'education_id',
            'education_name',
            'education_course',
            'education_field_of_study',
            'start_date',
            'end_date',
            'still_studying',
            'education_summary'
        )


class CertificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields=(
            'certification_id',
            'certification_link',
            'certification_name'
        )


class LanguagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Languages
        fields=(
            'language_id',
            'language_name',
            'language_fluency'
        )




