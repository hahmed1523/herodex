from rest_framework.response import Response 
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.hero_from import HeroFrom
from ..serializers.hero_from_serializer import HeroFromSerializer

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticatedOrReadOnly])
def getHeroFrom(request, pk=None):

    # Handle GET request
    if request.method == 'GET':
        
        # Handle GET single request
        if pk:
            heroFrom = HeroFrom.objects.get(id=pk)
            serializer = HeroFromSerializer(heroFrom, many=False)
            return Response(serializer.data)
        else:
        # Handle normal GET request    
            heroesFrom = HeroFrom.objects.all()
            serializer = HeroFromSerializer(heroesFrom, many=True)
            return Response(serializer.data)
    # Handle POST request
    elif request.method == 'POST':
        data = request.data
        serializer = HeroFromSerializer(data = data, many=False)
        print(data)
        print(serializer.is_valid())
        print(serializer.errors)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    
    # Handle PUT request
    elif request.method == 'PUT':
        data = request.data 
        heroFrom = HeroFrom.objects.get(id=pk)
        serializer = HeroFromSerializer(instance=heroFrom, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    
    # Handle DELETE request
    if request.method == 'DELETE':
        heroFrom = HeroFrom.objects.get(id=pk)
        heroFrom.delete()
        return Response('HeroFrom is deleted')
