from django.shortcuts import render 
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from ..models.hero_model import Hero
from ..serializers.hero_serializer import HeroSerializer

# Create your views here.

@api_view(['GET', 'PUT', 'POST', 'DELETE'])
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
    
    # Handle PUT request
    if request.method == 'PUT':
        data = request.data 
        hero = Hero.objects.get(id=pk)
        serializer = HeroSerializer(instance=hero, data=data)

        if serializer.is_valid():
            serializer.save()
        
        return Response(serializer.data)

    # Handle POST request
    if request.method == 'POST':
        data = request.data 
        hero = Hero.objects.create(
            name=data['name'],
            famous_from_id=data['famous_from'],
            description=data['description'],
            move1_id=data['move1'], 
            move2_id=data['move2'],
            user_id=data['user']
        )
        serializer = HeroSerializer(hero, many=False)
        return Response(serializer.data)
    
    # Handle DELETE request
    if request.method == 'DELETE':
        hero = Hero.objects.get(id=pk)
        hero.delete()
        return Response('Note as deleted')

