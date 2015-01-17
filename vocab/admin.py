from django.contrib import admin
from vocab.models import Word, Comment, Tag, TagWordRelationship

# Register your models here.
admin.site.register(Word)
admin.site.register(Comment)
admin.site.register(Tag)
admin.site.register(TagWordRelationship)
