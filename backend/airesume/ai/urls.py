from django.urls import path

from . import api

urlpatterns = [
    path('create/',api.create_CV_Details,name='api_create_CV_Details'),
    path('job/',api.recieve_job_post,name="api_recieve_job_post"),
    path('<uuid:pk>/',api.get_details,name='api_get_details')
]