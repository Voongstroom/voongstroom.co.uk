from django.contrib import admin
from vocab.models import Tag, Word, Comment

# Register your models here.
admin.site.register(Tag)
admin.site.register(Word)
admin.site.register(Comment)
