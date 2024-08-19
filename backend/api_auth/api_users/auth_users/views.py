import os
from django.contrib.auth import logout
from django.contrib.auth.hashers import make_password
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework import status, viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from auth_users.models import CustomModelUser
from .services import get_user_data
from .serializers import AuthSerializer
from .serializers import UserRegistrationSerializer
from .serializers import CustomTokenObtainPairSerializer
from .models import CustomModelUser
import logging



# views that handle 'localhost://8000/auth/api/login/google/'
class RegisterViewAPI(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerializer

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        user = CustomModelUser.objects.all()
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
        token = user_data['token']
        frontend_url = os.environ.get("BASE_APP_URL")
        
        # Create a temporary, secure cookie with the token
        response = HttpResponseRedirect(frontend_url + '/auth-callback')
        response.set_cookie('temp_token', token, httponly=True, secure=False, samesite='Lax', max_age=300)  # max_age: 5 minutes
        return response        
        
        #login(request, user)
        # return redirect(frontend_url + f'?token={token}')


@method_decorator(csrf_protect, name='dispatch')
class ExchangeTokenView(APIView):
    def post(self, request):
        print('request in exchange', request)
        # csfr = request.COOKIES.get('csrftoken')
        # print('csfr in exchange', csfr)
        temp_token = request.COOKIES.get('temp_token')
        if not temp_token:
            return Response({'error': 'No temporary token found'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Here, you might want to add additional validation of the temp_token
        
        response = Response({'token': temp_token})
        response.delete_cookie('temp_token')
        return response

class SetPasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def post (self, request):
        user = request.user
        password = request.data.get("password")
        if not password:
            logging.info("Password is required!")
            return Response({"Message": "Password is required!"}, status=status.HTTP_400_BAD_REQUEST)
        
        user.password = make_password(password)
        user.save()
        logging.info("Password updated successfully!")
        return Response({"detail": "Password updated successfully"}, status=status.HTTP_200_OK)


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CustomTokenObtainPairSerializer
    

class LogoutApi(APIView):
    def get(self, request, *args, **kwargs):
        logout(request)
        return HttpResponse('200')
