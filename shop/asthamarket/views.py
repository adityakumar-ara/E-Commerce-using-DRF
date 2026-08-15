from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.permissions import IsAuthenticated

# Create your views here.
#home page
def home(request):
    return render(request, 'home.html')

#Signup view page and api
class SignupView(APIView):
    def get(self, request):
        return render(request, 'signup.html')

    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')

        if not name or not email or not password:
            return Response({'error': 'Name, email, and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if len(password) < 8:
            return Response({'error': 'Password must be at least 8 characters.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': f"Email '{email}' is already registered."}, status=status.HTTP_400_BAD_REQUEST)

        User.objects.create_user(username=email, email=email, password=password, first_name=name)
        return Response({'message': 'Your account has been created successfully!'}, status=status.HTTP_201_CREATED)


#product view page and api
@ensure_csrf_cookie
def product_page(request):
    return render(request, 'product.html')

class ProductApiView(ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(is_available=True)


#login page view and api
class LoginView(APIView):
    def get(self, request):
        return render(request, 'login.html')

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=email, password=password)
        if user is None:
            return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)

        auth_login(request, user)
        return Response({'message': 'Login successful!'}, status=status.HTTP_200_OK)
   

#Category page view and API   
def category(request):   
    return render(request, 'category.html')

class CategoryApiView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

#profile view and API
def profile(request):
    return render(request, 'profile.html')
    
class ProfileApiView(RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
 
#Wishlist view page and api 
class WishlistApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wishlist_items = Wishlist.objects.filter(user=request.user)
        serializer = WishlistSerializer(wishlist_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        product = get_object_or_404(Product, pk=request.data.get('product'))
        wishlist_item, created = Wishlist.objects.get_or_create(user=request.user, product=product)
        serializer = WishlistSerializer(wishlist_item)
        response_status = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        message = 'Added to wishlist.' if created else 'This product is already in your wishlist.'
        return Response({'message': message, 'wishlist_item': serializer.data}, status=response_status)
    
@login_required(login_url='login')
def Wishlist(request):
    return render(request,'wishlist.html')
