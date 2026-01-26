"""
URL configuration for geraudtserstevens project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
	path('admin/', admin.site.urls),
	path('', views.render_home),
	path('api/csrftoken/', views.get_csrf, name='csrftoken'),
	path('api/auth/register/', views.RegisterView.as_view(), name='register'),
	path('api/auth/login/', views.LoginView.as_view(), name='login'),
	path('api/auth/refresh/', views.CookieRefreshView.as_view(), name='refresh'),
	path('api/auth/logout/', views.LogoutView.as_view(), name='logout'),
	path('api/account/profile/', views.ProfileView.as_view(), name='profile'),
	path('api/contact/sendmail/', views.SendMailView.as_view(), name='sendmail'),
	path('api/account/username/', views.UpdateUsernameView.as_view(), name='username'),
	path('api/account/password/', views.UpdatePasswordView.as_view(), name='password'),
	path("api/project/<int:project_id>/", views.ProjectView.as_view(), name='project'),
	path("api/projects/", views.ProjectsView.as_view(), name='projects'),
	path("api/projectimages/<int:project_id>/", views.ProjectImagesView.as_view(), name='projectimages')
]

if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

