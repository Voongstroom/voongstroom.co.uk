from django.contrib import admin
from vocab.models import Tag, Entry, Comment

# Register your models here.
admin.site.register(Tag)
admin.site.register(Entry)
admin.site.register(Comment)
