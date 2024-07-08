from django.contrib.auth import base_user as auth_base
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.contrib.auth.models import User, PermissionsMixin, UserManager


from django.core.validators import MinLengthValidator
from django.db import models
from django.contrib.auth import models as auth_models


from .manager import CustomManager


class CustomModelUser(auth_models.AbstractBaseUser, auth_models.PermissionsMixin):
    EMAIL_NAME_MAX_LENGTH = 50
    FIRST_NAME_MAX_LENGTH = 30
    LAST_NAME_MAX_LENGTH = 30

    USERNAME_NAME_MAX_LENGTH = 30

    email = models.CharField(
        max_length=EMAIL_NAME_MAX_LENGTH,
        unique=True,
    )

    username = models.CharField(
        max_length=USERNAME_NAME_MAX_LENGTH,
        unique=True,
        default='',
    )

    first_name = models.CharField(
        max_length=FIRST_NAME_MAX_LENGTH,
        default='',
        
    )

    last_name = models.CharField(
        max_length=LAST_NAME_MAX_LENGTH,
        default='',
        
    )



    date_joined = models.DateTimeField(
        auto_now_add=True,

    )

    is_staff = models.BooleanField(
        default=False,
    )

    USERNAME_FIELD = 'email'

    objects = CustomManager()
    class Meta:
        verbose_name = 'CustomUser'
