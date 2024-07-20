import os
from django.shortcuts import render
from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth import logout
from django.http import HttpResponse
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework import status, viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from auth_users.models import CustomModelUser
from .services import get_user_data
from .serializers import AuthSerializer
from .serializers import UserRegistrationSerializer
from .serializers import CustomTokenObtainPairSerializer
from .models import CustomModelUser



# views that handle 'localhost://8000/auth/api/login/google/'
class RegisterViewAPI(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerializer

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        user = CustomModelUser.objects.all()
        #TODO implement the registration logic
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                
                ### TODO unmark to send email notification to register user
                #send_email_to_user(user.email)
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class GoogleLoginApi(APIView):
    def get(self, request, *args, **kwargs):
        auth_serializer = AuthSerializer(data=request.GET)
        auth_serializer.is_valid(raise_exception=True)
        
        validated_data = auth_serializer.validated_data
        user_data = get_user_data(validated_data)
        
        user = CustomModelUser.objects.get(email=user_data['email'])
        login(request, user)
        print("base", os.environ.get("BASE_APP_URL"))
        token = user_data['token']
        frontend_url = os.environ.get("BASE_APP_URL")
        return redirect(frontend_url + f'?token={token}')

        # return redirect(os.environ.get("BASE_APP_URL"))

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CustomTokenObtainPairSerializer
    

class LogoutApi(APIView):
    def get(self, request, *args, **kwargs):
        logout(request)
        return HttpResponse('200')
