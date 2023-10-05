from django.contrib.auth.models import User
from rest_framework import serializers
from emotions.models import Song

class SongSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Song
        fields = [
            'id',
            'title',
            'artist',
            'emotions',
        ]

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

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