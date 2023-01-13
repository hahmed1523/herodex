from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..models.hero_likes import HeroLike
from ..serializers.hero_likes_serializer import HeroLikeSerializer

class HeroLikesView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, pk=None, format=None):
        # Handle single request
        if pk:
            like = HeroLike.objects.get(id=pk)
            serializer = HeroLikeSerializer(like, many=False)
            return Response(serializer.data)
        else:
            # Handle index request
            likes = HeroLike.objects.all()
            serializer = HeroLikeSerializer(likes, many=True)
            return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data

        serializer = HeroLikeSerializer(data = data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    
    def delete(self, request, pk, format=None):
        like = HeroLike.objects.get(id=pk)
        like.delete()
        return Response('Hero Like is deleted')

