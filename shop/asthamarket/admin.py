from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin configuration for the Category model."""
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """Admin configuration for the Product model."""
    list_display = ('name', 'category', 'price', 'stock', 'is_available', 'created_at')
    list_filter = ('is_available', 'category', 'created_at')
    list_editable = ('price', 'stock', 'is_available')
    search_fields = ('name', 'description')

