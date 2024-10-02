from django.db import models
import uuid
from django.conf import settings
from useraccount.models import User

class Basic_Details(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user = models.ForeignKey(User, related_name='basic_details', on_delete=models.CASCADE, unique=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    email = models.EmailField()
    github = models.URLField()
    profile_summary = models.TextField()
    skills = models.CharField(max_length=255)


class Experience(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user = models.ForeignKey(User, related_name='experiences', on_delete=models.CASCADE)
    designation = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(blank=True,null=True)
    still_working = models.BooleanField(null=True, blank=True)
    experience_summary = models.TextField()

class Projects(models.Model):
    project_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user = models.ForeignKey(User, related_name='projects', on_delete=models.CASCADE)
    project_name = models.CharField(max_length=255)
    project_link = models.URLField()
    project_technologies_used = models.CharField(max_length=255)
    project_description = models.TextField()

class Education(models.Model):
    education_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)    
    education_name = models.CharField(max_length=255)
    user = models.ForeignKey(User, related_name='education', on_delete=models.CASCADE)
    education_course = models.CharField(max_length=255)
    education_field_of_study = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(blank=True,null=True)
    still_studying = models.BooleanField(null=True, blank=True)
    education_summary = models.TextField()

class Certification(models.Model):
    certification_id= models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user = models.ForeignKey(User, related_name='certifications', on_delete=models.CASCADE)
    certification_link = models.URLField()
    certification_name = models.CharField(max_length=255)

class Languages(models.Model):
    language_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)    
    user = models.ForeignKey(User, related_name='languages', on_delete=models.CASCADE)
    language_name = models.CharField(max_length=255)
    fluency_choices = (
        ("basic","Basic"),("intermediate","Intermediate"),("fluent","Fluent"),("native","Native")
        )
    language_fluency = models.CharField(max_length=255,choices=fluency_choices)



