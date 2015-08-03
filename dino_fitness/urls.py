from django.conf.urls import patterns, include, url
from dino_fitness import views

urlpatterns_ = {
    r'^$': views.index,
    r'^blog': views.blog,
    r'^nutrition': views.nutrition,
    r'^fitness': views.fitness,
    r'^sport': views.sport,
    r'^weblog/': include('zinnia.urls', namespace='zinnia'),
    r'^comments/': include('django_comments.urls'),
}
urlpatterns = patterns('', *[url(regex, view) for regex, view in urlpatterns_.iteritems()])


# urlpatterns = patterns('', url(r'^$', myproject.views.index))

# urlpatterns = patterns('',
#     # Examples:
#     # url(r'^$', 'myproject.views.home', name='home'),
#     # url(r'^blog/', include('blog.urls')),

#     url(r'^admin/', include(admin.site.urls)),
# )

# import django
# import vocab
# import myproject
# from myproject import views as myproject_views
# from django.contrib import admin
# from vocab import views
# from django.conf import settings
# from django.conf.urls.static import static
# import vocab
