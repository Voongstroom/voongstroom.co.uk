from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

# Create your models here.
class Word(models.Model):
    word = models.CharField(max_length=200)
    entry_date = models.DateTimeField(default=datetime.now)
    brief_description = models.CharField(max_length=1000)
    detailed_description = models.CharField(max_length=10000)
    popularity_rating = models.IntegerField(default=0)
    skill_rating = models.IntegerField(default=0)
    author = models.ForeignKey(User)
    def __str__(self):
        return self.word
    def __lt__(self, other):
        return self.word.title() < other.word.title()

class Comment(models.Model):
    entry_date = models.DateTimeField(default=datetime.now)
    content = models.CharField(max_length=10000)
    author = models.ForeignKey(User)
    word = models.ForeignKey(Word)

class Tag(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class TagWordRelationship(models.Model):
    tag = models.ForeignKey(Tag)
    word = models.ForeignKey(Word)
    def __str__(self):
        return '{0}: {1}'.format(word, tag)
