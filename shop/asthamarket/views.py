from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.models import User
from rest_framework.decorators import api_view # Keep for product view
from rest_framework.response import Response # Keep for product view
from .models import *
from .serializers import *
from django.contrib.auth import authenticate, login as auth_login
from rest_framework.decorators import api_view

# Create your views here.
def home(request):
    return render(request, 'home.html')


@api_view(['GET', 'POST'])
def signup(request):
    if request.method == 'GET':
        return render(request, 'signup.html')

    data = request.data
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return Response({'error': 'Name, email, and password are required.'}, status=400)

    if len(password) < 8:
        return Response({'error': 'Password must be at least 8 characters.'}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({'error': f"Email '{email}' is already registered."}, status=400)

    user = User.objects.create_user(username=email, email=email, password=password, first_name=name)
    return Response({'message': 'Your account has been created successfully!'}, status=201)


def product_page(request):
    return render(request, 'product.html')

@api_view(['GET'])
def product_api(request):
    all_product = Product.objects.filter(is_available=True)
    serializer = ProductSerializer(all_product, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def login(request):
    if request.method == "GET":
        return render(request, 'login.html')
    
    data = request.data
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required.'}, status=400)

    # 3. Check karo ki kya user database mein exist karta hai aur password sahi hai?
    
    user = authenticate(request, username=email, password=password)

    if user is not None:
     
        auth_login(request, user)
        return Response({'message': 'Login successful!'}, status=200)
    else:
      
        return Response({'error': 'Invalid email or password.'}, status=401)
   
   
def category(request):   
    return render(request, 'category.html')

@api_view(['GET'])    
def category_api(request):
    categoris = Category.objects.all()
    serializer = CategorySerializer(categoris, many = True)
    return Response(serializer.data)
    