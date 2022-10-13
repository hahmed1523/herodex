from django.db import models 
from django.contrib.auth.models import User 

class Move(models.Model):
    name=models.CharField(max_length=200)
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True
    )
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name 