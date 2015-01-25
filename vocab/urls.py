from django.conf.urls import patterns, url
import vocab
from vocab import views

urlpatterns = patterns('',
                       url(r'^$', vocab.views.index, name='index'),
                       # url(r'add-word', views.add_word, name='add-word'),
                       # url(r'login', views.login, name='login'),
                       # url(r'logout', views.logout, name='logout'),
                       # url(r'sign-up', views.sign_up, name='sign-up'),
                       # url(r'delete-entry', views.delete_entry, name='delete-entry'),
                       # url(r'edit-entry', views.edit_entry, name='edit-entry'),
                       # url(r'add-tag', views.add_tag, name='add-tag'),
                       # url(r'delete-tag', views.delete_tag, name='delete-tag'),
                       # url(r'toggle-favourite', views.toggle_favourite, name='toggle-favourite'),
                       # url(r'user/(?P<username>\w+)/get-entries', views.get_entries, name='get-entries'),
                       # url(r'user/(?P<username>\w+)', views.other_user_view, name='other-user-view'),
                       # url(r'get-users', views.get_users, name='get-users'),
                       # url(r'get-entries', views.get_entries, name='get-entries'),
                       # url(r'index2', views.index2, name='index2'),
                       # url(r'^$', views.index, name='index'),
                       # url(r'', views.form_test, name='form-test'),
                       # url(r'add-entry', views.add_entry, name='add-entry'),
                       # url(r'edit-entry', views.edit_entry, name='edit-entry')
                       #    url(r'html_form_send.php', views.html_form_send, name='html_form_send')
)
