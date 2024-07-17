from django.urls import path
from .views import GoogleLoginApi, LogoutApi, RegisterViewAPI

urlpatterns = [
    path('register/', RegisterViewAPI.as_view(), name="create_user"),
    path('api/login/google/', GoogleLoginApi.as_view(), name='google_login'),  # Add this line for Google login
    path('api/logout/', LogoutApi.as_view(), name='logout'),
]