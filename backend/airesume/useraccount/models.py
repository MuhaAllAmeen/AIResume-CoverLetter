from typing import Any
import uuid

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.db import models

class CustomUserManager(UserManager):
    def _create_user(self,name,email,password,**extra_feilds):
        if not email:
            raise ValueError("You have not specified a valid email-address")
        email = self.normalize_email(email=email)
        user = self.model(email,name, **extra_feilds)
        user.set_password(password)
        user.save(using=self.db)
        return user
    
    def create_user(self,name=None, email=None,password=None, **extra_feilds):
        extra_feilds.setdefault('is_staff',False)
        extra_feilds.setdefault('is_superuser',False)
        return self._create_user(name,email,password,**extra_feilds)
    
    def create_superuser(self, name=None, email= None, password=None, **extra_fields: Any) -> Any:
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self._create_user(name, email, password, **extra_fields)
    
class User(AbstractBaseUser,PermissionsMixin):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255,unique=True)

    is_active= models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff= models.BooleanField(default=False)

    date_joined = models.DateField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True,null=True)

    objects = CustomUserManager()
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email']
    def avatar_url(self):
        if self.avatar:
            return f'{settings.WEBSITE_URL}{self.avatar.url}' 
        else:
            return "" 
         