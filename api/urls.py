from django.urls import path 
from . import view
from .views import heroes_view, hero_from_view, moves_view, comments_view

urlpatterns = [ 
    path('', view.getRoutes),
    path('heroes/', heroes_view.getHeroes, name='heroes'),
    path('heroes/<str:pk>/', heroes_view.getHeroes, name='hero'),
    path('heroesfrom/', hero_from_view.getHeroFrom, name='heroesfrom'),
    path('heroesfrom/<str:pk>/', hero_from_view.getHeroFrom, name='herofrom'),
    path('moves/', moves_view.MovesView.as_view(), name="moves"),
    path('moves/<str:pk>/', moves_view.MovesView.as_view(), name="move"),
    path('comments/', comments_view.CommentsView.as_view(), name="comments"),
    path('comments/<str:pk>/', comments_view.CommentsView.as_view(), name="comments"), 
    path('heroes/<str:hero_id>/comments/', comments_view.CommentsView.as_view(), name="hero_comments"),    
]