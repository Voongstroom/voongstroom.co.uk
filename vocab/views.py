import json
import django
from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.template import RequestContext, loader
from vocab.models import Word, Comment, Tag, TagWordRelationship
from django.contrib.auth.models import User

# Create your views here.
def toggle_favourite(request):
    user = request.user
    user = user if not user.is_anonymous() else None
    id = request.POST["id"] if "id" in request.POST else None
    rating = request.POST["rating"] if "rating" in request.POST else None
    word = Word.objects.get(id=id)
    if word:
        word.popularity_rating = rating
        word.save()
        return HttpResponse("Rating updated: {}".format(rating))
    return HttpResponse('Invalid input')

def delete_tag(request):
    user = request.user
    user = user if not user.is_anonymous() else None
    id = request.POST["id"] if "id" in request.POST else None
    word = Word.objects.get(id=id)
    tag = request.POST["tag"] if "tag" in request.POST else None
    print 'user: {}, id: {}, word: {}, tag: {}'.format(user, id, word, tag)
    if word and tag:
        tag = Tag.objects.get(name=tag)
        try:
            tag_word = TagWordRelationship.objects.get(word=id, tag=tag.id)
            print tag_word
        except django.core.exceptions.ObjectDoesNotExist:
            return HttpResponse("Tag - Word not found");
        tag_word.delete();
        return HttpResponse("Tag removed");
    return HttpResponse('Invalid input')

def add_tag(request):
    user = request.user
    user = user if not user.is_anonymous() else None
    id = request.POST["id"] if "id" in request.POST else None
    word = Word.objects.get(id=id)
    tag = request.POST["tag"] if "tag" in request.POST else None
    print 'user: {}, id: {}, word: {}, tag: {}'.format(user, id, word, tag)
    if word and tag:
        try:
            tag = Tag.objects.get(name=tag)
        except django.core.exceptions.ObjectDoesNotExist:
            tag = Tag(name=tag)
            tag.save()
        try:
            tag_word = TagWordRelationship.objects.get(word=word.id, tag=tag.id)
        except django.core.exceptions.ObjectDoesNotExist:
            tag_word = TagWordRelationship(word=word, tag=tag)
            tag_word.save()
        return HttpResponse("All good");
    return HttpResponse('Invalid input')

def add_word(request):
    user = request.user
    user = user if request.user.is_anonymous() == False else None
    word = request.POST['word'] if 'word' in request.POST else None
    word = word if word != '' else None
    description = request.POST['description'] if 'description' in request.POST else None
    if user and word and description:
        word = Word(word=word, brief_description=description, author=user)
        word.save()
        return django.http.HttpResponse(word.id)
    return HttpResponse('word not added. word: {0}'.format(word) + ', description: {0}'.format(description))

def delete_entry(request):
    user = request.user
    user = user if not user.is_anonymous() else None
    print 'request.POST: {}'.format(request.POST)
    print 'request.POST["id"]: {}'.format(request.POST['id'])
    id = request.POST['id'] if 'id' in request.POST else None
    word = None
    print 'id: {}'.format(id)
    if user and id:
        try:
            entry = Word.objects.get(id=id)
        except django.core.exceptions.ObjectDoesNotExist:
            entry = None
        if(entry):
            word = entry.word
            entry.delete()
    return HttpResponse('Successfully deleted: id: {}, word: {}'.format(id, word))

def edit_entry(request):
    user = request.user
    user = user if not user.is_anonymous() else None
    print 'request.POST: {}'.format(request.POST)
    id = request.POST['id'] if 'id' in request.POST else None
    word = request.POST['word'] if 'word' in request.POST else None
    description = request.POST['description'] if 'description' in request.POST else None
    if user and id and word and description:
        try:
            entry = Word.objects.get(id=id)
        except django.core.exceptions.ObjectDoesNotExist:
            entry = None
        if entry:
            entry.word = word
            entry.brief_description = description
            entry.save()
            print 'changed'
    return HttpResponse('id: {}, word: {}, description: {}'.format(id, word, description));

def index(request, user=None):
    user = request.user
    words = sorted(Word.objects.filter(author=None if user.is_anonymous() else user), key=lambda word: word.word)
    for word in words:
        tags = [rel.tag for rel in TagWordRelationship.objects.filter(word=word)]
        word.tags = tags
    context = {'words': words,
               'user': user}
    return render(request, 'vocab/index.html', context)

def login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = django.contrib.auth.authenticate(username=username, password=password)
    django.contrib.auth.login(request, user)
    return redirect('/vocab')

def logout(request):
    django.contrib.auth.logout(request)
    return redirect('/vocab')

def sign_up(request):
    username = request.POST['new-username']
    password = request.POST['new-password']
    email = request.POST['email'] if 'email' in request.POST else None
    user = User.objects.create_user(username, email, password)
    user.save()
    return redirect('/vocab')

# def index(request, user=None):
#     user = request.user if not user else User.objects.get(username=user)
#     sort_field = request.GET['sort-field'] if 'sort-field' in request.GET else 'word'
#     words = Word.objects.filter(author=user.id).order_by(sort_field) if user.id else []
#     tag = Tag.objects.get(name=request.GET['tag']) if 'tag' in request.GET else None
#     keyword = request.GET['keyword'] if 'keyword' in request.GET else None
#     if tag:
#         words = [word for word in words if word in [x.word for x in TagWordRelationship.objects.filter(tag=tag)]]
#     if keyword:
#         words = words.filter(brief_description__contains=keyword)
#     users = [user2 for user2 in User.objects.all() if user2.id != user.id]
#     comments = {}
#     for word in words:
#         for comment in Comment.objects.all():
#             if comment.word == word:
#                 comments[word] = [] if word not in comments else comments[word]
#                 comments[word] += [comment]
#     tags = {}
#     for word in words:
#         for tag_word_relationship in TagWordRelationship.objects.all():
#             if tag_word_relationship.word == word:
#                 tags[word] = [] if word not in tags else tags[word]
#                 tags[word] += [tag_word_relationship.tag]
#     template = loader.get_template('vocab/index.html')
#     context = RequestContext(request, {
#         'words': words,
#         'users': users,
#         'comments': comments,
#         'tags': tags,
#     })
#     return HttpResponse(template.render(context))

# def form_test(request):
#     template = loader.get_template('vocab/form-test.html')
#     context = RequestContext(request, {})
#     return HttpResponse(template.render(context))

# def add_entry(request):
#     user = request.user
#     if user.id != None:
#         word = Word(word=request.POST[u'word'], brief_description=request.POST[u'description'], author=user)
#         if word.word != '':
#             word.save()
#     return redirect('/')
#     return HttpResponse("Hello, world. You're at the polls index. {0}: {1}".format(request.POST['word'], request.POST['description']))

# def remove_entry(request):
#     id = request.POST[u'id']
#     try:
#         word = Word.objects.get(id=id)
#     except django.core.exceptions.ObjectDoesNotExist:
#         word = None
#     if(word):
#         word.delete()
#     return redirect('/')
#     return index(request)
#     return HttpResponse('Removed word: {0}'.format(word))

# def edit_entry(request, id):
#     word = Word.objects.get(id=id)
#     if request.method == "GET":
#         return render(request, 'vocab/edit-entry.html', {'word': word})
#     if request.method == "POST":
#         word.word = request.POST['word']
#         word.brief_description = request.POST['description']
#         word.save()
#         return redirect('/')
#         return index(request)

# def upvote(request, id):
#     word = Word.objects.get(id=id)
#     word.popularity_rating = 1
#     word.save()
#     # return redirect('/')
#     return HttpResponse()

# def downvote(request, id):
#     word = Word.objects.get(id=id)
#     word.popularity_rating = -1
#     word.save()
#     # return redirect('/')
#     return HttpResponse()

# def middlevote(request, id):
#     word = Word.objects.get(id=id)
#     word.popularity_rating = 0
#     word.save()
#     return HttpResponse()
#     return redirect('/')

# def sign_up_and_log_in(request):
#     if request.method == "GET":
#         return render(request, 'vocab/sign-up-and-log-in.html')
#     else:
#         from django.contrib.auth.models import User
#         username = request.POST['username']
#         password = request.POST['password']
#         email = request.POST['email']
#         user = User.objects.create_user(username, email, password)
#         user.save()
#         return redirect('/')


# def user_view(request, user):
#     user = User.objects.get(username=user)
#     words = Word.objects.filter(author=user.id).order_by('word') if user else []
#     users = [user2 for user2 in User.objects.all() if user2.id != user.id and user2 != request.user]
#     template = loader.get_template('vocab/user-view.html')
#     comments = {}
#     for word in words:
#         for comment in Comment.objects.all():
#             if comment.word == word:
#                 comments[word] = [] if word not in comments else comments[word]
#                 comments[word] += [comment]
#     context = RequestContext(request, {
#         'words': words,
#         'users': users,
#         'comments': comments,
#     })
#     return HttpResponse(template.render(context))
    
# def test(request, word):
#     original_word = Word.objects.get(id=word)
#     copy = Word()
#     copy.word = original_word.word
#     copy.brief_description = original_word.brief_description
#     copy.author = request.user
#     copy.save()
#     return redirect('/')

# def comment(request, word):
#     word = Word.objects.get(id=word)
#     comment = Comment()
#     comment.author = request.user
#     comment.content = request.GET['content']
#     comment.word = word
#     comment.save()
#     return redirect('/')

# def add_tag(request, word):
#     word = Word.objects.get(id=word)
#     tags = [tag.name for tag in Tag.objects.all()]
#     if request.GET['tag'] not in tags:
#         print 'tag:', request.GET['tag'], 'not in tags'
#         tag = Tag(name=request.GET['tag'])
#         tag.save()
#     tag = Tag.objects.filter(name=request.GET['tag'])[0]
#     if not len(TagWordRelationship.objects.filter(word=word, tag=tag)):
#         tag_word_relationship = TagWordRelationship(word=word, tag=tag)
#         tag_word_relationship.save()
#     return redirect('/')

#     # if request.method == "POST":
#     #     word.word = request.POST['word']
#     #     word.brief_description = request.POST['description']
#     #     word.save()
#     #     return redirect('/')
#     #     return index(request)
    

# # def index(request):
# #     return HttpResponse("Hello, world. You're at the polls index.")
