from django.db import models 
from django.contrib.auth.models import User 
from .hero_model import Hero

class Comment(models.Model):
    user = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    related_name='user_comments',
    null=False
    )
    hero = models.ForeignKey(
        Hero,
        on_delete=models.CASCADE,
        related_name='hero_comments',
        null=False
    )
    body = models.TextField(null=False, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_date']

    def __str__(self):
        return self.body[:50]