from rest_framework.serializers import ModelSerializer
from ..models.hero_likes import HeroLike

class HeroLikeSerializer(ModelSerializer):

    class Meta:
        model = HeroLike
        fields = ['id','user', 'hero']