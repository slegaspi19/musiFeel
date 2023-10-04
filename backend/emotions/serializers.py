from django.contrib.auth.models import User, Group
from rest_framework import serializers
from emotions.models import Song, Review, Business, Category

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class ReviewReadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Review
        depth = 1
        fields = '__all__'

class ReviewWriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Review
        fields = [
            'url',
            'title',
            'content',
            'stars',
            'business',
        ]

class BusinessReadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Business
        depth = 1 
        fields = [
            'url',
            'name',
            'slug',
            'desc',
            'price_range',
            'street_address',
            'city',
            'region',
            'postal_code',
            'country',
            'website',
            'phone',
            'hours',
            'reviews',
        ]

class BusinessWriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Business
        fields = [
            'url',
            'name',
            'slug',
            'desc',
            'price_range',
            'street_address',
            'city',
            'region',
            'postal_code',
            'country',
            'website',
            'phone',
            'hours',
            'reviews',
        ]

class CategoryReadSerializer(serializers.HyperlinkedModelSerializer):
    business = BusinessReadSerializer(many=True)
    class Meta:
        model = Category
        fields = [
            'url',
            'name',
            'slug',
            'ordinal',
            'business'
        ]

class CategoryWriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = [
            'url',
            'name',
            'slug',
            'ordinal',
            'business'
        ]

class RegisterUserSerializer(serializers.HyperlinkedModelSerializer):
	def create(self, validated_data):
		user = User.objects.create_user(
			email = validated_data['email'],
			username = validated_data['username'],
			password = validated_data['password']
		)
		return user
	class Meta:
		model = User
		fields = ['url', 'username', 'password', 'email', 'groups']
          
class SongWriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Song
        fields = [
            'url',
            'title',
            'artist',
            'emotions',
        ]