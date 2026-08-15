from django.urls import path
from .import views 

urlpatterns = [
  path('products/', views.product_page, name='product'),
  path('api/products/', views.ProductApiView.as_view(), name='product-api'),
  path('', views.home, name='home'),
  path('signup/', views.SignupView.as_view(), name='signup'),
  path('login/', views.LoginView.as_view(), name='login'),
  path('categoryes/', views.category, name='category'),
  path('api/category/', views.CategoryApiView.as_view(), name='category_api'),
  path('profile/', views.profile, name='profile'),
  path('api/profile/', views.ProfileApiView.as_view(), name='profile-api'),
  path('api/wishlist/', views.WishlistApiView.as_view(), name='wishlist-api'),
  path('wishlist/', views.Wishlist, name='wishlist'),
]
