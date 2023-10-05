from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Song(models.Model):
    id = models.CharField(max_length=255, primary_key=True, unique=True)
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    emotions = models.JSONField()