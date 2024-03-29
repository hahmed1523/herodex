from django.shortcuts import render 
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.decorators import api_view, permission_classes, authentication_classes 
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.hero_model import Hero
from ..serializers.hero_serializer import HeroSerializer, HeroSerializerCreate
from django.db.models import Count 
from rest_framework_simplejwt.authentication import JWTAuthentication

@api_view(['GET', 'PUT', 'POST', 'DELETE'])
@authentication_classes ([JWTAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def getHeroes(request, pk=None):

    # Handle GET request
    if request.method == 'GET':

        # Handle GET single Hero   
        if pk:
            hero = Hero.objects.get(id=pk)
            serializer = HeroSerializer(hero, many=False, context={'user_id': request.user.id})
            return Response(serializer.data)

        # Handle general GET
        else:
            heroes = Hero.objects.annotate(likes=Count('hero_likes')).order_by('-likes')
            serializer = HeroSerializer(heroes, many=True, context={'user_id': request.user.id})
            return Response(serializer.data)
    
    # Handle PUT request
    if request.method == 'PUT':
        data = request.data 
        hero = Hero.objects.get(id=pk)
        serializer = HeroSerializerCreate(instance=hero, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    # Handle POST request
    if request.method == 'POST':
        data = request.data 
        serializer = HeroSerializerCreate(data = data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        
    
    # Handle DELETE request
    if request.method == 'DELETE':
        hero = Hero.objects.get(id=pk)
        hero.delete()
        return Response('Hero is deleted')

