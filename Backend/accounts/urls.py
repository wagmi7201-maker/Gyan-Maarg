"""Accounts app URL configuration."""
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
    path("wake-up/", views.wake_up, name="wake_up"),
    path("signup/", views.SignupView.as_view(), name="signup"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("generate_roadmap/", views.GenerateRoadmapView.as_view(), name="generate_roadmap"),
    path("generate_roadmap", views.GenerateRoadmapView.as_view(), name="generate_roadmap_no_slash"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
