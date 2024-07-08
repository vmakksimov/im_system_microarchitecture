import os
from django.shortcuts import render
from .services import get_user_data
from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth import login
from rest_framework.views import APIView
from .serializers import AuthSerializer

from django.contrib.auth import logout
from rest_framework.views import APIView
from django.http import HttpResponse
from auth_users.models import CustomModelUser

# views that handle 'localhost://8000/auth/api/login/google/'
class GoogleLoginApi(APIView):
    def get(self, request, *args, **kwargs):
        auth_serializer = AuthSerializer(data=request.GET)
        auth_serializer.is_valid(raise_exception=True)
        
        validated_data = auth_serializer.validated_data
        user_data = get_user_data(validated_data)
        
        user = CustomModelUser.objects.get(email=user_data['email'])
        login(request, user)
        print("base", os.environ.get("BASE_APP_URL"))

        return redirect(os.environ.get("BASE_APP_URL"))
    



class LogoutApi(APIView):
    def get(self, request, *args, **kwargs):
        logout(request)
        return HttpResponse('200')
