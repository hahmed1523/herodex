from rest_framework.serializers import ModelSerializer, CharField
from ..models.comments import Comment 

class CommentSerializer(ModelSerializer):
    username = CharField(
            source = "user.username",
            read_only=True
        )
    class Meta:
        model = Comment
        fields = ['id','body', 'user', 'username', 'hero', 'updated_date']