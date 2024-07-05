from django.contrib.auth import base_user as auth_base
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.contrib.auth.models import User, PermissionsMixin, UserManager


from django.core.validators import MinLengthValidator
from django.db import models
from django.contrib.auth import models as auth_models


from .manager import CustomManager


class CustomModelUser(auth_models.AbstractBaseUser, auth_models.PermissionsMixin):
    USER_NAME_MAX_LENGTH = 25

    email = models.CharField(
        max_length=USER_NAME_MAX_LENGTH,
        unique=True,
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
