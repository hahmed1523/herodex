from django.db import models 
from django.contrib.auth.models import User 
from .hero_model import Hero

class HeroLike(models.Model):
    user = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    related_name='user_likes',
    null=False
    )
    hero = models.ForeignKey(
        Hero,
        on_delete=models.CASCADE,
        related_name='hero_likes',
        null=False
    )
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'hero']

    def __str__(self):
        return f'{self.hero.name} like'