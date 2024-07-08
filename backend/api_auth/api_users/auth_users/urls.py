from django.urls import path
from .views import GoogleLoginApi, LogoutApi

urlpatterns = [
    path('api/login/google/', GoogleLoginApi.as_view(), name='google_login'),  # Add this line for Google login
    path('api/logout/', LogoutApi.as_view(), name='logout'),
]