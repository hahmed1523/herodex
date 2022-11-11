from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.moves import Move
from ..serializers.moves_serializer import MoveSerializer

class MovesView(APIView):
    def get(self, request, pk=None, format=None):
        # Handle single request
        if pk:
            move = Move.objects.get(id=pk)
            serializer = MoveSerializer(move, many=False)
            return Response(serializer.data)
        else:
            # Handle general request
            moves = Move.objects.all()
            serializer = MoveSerializer(moves, many=True)
            return Response(serializer.data)
    
    def post(self, request, format=None):
        data = request.data

        serializer = MoveSerializer(data = data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    
    def put(self, request, pk, format=None):
        data = request.data 
        move= Move.objects.get(id=pk)
        serializer = MoveSerializer(instance=move, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    
    def delete(self, request, pk, format=None):
        move = Move.objects.get(id=pk)
        move.delete()
        return Response('Move is deleted')

