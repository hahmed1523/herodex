from django.urls import path 
from . import view
from .views import heroes_view

urlpatterns = [ 
    path('', view.getRoutes),
    path('heroes/', heroes_view.getRoutes, name='heroes')
]