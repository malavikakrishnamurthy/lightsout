# Generated by Django 3.1.2 on 2020-12-12 08:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('socialnetwork', '0004_auto_20201212_0150'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='user_bio',
            new_name='bio_input_text',
        ),
    ]