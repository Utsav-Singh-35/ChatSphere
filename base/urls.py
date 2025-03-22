from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('chat/', views.chat, name='chat'),
    path('logout/', views.logout_view, name='logout'),
]