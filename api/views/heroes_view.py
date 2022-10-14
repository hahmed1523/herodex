from django.shortcuts import render 
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from ..models.hero_model import Hero 
from ..serializers.hero_serializer import HeroSerializer

# Create your views here.

@api_view(['GET'])
def getHeroes(request, pk=None):

    # Handle GET request
    if request.method == 'GET':

        # Handle GET single Hero   
        if pk:
            hero = Hero.objects.get(id=pk)
            serializer = HeroSerializer(hero, many=False)
            return Response(serializer.data)

        # Handle general GET
        else:
            heroes = Hero.objects.all()
            serializer = HeroSerializer(heroes, many=True)
            return Response(serializer.data)
