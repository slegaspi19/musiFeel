from django.contrib import admin
from django.urls import path
# from rest_framework import routers
from emotions import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('songs/', views.getSongs),
    path('playlists/', views.getPlaylists),
    path('test/', views.test),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user/', views.UserAPIView.as_view(), name='login'),
    path('api/register/', views.RegisterUserAPIView.as_view(), name='register'),
    path('api/add-song/', views.addSongs)
    
]
