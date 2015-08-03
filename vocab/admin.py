from django.contrib import admin
from vocab.models import Tag, Word, Comment, Notebook, Subscription

# Register your models here.
admin.site.register(Tag)
admin.site.register(Word)
admin.site.register(Comment)
admin.site.register(Notebook)
admin.site.register(Subscription)
