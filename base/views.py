from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login as auth_login, logout
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required

# Create your views here.

def home(request):
    return render(request, 'index.html')

def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            auth_login(request, user)
            return redirect('chat')
        else:
            messages.error(request, 'Invalid username or password')
    
    return render(request, 'src/login.html')

def logout_view(request):
    logout(request)
    return redirect('home')


@csrf_protect
def signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')
        
        if password1 != password2:
            messages.error(request, 'Passwords do not match')
            return render(request, 'src/signup.html')
        
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists')
            return render(request, 'src/signup.html')
        
        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already exists')
            return render(request, 'src/signup.html')
        
        try:
            user = User.objects.create_user(username=username, email=email, password=password1)
            user.save()
            auth_login(request, user)
            return redirect('chat')
        except Exception as e:
            messages.error(request, f'Error creating account: {str(e)}')
    
    return render(request, 'src/signup.html')

@login_required
def chat(request):
    users = User.objects.exclude(id=request.user.id)  # Get all users except the current user
    current_user = request.user
    context = {
        'users': users,
        'current_user': current_user,
        'request': request
    }
    return render(request, 'src/chat.html', context)

@login_required
def profile(request):
    current_user = request.user
    context = {
        'current_user': current_user,
        'request': request
    }
    return render(request, 'src/profile.html', context)

@login_required
def update_profile(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        profile_picture = request.FILES.get('profile_picture')
        
        if username:
            request.user.username = username
        if email:
            request.user.email = email
        if profile_picture:
            request.user.profile_picture = profile_picture  

        request.user.save()
        return redirect('profile')
    
    return render(request, 'src/update-profile.html')



def temporary(request):
    return render(request, 'temporary.html')

def settings(request):
    return render(request, 'src/settings.html')

def help(request):
    return render(request, 'src/help.html')

def about(request):
    return render(request, 'src/about.html')

def feedback(request):
    current_user = request.user
    context = {
        'current_user': current_user,
        'request': request
    }
    return render(request, 'src/feedback.html', context)


