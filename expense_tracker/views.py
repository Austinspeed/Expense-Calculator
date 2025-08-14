from django.shortcuts import render
from django.contrib.auth.models import User 
from django.contrib import messages
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

# Create your views here.
def register(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        confirm_password = request.POST['confirm-password']
        if password == confirm_password:
            if User.objects.filter(username=username).exists():
                messages.info(request,"Username Taken")
                return redirect('register')
            else:
                user = User.objects.create_user(username=username, password=password)
                user.save()
                messages.success(request, 'Acccount created successfully!!!')
                return redirect('signin')  
        else:
            messages.info(request, "Passwords do not match")
            return redirect('register')
    return render (request, 'register.html')

def signin(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return render(request, 'index.html')
        else:
            messages.info(request, "Invalid Credentials")
            return redirect(request, 'signin')
    return render(request, 'login.html')

@login_required
def index(request):
    return render(request, 'index.html')