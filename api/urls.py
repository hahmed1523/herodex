from django.urls import path 
from . import view
from .views import heroes_view, hero_from_view

urlpatterns = [ 
    path('', view.getRoutes),
    path('heroes/', heroes_view.getHeroes, name='heroes'),
    path('heroes/<str:pk>/', heroes_view.getHeroes, name='hero'),
    path('heroesfrom/', hero_from_view.getHeroFrom, name='heroesfrom')
    
]