from django.urls import path 
from . import view
from .views import heroes_view, hero_from_view, moves_view

urlpatterns = [ 
    path('', view.getRoutes),
    path('heroes/', heroes_view.getHeroes, name='heroes'),
    path('heroes/<str:pk>/', heroes_view.getHeroes, name='hero'),
    path('heroesfrom/', hero_from_view.getHeroFrom, name='heroesfrom'),
    path('heroesfrom/<str:pk>/', hero_from_view.getHeroFrom, name='herofrom'),
    path('moves/', moves_view.MovesView.as_view(), name="moves"),
    path('moves/<str:pk>/', moves_view.MovesView.as_view(), name="move")
    
]