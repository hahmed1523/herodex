from django.urls import path 
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import view
from .views import heroes_view, hero_from_view, moves_view, comments_view, hero_likes_view, user_register_view

urlpatterns = [ 
    path('', view.getRoutes),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('heroes/', heroes_view.getHeroes, name='heroes'),
    path('heroes/<str:pk>/', heroes_view.getHeroes, name='hero'),
    path('heroesfrom/', hero_from_view.getHeroFrom, name='heroesfrom'),
    path('heroesfrom/<str:pk>/', hero_from_view.getHeroFrom, name='herofrom'),
    path('moves/', moves_view.MovesView.as_view(), name="moves"),
    path('moves/<str:pk>/', moves_view.MovesView.as_view(), name="move"),
    path('comments/', comments_view.CommentsView.as_view(), name="comments"),
    path('comments/<str:pk>/', comments_view.CommentsView.as_view(), name="comments"), 
    path('heroes/<str:hero_id>/comments/', comments_view.CommentsView.as_view(), name="hero_comments"),
    path('hero_likes', hero_likes_view.HeroLikesView.as_view(), name="hero_likes" ),
    path('hero_likes/<str:pk>', hero_likes_view.HeroLikesView.as_view(), name="hero_like" ),
    path('register/', user_register_view.RegisterView.as_view(), name="register"),
    path('register/<str:pk>', user_register_view.RegisterView.as_view(), name="register_single")

]