import django
import vocab
import myproject
from myproject import views as myproject_views
from django.conf.urls import patterns, include, url
from django.contrib import admin
from vocab import views
from django.conf import settings
from django.conf.urls.static import static
import vocab

# urlpatterns = patterns('',
#     # Examples:
#     # url(r'^$', 'myproject.views.home', name='home'),
#     # url(r'^blog/', include('blog.urls')),

#     url(r'^admin/', include(admin.site.urls)),
# )

urlpatterns = patterns('',
                       url(r'^vocab/', include('vocab.urls')),
                       url(r'^dino-fitness/', include('dino_fitness.urls')),
                       url(r'^$', myproject.views.index),
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^weblog/', include('zinnia.urls', namespace='zinnia')),
                       url(r'^comments/', include('django_comments.urls')),
                       # url(r'^accounts/', include('allauth.urls')),
                       # url(r'^$', include('vocab.urls')),
                       # url(r'^admin/', include(admin.site.urls)),
                       # url(r'form-test', include('vocab.urls')),
                       # url(r'add-entry', views.add_entry, name='add-entry'),
                       # url(r'remove-entry', views.remove_entry, name='remove-entry'),
                       # url(r'upvote/(?P<id>\d+)', views.upvote, name='upvote'),
                       # url(r'downvote/(?P<id>\d+)', views.downvote, name='downvote'),
                       # url(r'middlevote/(?P<id>\d+)', views.middlevote, name='middlevote'),
                       # url(r'edit-entry/(?P<id>\d+)', views.edit_entry, name='edit-entry'),
                       # url(r'sign-up-and-log-in', views.sign_up_and_log_in, name='sign-up-and-log-in'),
                       # url(r'login', views.login, name='login'),
                       # url(r'users/(?P<user>\w+)', views.user_view, name='user-words'),
                       # url(r'test/(?P<word>\d+)', views.test, name='test'),
                       # url(r'comment/(?P<word>\d+)', views.comment, name='comment'),
                       # url(r'add-tag/(?P<word>\d+)', views.add_tag, name='add-tag'),
                   ) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
