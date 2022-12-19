from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User 
from ..serializers.user_register_serializer import RegisterSerializer

class RegisterView(APIView):
    def get(self, request, pk=None,format=None):
        # Handle single request
        if pk: 
            user = User.objects.get(id=pk)
            serializer = RegisterSerializer(user, many=False)
            return Response(serializer.data)
        else:
            # Handle general request
            users = User.objects.all()
            serializer = RegisterSerializer(users, many=True)
            return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data 

        serializer = RegisterSerializer(data = data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    
    def delete(self, request, pk, format=None):
        user = User.objects.get(id=pk)
        user.delete()
        return Response('User is deleted')
