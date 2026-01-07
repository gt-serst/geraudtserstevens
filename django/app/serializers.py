from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class RegisterSerializer(serializers.ModelSerializer):
	# Minimun password length required
	password = serializers.CharField(write_only=True, min_length=8)
	class Meta:
		model = User
		fields = ('id', 'username', 'email', 'password')
	def create(self, validated_data):
		# Hash the password for security
		validated_data['password'] = make_password(validated_data['password'])
		return User.objects.create(**validated_data)
