from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.generics import RetrieveAPIView, CreateAPIView
from emotions.serializers import UserSerializer, GroupSerializer, ReviewReadSerializer, ReviewWriteSerializer, BusinessReadSerializer, BusinessWriteSerializer, CategoryReadSerializer, CategoryWriteSerializer, RegisterUserSerializer
from emotions.models import Review, Business, Category
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    permission_classes = [permissions.AllowAny]
    def get_serializer_class(self):
        if self.request.method == 'PUT' or self.request.method == 'POST':
            return ReviewWriteSerializer
        return ReviewReadSerializer
    
class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get_serializer_class(self):
        if self.request.method == 'PUT' or self.request.method == 'POST':
            return BusinessWriteSerializer
        return BusinessReadSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['slug']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get_serializer_class(self):
        if self.request.method == 'PUT' or self.request.method == 'POST':
            return CategoryWriteSerializer
        return CategoryReadSerializer

class UserAPIView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user

class RegisterUserAPIView(CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterUserSerializer