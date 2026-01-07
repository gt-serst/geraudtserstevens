from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate

class RegisterSerializer(serializers.ModelSerializer):
	# Minimun password length required
	password = serializers.CharField(write_only=True, min_length=8, max_length=15)
	class Meta:
		model = User
		fields = ('id', 'username', 'password')
	def create(self, validated_data):
		# Hash the password for security
		validated_data['password'] = make_password(validated_data['password'])
		return User.objects.create(**validated_data)

class LoginSerializer(serializers.Serializer):
	username = serializers.CharField()
	password = serializers.CharField(write_only=True)

	def validate(self, attrs):
		# Verify if the username exists for that password
		user = authenticate(
			username=attrs['username'],
			password=attrs['password']
		)
		if not user:
			raise serializers.ValidationError("Invalid credentials")
		attrs['user'] = user
		return attrs
