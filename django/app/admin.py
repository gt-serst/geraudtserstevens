from django.contrib import admin
from .models import User, Project, ProjectImage

# class UserAdmin(admin.ModelAdmin):
# 	list_display = ("username", "password")

# Register your models here.

admin.site.register(User)
admin.site.register(Project)
admin.site.register(ProjectImage)

