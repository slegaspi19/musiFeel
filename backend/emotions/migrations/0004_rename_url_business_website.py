# Generated by Django 4.2.5 on 2023-09-26 06:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('emotions', '0003_business_slug_category_slug'),
    ]

    operations = [
        migrations.RenameField(
            model_name='business',
            old_name='url',
            new_name='website',
        ),
    ]
