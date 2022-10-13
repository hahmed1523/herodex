from django.db import models 
from django.contrib.auth.models import User 

class HeroFrom(models.Model):
    name = models.CharField(max_length=200, unique=True)
    origin_date = models.DateField(null=True, blank=True)
    created_by = models.CharField(max_length=200, null=True, blank=True)
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True
    )
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name 