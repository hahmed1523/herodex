from django.db import models 
from django.contrib.auth.models import User 
from .hero_from import HeroFrom
from .moves import Move

class Hero(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    famous_from = models.ForeignKey(
        HeroFrom,
        on_delete=models.SET_NULL,
        related_name='heroes',
        null=True,
    )
    description = models.TextField(null=True, blank=True)
    move1 = models.ForeignKey(
        Move,
        on_delete=models.SET_NULL,
        related_name='heroes_prim',
        null=True,
        blank=True
    )
    move2 = models.ForeignKey(
        Move,
        on_delete=models.SET_NULL,
        related_name='heroes_second',
        null=True,
        blank=True
    )
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name='heroes',
        null=True
    )
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
