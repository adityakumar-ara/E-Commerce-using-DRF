from rest_framework import serializers

from django.contrib.auth.models import User
from .models import *

# Product ko JSON mein badalne wala translator
class ProductSerializer(serializers.ModelSerializer):
    # Category ka naam bhi json mein chahiye, isliye ye line likhi
    category = serializers.StringRelatedField() 

    class Meta:
        model = Product
        fields = '__all__'  # Product ke saare hisse (name, price, etc.) le lo

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
    
class UserProfileSerializer(serializers.ModelSerializer)    :
    class Meta:
       model = User
       fields = ['id', 'username', 'email', 'first_name', 'last_name']

class WishlistSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'product', 'product_details', 'created_at']
class AddToCardSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)
    class Meta:
        models = User
        fields = ['id', 'user', 'product', 'product_details', 'created_at']        