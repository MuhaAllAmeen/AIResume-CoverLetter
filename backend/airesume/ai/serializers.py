from useraccount.serializers import UserDetailSerializer
from .models import Basic_Details
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