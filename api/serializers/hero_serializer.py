from rest_framework.serializers import ModelSerializer, IntegerField, StringRelatedField
from rest_framework import serializers 
from ..models.hero_model import Hero


class HeroSerializer(ModelSerializer):
    # move1 = SlugRelatedField(many=False, read_only=True, slug_field="name")
    # move2 = SlugRelatedField(many=False, read_only=True, slug_field="name")
    # famous_from = SlugRelatedField(many=False, read_only=True, slug_field="name")
    move1 = StringRelatedField()
    move2 = StringRelatedField()
    famous_from = StringRelatedField()
    likes = IntegerField(
        source='hero_likes.count',
        read_only=True
    )

    class Meta:
        model = Hero 
        fields = ['id', 'name', 'description','move1_id', 'move1','move2_id', 'move2' , 'famous_from_id','famous_from', 'likes']

class HeroSerializerCreate(ModelSerializer):

    class Meta:
        model = Hero 
        fields = ['id', 'name', 'description', 'move1', 'move2' , 'famous_from']
    