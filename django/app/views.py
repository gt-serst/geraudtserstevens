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
from .authenticate import CustomAuthentication
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse

@ensure_csrf_cookie
def get_csrf(request):
	"""
	Generate and stock the CSRF cookie
	"""
	return JsonResponse({"detail": "CSRF cookie set"})

# Create your views here.

def render_home(request):
	response = render(request, 'test/login.html')
	return response

class RegisterView(APIView):
	"""
		Register view to list all users or create a new user.
	"""
	def get(self, request):
		users = User.objects.all()
		serializer = RegisterSerializer(users, many=True)
		return Response(serializer.data)

	def post(self, request):
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
			response = Response({"user": {"id": user.id, "username": user.username}})
			response.set_cookie(
				key=settings.SIMPLE_JWT["AUTH_COOKIE"],
				value=refresh.access_token,
				domain=settings.SIMPLE_JWT["AUTH_COOKIE_DOMAIN"],
				path=settings.SIMPLE_JWT["AUTH_COOKIE_PATH"],
				expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
				secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
				httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
				samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
			)
			response.set_cookie(
				key=settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"],
				value=refresh,
				domain=settings.SIMPLE_JWT["AUTH_COOKIE_DOMAIN"],
				path=settings.SIMPLE_JWT["AUTH_COOKIE_PATH"],
				expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
				secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
				httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
				samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
			)
			return response
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CookieTokenRefreshView(APIView):
	"""
		Token view to refresh an access token from a user.
	"""
	def post(self, request):
		# Get the refresh token from the cookie
		refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
		if not refresh_token:
			return Response({"detail": "No refresh token"}, status=400)
		try:
			refresh = RefreshToken(refresh_token)
			access_token = str(refresh.access_token)
			response = Response({"access": access_token})
			response.set_cookie(
				key=settings.SIMPLE_JWT["AUTH_COOKIE"],
				value=access_token,
				domain=settings.SIMPLE_JWT["AUTH_COOKIE_DOMAIN"],
				path=settings.SIMPLE_JWT["AUTH_COOKIE_PATH"],
				expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
				secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
				httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
				samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
			)
			return response
		except Exception:
			raise InvalidToken("Invalid refresh token")

class ProfileView(APIView):
	"""
	Profile view to authorize a user to see his profile information if his token is valid.
	"""
	authentication_classes = [CustomAuthentication]
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
			refresh_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"])
			refresh = RefreshToken(refresh_token)
			# Set the refresh token in blacklist
			refresh.blacklist()
			response = Response(status=status.HTTP_205_RESET_CONTENT)
			response.delete_cookie(settings.SIMPLE_JWT["AUTH_COOKIE"])
			return response
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

"""
class CookieStrategy {
    // Main authentication cookie - balanced security and UX
    setAuthCookie(res, token) {
        res.cookie('auth', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',  // Good default
            maxAge: 7 * 24 * 60 * 60 * 1000,  // 1 week
            path: '/'
        });
    }

    // High-security operations cookie - maximum protection
    setSecureActionCookie(res, token) {
        res.cookie('secure_action', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',  // Maximum security
            maxAge: 15 * 60 * 1000,  // 15 minutes only
            path: '/account'  // Restricted path
        });
    }

    // Cross-domain SSO cookie - needed for integrations
    setSSOCookie(res, token) {
        res.cookie('sso', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',  // Required for cross-site
            maxAge: 60 * 60 * 1000,  // 1 hour
            domain: '.sso-provider.com'
        });

        // Additional CSRF protection since we're using None
        res.cookie('csrf', generateCSRFToken(), {
            secure: true,
            sameSite: 'strict',  // CSRF token can be strict!
            maxAge: 60 * 60 * 1000
        });
    }

    // Remember me cookie - long-lived but limited scope
    setRememberMeCookie(res, token) {
        res.cookie('remember', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days
            path: '/auth'  // Only for auth endpoints
        });
    }
}
"""
