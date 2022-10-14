from django.urls import path 
from . import view
from .views import heroes_view

urlpatterns = [ 
    path('', view.getRoutes),
    path('heroes/', heroes_view.getHeroes, name='heroes'),
    path('heroes/<str:pk>/', heroes_view.getHeroes, name='hero')
]