from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from socialnetwork.models import Profile, Post

MAX_UPLOAD_SIZE = 2500000
class LoginForm(forms.Form):
    username = forms.CharField(max_length=30)
    password = forms.CharField(max_length=30, widget=forms.PasswordInput())

    def clean(self):
        cleaned_data = super().clean()

        username = cleaned_data.get('username')
        password = cleaned_data.get('password')
        user = authenticate(username=username, password=password)
        if not user:
            raise forms.ValidationError("Invalid username/password.")

        return cleaned_data

class RegisterForm(forms.Form):
    username = forms.CharField(max_length=30)
    password = forms.CharField(max_length=30, widget=forms.PasswordInput())
    confirm_password = forms.CharField(max_length=30, widget=forms.PasswordInput())
    email = forms.CharField(required=False, max_length=50)
    first_name = forms.CharField(max_length=20)
    last_name = forms.CharField(max_length=20)

    def clean(self):
        cleaned_data = super().clean()

        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')
        if password != confirm_password:
            raise forms.ValidationError("Passwords did not match.")

        return cleaned_data

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if User.objects.filter(username__exact=username):
            raise forms.ValidationError("Username is already taken.")
        return username

class EditProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('profile_picture', 'bio_input_text')
        widgets = {
            'bio_input_text': forms.Textarea(),
        }

    def clean(self):
        cleaned_data = super().clean()
        return cleaned_data

    # checks content type and size
    def clean_profile_picture(self):
        picture = self.cleaned_data['profile_picture']
        if not picture or not hasattr(picture, 'content_type'):
            raise forms.ValidationError('You must upload a picture')
        if not picture.content_type or not picture.content_type.startswith('image'):
            raise forms.ValidationError('File type is not image')
        if picture.size > MAX_UPLOAD_SIZE:
            raise forms.ValidationError('File too big (max size is {0} bytes)'.format(MAX_UPLOAD_SIZE))
        return picture

