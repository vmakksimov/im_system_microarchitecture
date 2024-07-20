from rest_framework import serializers
from auth_users.models import CustomModelUser
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
     def validate(self, attrs):
        user = authenticate(username=attrs['email'], password=attrs['password'])
        if not user:
            raise serializers.ValidationError('Invalid credentials')

        data = super().validate(attrs)
        data.update({'user_id': user.id, 'email': user.email})
        return data
    


class AuthSerializer(serializers.Serializer):
    code = serializers.CharField(required=False)
    error = serializers.CharField(required=False)

class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomModelUser.objects.all())]
        
    )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomModelUser
        fields = ('email', 'password', 'password2',)
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs
    
    def validate_email(self, value):
        if CustomModelUser.objects.filter(email=value).exists():
            user = CustomModelUser.objects.get(email=value)
            if user.is_oauth_user:
                raise serializers.ValidationError(
                    "This email is registered via OAuth. Please use the 'Forgot Password' option to set a password."
                )
            else:
                raise serializers.ValidationError("This email is already registered.")
        return value

    def create(self, validated_data):
        user = CustomModelUser.objects.create(
            email=validated_data['email'],
            username=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    

