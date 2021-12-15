from django.urls import path
from socialnetwork import views

urlpatterns = [
    path('', views.controls_action, name='global_stream'),
    path('register', views.register_action, name='register'),
    path('logout', views.logout_action, name='logout'),
    path('login', views.login_action, name='login'),
    path('follower_stream', views.follower_stream_action, name='follower_stream'),
    path('profile', views.profile_action, name='profile'),
    path('other_profile/<int:id>', views.other_profile_action, name='other_profile'),
    path('photo/<int:id>', views.show_profile_picture_action, name='profile_picture'),
    path('create_post', views.create_post, name='create_post'),
    path('follow/<int:id>', views.follow_action, name='follow'),
    path('unfollow/<int:id>', views.unfollow_action, name='unfollow'),
    path('edit_profile', views.edit_profile_action, name='edit_profile')
]