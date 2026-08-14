from django.db import models

# Create your models here.
from django.db import models
#1 sign up modal


# 3. Category Model 
class Category(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True) # URL clean banane ke liye, jaise: /category/electronics
    image = models.ImageField( upload_to=None, height_field=None, width_field=None, max_length=None)
    
    def __str__(self):
        return self.name

# 4. Product Model 
class Product(models.Model):
    # ForeignKey ka matlab hai har product kisi na kisi Category se juda hoga
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    
    name = models.CharField(max_length=250)
    image = models.ImageField(upload_to='product', null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2) # Jaise: 999.99
    stock = models.IntegerField(default=10)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    