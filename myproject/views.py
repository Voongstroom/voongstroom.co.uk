import django

def index(request):
    return django.shortcuts.render(request, 'myproject/index.html')

