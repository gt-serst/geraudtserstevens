from django.shortcuts import render
from .serializers import RegisterSerializer, LoginSerializer, SendMailSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from django.conf import settings

# Create your views here.

def render_home(request):
	response = render(request, 'test/login.html')
	return response

class RegisterView(APIView):
	"""
		Register view to list all users or create a new user.
	"""
	def get(self, request, format=None):
		users = User.objects.all()
		serializer = RegisterSerializer(users, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		serializer = RegisterSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
	"""
		Login view to connect a user with the site and refresh his token.
	"""
	def post(self, request):
		serializer = LoginSerializer(data=request.data)
		if serializer.is_valid():
			user = serializer.validated_data['user']
			# Generate a refresh token for the user
			refresh = RefreshToken.for_user(user)
			return Response({
				'access': str(refresh.access_token),
				'refresh': str(refresh),
				'user': {'id': user.id, 'username': user.username}
			})
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CookieTokenRefreshView(APIView):
	"""
		Token view to refresh an access token from a user.
	"""
	def post(self, request):
		# Get the refresh token from the cookie
		refresh_token = request.COOKIES.get("refresh_token")
		if not refresh_token:
			return Response({"detail": "No refresh token"}, status=400)
		try:
			refresh = RefreshToken(refresh_token)
			access_token = str(refresh.access_token)
			return Response({"access": access_token})
		except Exception:
			raise InvalidToken("Invalid refresh token")

class ProfileView(APIView):
	"""
	Profile view to authorize a user to see his profile information if his token is valid.
	"""
	permission_classes = [IsAuthenticated]
	def get(self, request):
		# The following line verify that the token is valid
		user = request.user
		return Response({
			"id" : user.id,
			"username": user.username,
			"date_joined": user.date_joined
		})

class LogoutView(APIView):
	"""
	Logout view to deconnect a user with the site and blacklist his token. The access token will take five minutes to expirate but the refresh token
	could not generate an access token anynmore.
	"""
	def post(self, request):
		try:
			refresh_token = request.data["refresh"]
			refresh = RefreshToken(refresh_token)
			# Set the refresh token in blacklist
			refresh.blacklist()
			return Response(status=status.HTTP_205_RESET_CONTENT)
		except Exception as e:
			return Response(status=status.HTTP_400_BAD_REQUEST)

class SendMailView(APIView):
	def post(self, request):
		serializer = SendMailSerializer(data=request.data)
		if serializer.is_valid():
			try:
				send_mail(
					subject=serializer.validated_data['subject'],
					message=serializer.validated_data['message'],
					from_email=serializer.validated_data['from_email'],
					recipient_list=[settings.EMAIL_HOST_USER],
					fail_silently=False
				)
				return Response({"message": "Email sent successfully"}, status=status.HTTP_200_OK)
			except Exception:
				return Response(
					{"error": "Error while sending the email"},
					status=status.HTTP_500_INTERNAL_SERVER_ERROR
					)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
