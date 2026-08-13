from django.urls import path
from .import views 

urlpatterns = [
  path('products/', views.product_page, name='product'),
  path('api/products/', views.product_api, name='product-api'),
  path('', views.home, name='home'),
  path('signup/', views.signup, name='signup'),
  path('login/', views.login, name='login'),
  path('categoryes/', views.category, name='category'),
  path('api/category/', views.category_api, name='category-api'),
]