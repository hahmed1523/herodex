from rest_framework.response import Response 
from rest_framework.decorators import api_view
from ..models.hero_from import HeroFrom
from ..serializers.hero_from_serializer import HeroFromSerializer

@api_view(['GET'])
def getHeroFrom(request, pk=None):

    # Handle GET request
    if request.method == 'GET':
        heroesFrom = HeroFrom.objects.all()
        serializer = HeroFromSerializer(heroesFrom, many=True)
        return Response(serializer.data)
