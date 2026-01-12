from rest_framework import serializers, validators
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate

class RegisterSerializer(serializers.ModelSerializer):
	"""
	Serializer to validate the register information sent from a user.
	"""
	# Minimun and maximun password length required
	password = serializers.CharField(write_only=True, min_length=8, max_length=15)
	class Meta:
		model = User
		fields = ('id', 'username', 'password')
	def __init__(self, *args, **kwargs):
		# Overide the constructor to customize error message
		super(RegisterSerializer, self).__init__(*args, **kwargs)
		for validator in self.fields['username'].validators:
			if isinstance(validator, validators.UniqueValidator):
				validator.message = "Ce nom d'utilisateur existe déjà."
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
			raise serializers.ValidationError("Les informations d'identification sont inc")
		attrs['user'] = user
		return attrs

class SendMailSerializer(serializers.Serializer):
	# Maximum subject length required
	subject = serializers.CharField(max_length=255)
	message = serializers.CharField()
	from_email = serializers.EmailField()

