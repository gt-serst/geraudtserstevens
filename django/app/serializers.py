from rest_framework import serializers, validators
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from .models import User, Project, ProjectImage

class RegisterSerializer(serializers.ModelSerializer):
	"""
		Serializer to validate the register information sent from a user.
	"""
	# Minimun and maximun password length required
	username = serializers.CharField(
		max_length=15,
		error_messages={
			"max_length": "Le nom d'utilisateur doit contenir au plus 15 caractères."
		}
	)
	password = serializers.CharField(
		write_only=True,
		min_length=8,
		max_length=15,
		error_messages={
			"min_length": "Le mot de passe doit contenir au moins 8 caractères.",
			"max_length": "Le mot de passe doit contenir au plus 15 caractères."
		}
	)

	class Meta:
		model = User
		fields = ('id', 'username', 'password')
	def validate_username(self, value):
		if User.objects.filter(username=value).exists():
			raise serializers.ValidationError("Nom d'utilisateur déjà existant.")
		return value
	def create(self, validated_data):
		# Hash the password for security
		validated_data['password'] = make_password(validated_data['password'])
		return User.objects.create(**validated_data)

class LoginSerializer(serializers.Serializer):
	"""
		Serializer to validate the credentials sent from a user.
	"""
	username = serializers.CharField()
	password = serializers.CharField(write_only=True)

	def validate(self, attrs):
		# Verify if the username exists for that password
		user = authenticate(
			username=attrs['username'],
			password=attrs['password']
		)
		if not user:
			raise serializers.ValidationError("Les informations d'identification sont incorrectes.")
		attrs['user'] = user
		return attrs

class SendMailSerializer(serializers.Serializer):
	# Maximum subject length required
	subject = serializers.CharField(
		max_length=255,
		error_messages={
			"max_length":"Le sujet doit contenir au plus 255 caractères."
		}
	)
	message = serializers.CharField()
	from_email = serializers.EmailField()

class UpdateUsernameSerializer(serializers.ModelSerializer):
	"""
		Serializer to validate the new username sent from a user.
	"""
	username = serializers.CharField(
		max_length=15,
		error_messages={
			"max_length":"Le nom d'utilisateur doit contenir au plus 15 caractères."
		}
	)
	class Meta:
		model = User
		fields = ("username",)
	def validate_username(self, value):
		if User.objects.filter(username=value).exists():
			raise serializers.ValidationError("Nom d'utilisateur déjà existant.")
		return value

class UpdatePasswordSerializer(serializers.ModelSerializer):
	"""
		Serializer to validate the new password sent from a user.
	"""
	password = serializers.CharField(
		write_only=True,
		min_length=8,
		max_length=15,
		error_messages={
			"min_length": "Le mot de passe doit contenir au moins 8 caractères.",
			"max_length": "Le mot de passe doit contenir au plus 15 caractères."
		}
	)
	class Meta:
		model = User
		fields = ("password",)
	def update(self, instance, validated_data):
		instance.set_password(validated_data["password"])
		instance.save()
		return instance

class ProjectSerializer(serializers.ModelSerializer):
	class Meta:
		model = Project
		fields = "__all__"

class ProjectImageSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProjectImage
		fields = ("image",)
