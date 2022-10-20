from rest_framework.serializers import ModelSerializer
from ..models.hero_from import HeroFrom

class HeroFromSerializer(ModelSerializer):
    class Meta:
        model = HeroFrom 
        fields = ['id','name', 'origin_date', 'created_by']