from django.contrib.auth.models import User
from django.http import JsonResponse

from emotions.serializers import UserSerializer, RegisterUserSerializer, SongSerializer, PlaylistSerializer
from emotions.models import Song, Playlist

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.generics import RetrieveAPIView, CreateAPIView

import os
import json
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import lyricsgenius as lg
import re
from transformers import pipeline
import collections
import pandas as pd

spotify_client_id = os.environ['SPOTIPY_CLIENT_ID']
spotify_secret = os.environ['SPOTIPY_CLIENT_SECRET']
spotipy_redirect_uri = os.environ['SPOTIPY_REDIRECT_URI']
genius_access_token = os.environ['GENIUS_ACCESS_TOKEN']
user_id = 'spotify:user:22gothp7kyvmsh7ryebt7vjqq'

sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())
ge = lg.Genius(genius_access_token)

debug = False
emotion = None
if debug:
    emotion = pipeline('sentiment-analysis', model='arpanghoshal/EmoRoBERTa')
    def get_emotion_label(text):
        return(emotion(text)[0]['label'])

# Create your views here.
@api_view(['POST'])
def test(request):
    print("hi")
    try:
        spotify_playlist_id = request.data['link']
        playlist = sp.user_playlist_tracks(user_id, spotify_playlist_id)
        print("playlist obtained")
        tracks = []
        for item in playlist['items']:
            track_id = item['track']['id']
            string = (item['track']['name']).split("(", 1)
            track_name = string[0]
            track_artist = item['track']['artists'][0]['name']
            tracks.append((track_id, track_name, track_artist))

        playlistDDict = collections.defaultdict(int)

        for id, title, artist in tracks:
            if Song.objects.filter(id=id):
                song = Song.objects.filter(id=id)
                for key in song[0].emotions:
                    playlistDDict[key] += song[0].emotions[key]
                print('in db and added')
                continue
            try:
                if debug:
                    song = ge.search_song(title, artist)
                    songLyrics = song.lyrics
                    modifiedSongLyrics =  re.sub('\[.+\]', '', songLyrics)
                    many_strings = re.split('\n', modifiedSongLyrics)
                    print("obtained lyrics")
                    
                    songDF = pd.DataFrame(many_strings)
                    songDF.rename(columns = {0:'text'}, inplace = True)
                    songDF['emotion'] = songDF['text'].apply(get_emotion_label)
                    print("obtained emotions")

                    songJSONstring = songDF.to_json()
                    songJSON = json.loads(songJSONstring)
                    songCounts = collections.Counter(songJSON['emotion'].values())
                    songDict = dict(songCounts)
                    print("dict obtained")

                    for key in songDict:
                        playlistDDict[key] += songDict[key]
                    
                    songData = {"id": id, "title": title, "artist": artist, "emotions": songDict}

                    serializerSong = SongSerializer(data=songData)
                    if serializerSong.is_valid():
                        serializerSong.save()
                continue
            except Exception as e:
                return JsonResponse({"error": str(e)}, status=400)
        songs = [song[0] for song in tracks]
        # print("tracks")
        songsJSON = {"songs": json.dumps(songs)}
        # print("songsJSON")
        # print(songsJSON)
        playlistDict = dict(playlistDDict)

        print("playlistDict")
        playlistData = {"id": spotify_playlist_id}
        # print(playlistData)
        # print(type(playlistData))
        # print(playlistData['id'])
        # print(type(playlistData['id']))
        # print(playlistData['songs'])
        # print(type(playlistData['songs']))
        # print(playlistData['emotions'])
        # print(type(playlistData['emotions']))
        playlistSongs = {"songs": songs}
        print("playlistData")
        data = {"id": spotify_playlist_id + "7", "songs": songs, "emotions": playlistDict}
        print(data)
        serializerPlaylist = PlaylistSerializer(data=data)
    
        print("serializer")
        if serializerPlaylist.is_valid():
            serializerPlaylist.save()
        return Response(playlistData)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(['GET'])
def getPlaylists(request):
    playlists = Playlist.objects.all()
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getSongs(request):
    songs = Song.objects.all()
    serializer = SongSerializer(songs, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addSongs(request):
    # {"data": {"title": "hi"}}
    if isinstance(request.data['data'], str):
        data = json.loads(request.data['data'])
    else:
        data = request.data['data']
    print(data)
    print(type(data))
    print(data['title'])
    print(type(data['title']))
    print(data['emotions'])
    print(type(data['emotions']))

    serializer = SongSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserAPIView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user

class RegisterUserAPIView(CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterUserSerializer

