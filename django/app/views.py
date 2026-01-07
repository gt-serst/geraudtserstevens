from django.shortcuts import render
from .serializers import RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

def render_home(request):
    response = render(request, 'test/login.html')
    return response

class RegisterView(APIView):
    def get(self, request, format=None):
        """
        Intercepting GET request to list all users.
        """
        users = User.objects.all()
        serializer = RegisterSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        Intercepting POST request to create a new user.
        """
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
