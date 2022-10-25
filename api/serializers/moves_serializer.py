from rest_framework.serializers import ModelSerializer
from ..models.moves import Move

class MoveSerializer(ModelSerializer):
    class Meta:
        model = Move 
        fields = ['id','name']