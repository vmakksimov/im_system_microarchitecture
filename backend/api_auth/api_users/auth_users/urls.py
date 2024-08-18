from django.urls import path
from .views import GoogleLoginApi, LogoutApi, RegisterViewAPI
from rest_framework_simplejwt.views import TokenRefreshView
from .views import CustomTokenObtainPairView, SetPasswordView, ExchangeTokenView

urlpatterns = [
    path('register/', RegisterViewAPI.as_view(), name="create_user"),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/login/google/', GoogleLoginApi.as_view(), name='google_login'),
    path('api/logout/', LogoutApi.as_view(), name='logout'),
    path('api/exchange-token/', ExchangeTokenView.as_view(), name='exchange_token'),
    path('set-password/', SetPasswordView.as_view(), name='set-password'),
]