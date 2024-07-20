import os
from django.conf import settings
from django.shortcuts import redirect
from django.core.exceptions import ValidationError
from urllib.parse import urlencode
from typing import Dict, Any
from auth_users.models import CustomModelUser
import requests
import jwt

GOOGLE_ACCESS_TOKEN_OBTAIN_URL = 'https://oauth2.googleapis.com/token'
GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'
LOGIN_URL = f'{os.environ.get("BASE_APP_URL")}/internal/login'

# Exchange authorization token with access token
def google_get_access_token(code: str, redirect_uri: str) -> str:
    data = {
        'code': code,
        'client_id': os.environ.get("GOOGLE_OAUTH2_CLIENT_ID"),
        'client_secret': os.environ.get("GOOGLE_OAUTH2_CLIENT_SECRET"),
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }

    response = requests.post(GOOGLE_ACCESS_TOKEN_OBTAIN_URL, data=data)
    if not response.ok:
        raise ValidationError('Could not get access token from Google.')
    
    access_token = response.json()['access_token']

    return access_token

# Get user info from google
def google_get_user_info(access_token: str) -> Dict[str, Any]:
    response = requests.get(
        GOOGLE_USER_INFO_URL,
        params={'access_token': access_token}
    )

    if not response.ok:
        raise ValidationError('Could not get user info from Google.')
    
    print("response from json",response.json())
    return response.json()

def create_jwt_token(user):
    payload = {
        'user_id': user.id,
        'email': user.email,
        # Add any other relevant user info
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token


def get_user_data(validated_data):
    domain = os.environ.get("BASE_API_URL")
    redirect_uri = f'{domain}/auth/api/login/google/'

    code = validated_data.get('code')
    error = validated_data.get('error')

    if error or not code:
        params = urlencode({'error': error})
        return redirect(f'{LOGIN_URL}?{params}')
    
    access_token = google_get_access_token(code=code, redirect_uri=redirect_uri)
    user_data = google_get_user_info(access_token=access_token)

    # Creates user in DB if first time login
    user, created = CustomModelUser.objects.get_or_create(
        email=user_data['email'],
        defaults={
            'username': user_data['email'],
            'first_name': user_data.get('given_name'), 
            'last_name': user_data.get('family_name'),
            'is_oauth_user': True
        }
    )

    if created:
        user.set_unusable_password()
        user.save()

    token = create_jwt_token(user)
    
    profile_data = {
        'email': user_data['email'],
        'first_name': user_data.get('given_name'),
        'last_name': user_data.get('family_name'),
        'token': token,
        'is_oauth_user': True
    }
    return profile_data