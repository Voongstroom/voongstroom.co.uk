from django.conf.urls import patterns, url
import vocab
from vocab import views

urlpatterns = patterns('',
                       url(r'^$', vocab.views.index, name='index'),
                       url(r'add-word', views.add_word, name='add-word'),
                       url(r'login', views.login, name='login'),
                       url(r'logout', views.logout, name='logout'),
                       url(r'sign-up', views.sign_up, name='sign-up'),
                       url(r'delete-entry', views.delete_entry, name='delete-entry'),
                       url(r'edit-entry', views.edit_entry, name='edit-entry'),
                       # url(r'index2', views.index2, name='index2'),
                       # url(r'^$', views.index, name='index'),
                       # url(r'', views.form_test, name='form-test'),
                       # url(r'add-entry', views.add_entry, name='add-entry'),
                       # url(r'edit-entry', views.edit_entry, name='edit-entry')
                       #    url(r'html_form_send.php', views.html_form_send, name='html_form_send')
)
