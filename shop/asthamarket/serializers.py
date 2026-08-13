from rest_framework import serializers
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
    