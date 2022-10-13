from django.shortcuts import render 
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from ..models.hero_model import Hero 
from ..serializers.hero_serializer import HeroSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    heroes = Hero.objects.all()
    serializer = HeroSerializer(heroes, many=True)
    return Response(serializer.data)