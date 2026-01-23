from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
	"""
	Custom User model.
	"""
	pass

class Project(models.Model):
	title = models.CharField(max_length=50)
	description = models.TextField(max_length=200)
	content = models.TextField(max_length=5000)
	cover = models.CharField(max_length=50)
	images = models.JSONField()


