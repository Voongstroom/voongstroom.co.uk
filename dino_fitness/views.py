from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def nutrition(request):
    return render(request, 'dino-fitness/nutrition.html', {})

def fitness(request):
    return render(request, 'dino-fitness/fitness.html', {})

def sport(request):
    return render(request, 'dino-fitness/sport.html', {})

def index(request):
    return render(request, 'dino-fitness/index.html', {})

def blog(request):
    return render(request, 'dino-fitness/blog.html')

