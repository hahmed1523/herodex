from rest_framework.response import Response 
from rest_framework.decorators import api_view
from ..models.hero_from import HeroFrom
from ..serializers.hero_from_serializer import HeroFromSerializer

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
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
        heroFrom = HeroFrom.objects.create(
            name = data['name'],
            origin_date = data['origin_date'],
            created_by = data['created_by'],
            user_id = data['user']
        )

        serializer = HeroFromSerializer(heroFrom, many=False)
        return Response(serializer.data)
    
    # Handle PUT request
    elif request.method == 'PUT':
        data = request.data 
        heroFrom = HeroFrom.objects.get(id=pk)
        serializer = HeroFromSerializer(instance=heroFrom, data=data)

        if serializer.is_valid():
            serializer.save()
        
        return Response(serializer.data)
    
    # Handle DELETE request
    if request.method == 'DELETE':
        heroFrom = HeroFrom.objects.get(id=pk)
        heroFrom.delete()
        return Response('HeroFrom is deleted')
