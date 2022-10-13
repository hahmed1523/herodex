from rest_framework.serializers import ModelSerializer, SlugRelatedField
from ..models.hero_model import Hero


class HeroSerializer(ModelSerializer):
    move1 = SlugRelatedField(many=False, read_only=True, slug_field="name")
    move2 = SlugRelatedField(many=False, read_only=True, slug_field="name")
    famous_from = SlugRelatedField(many=False, read_only=True, slug_field="name")

    class Meta:
        model = Hero 
        fields = ['id', 'name', 'description', 'move1', 'move2', 'famous_from']