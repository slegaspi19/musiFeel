from django.db import models
import json
# from django.contrib.auth.models import User
# Create your models here.

class Song(models.Model):
    id = models.CharField(max_length=255, primary_key=True, unique=True)
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    emotions = models.JSONField()

class Playlist(models.Model):
    id = models.CharField(max_length=255, primary_key=True, unique=True)
    songs = models.JSONField("songs")
    emotions = models.JSONField("emotions")