from django.db import models
from django.contrib.auth.hashers import make_password

class User(models.Model):
	username = models.CharField(max_length=15, unique=True, blank=False)
	password = models.CharField(max_length=200)
	def set_password(self, raw_password):
		self.password = make_password(raw_password)
		self.save()

	def __str__(self):
		return self.username
