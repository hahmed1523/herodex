from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.comments import Comment
from ..serializers.comments_serializer import CommentSerializer

class CommentsView(APIView):
    def get(self, request, pk=None, hero_id=None, format=None):
        # Handle single request
        if pk:
            comment = Comment.objects.get(id=pk)
            serializer = CommentSerializer(comment, many=False)
            return Response(serializer.data)
        if hero_id:
            comments = Comment.objects.filter(hero=hero_id)
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
        else:   
            # Handle general request
            comments = Comment.objects.all()
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
    
    # def post(self, request, format=None):
    #     data = request.data

    #     serializer = MoveSerializer(data = data, many=False)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     else:
    #         return Response(serializer.errors)
    
    # def put(self, request, pk, format=None):
    #     data = request.data 
    #     move= Move.objects.get(id=pk)
    #     serializer = MoveSerializer(instance=move, data=data)

    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     else:
    #         return Response(serializer.errors)
    
    # def delete(self, request, pk, format=None):
    #     move = Move.objects.get(id=pk)
    #     move.delete()
    #     return Response('Move is deleted')
