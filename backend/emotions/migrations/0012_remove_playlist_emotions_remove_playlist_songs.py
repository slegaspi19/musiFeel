# Generated by Django 4.2.5 on 2023-10-08 15:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('emotions', '0011_playlist'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='playlist',
            name='emotions',
        ),
        migrations.RemoveField(
            model_name='playlist',
            name='songs',
        ),
    ]