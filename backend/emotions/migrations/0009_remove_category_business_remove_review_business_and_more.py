# Generated by Django 4.2.5 on 2023-10-04 03:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('emotions', '0008_song'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='business',
        ),
        migrations.RemoveField(
            model_name='review',
            name='business',
        ),
        migrations.DeleteModel(
            name='Business',
        ),
        migrations.DeleteModel(
            name='Category',
        ),
        migrations.DeleteModel(
            name='Review',
        ),
    ]
