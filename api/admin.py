from django.contrib import admin
from .models import Hero, HeroFrom, Move, Comment, HeroLike

# Register your models here.

admin.site.register([Hero, HeroFrom, Move, Comment, HeroLike])
