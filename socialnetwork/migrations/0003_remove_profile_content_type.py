# Generated by Django 3.1.2 on 2020-12-11 23:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('socialnetwork', '0002_auto_20201211_2140'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='content_type',
        ),
    ]
