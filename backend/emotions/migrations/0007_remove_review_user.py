# Generated by Django 4.2.5 on 2023-09-28 03:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('emotions', '0006_alter_review_business'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='user',
        ),
    ]