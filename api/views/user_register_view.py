from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User 
from ..serializers.user_register_serializer import RegisterSerializer

class RegisterView(APIView):
    def get(self, request, format=None):
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
