import collections
import json
import django
from friendship.models import Friend, Follow
from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.template import RequestContext, loader
from vocab.models import Word, Comment, Tag
from django.contrib.auth.models import User

# Create your views here.

def friendship_test(request):
    user = request.user
    all_friends = Friend.objects.friends(request.user)
    return HttpResponse(str(all_friends))

    # # List all unread friendship requests
    # requests = Friend.objects.unread_requests(user=request.user)

    # # List all rejected friendship requests
    # rejects = Friend.objects.rejected_requests(user=request.user)

    # # List all unrejected friendship requests
    # unrejects = Friend.objects.unrejected_requests(user=request.user)

    # # List all sent friendship requests
    # sent = Friend.objects.sent_requests(user=request.user)

    # # List of this user's followers
    # all_followers = Following.objects.followers(request.user)

    # # List of who this user is following
    # following = Following.objects.following(request.user)

    # ### Managing friendship relationships

    # # Create a friendship request
    # other_user = User.objects.get(pk=1)
    # new_relationship = Friend.objects.add_friend(request.user, other_user)

    # # Can optionally save a message when creating friend requests
    # message_relationship = Friend.objects.add_friend(
    #     from_user=request.user,
    #     to_user=some_other_user,
    #     message='Hi, I would like to be your friend',
    # )

    # # And immediately accept it, normally you would give this option to the user
    # new_relationship.accept()

    # # Now the users are friends
    # Friend.objects.are_friends(request.user, other_user) == True

    # # Remove the friendship
    # Friend.objects.remove_friend(other_user, request.user)

    # # Create request.user follows other_user relationship
    # following_created = Following.objects.add_follower(request.user, other_user)

def build_comment_dict(comment):
    comment_dict = {
        'id': comment.id,
        'author': comment.author.username,
        'content': comment.content,
    'entry_date': comment.entry_date.isoformat(),
    }
    return comment_dict;
    
def submit_comment(request):
    entry_id = request.POST['id']
    comment_content = request.POST['comment']
    entry = Word.objects.get(id=entry_id)
    user = User.objects.get(username=request.user)
    comment = Comment(author=user, content=comment_content, word=entry)
    comment.save()
    response = build_comment_dict(comment)
    return HttpResponse(json.dumps(response), content_type="application/json")
    
def get_comments(request):
    entry_id = request.GET['id']
    word = Word.objects.get(id=entry_id)
    comments = Comment.objects.filter(word=word).order_by("entry_date")
    response = []
    for comment in comments:
        comment_dict = build_comment_dict(comment)
        response.append(comment_dict)
    return HttpResponse(json.dumps(response), content_type="application/json")

def get_tags(request):
    user_input = request.GET['input']
    if user_input:
        response = {'tags': [tag.name for tag in Tag.objects.filter(name__istartswith=user_input)]}
        response = HttpResponse(json.dumps(response), content_type="application/json")
        return response
    return HttpResponse(json.dumps({'tags': []}), content_type="application/json")

def check_if_user_is_author(request, author):
    return HttpResponse(str(int(str(request.user) == author)))

def delete_tag(request):
    user = request.user
    id = request.POST["id"] if "id" in request.POST else None
    try:
        word = Word.objects.get(id=id, author=user)
    except django.core.exceptions.ObjectDoesNotExist:
        word = None
    tag = request.POST["tag"] if "tag" in request.POST else None
    if word and tag:
        tag = Tag.objects.get(name=tag)
        word.tags.remove(tag)
        return HttpResponse("Tag removed: {}".format(tag));
    return HttpResponse('Failed to remove tag: {}'.format(tag))

def add_tag(request):
    user = request.user
    id = request.POST["id"]
    tag = request.POST["tag"]
    try:
        entry = Word.objects.get(id=id, author=user)
    except django.core.exceptions.ObjectDoesNotExist:
        entry = None
    if entry and tag:
        try:
            tag = Tag.objects.get(name=tag)
        except django.core.exceptions.ObjectDoesNotExist:
            tag = Tag(name=tag)
            tag.save()
        entry.tags.add(tag)
        entry.save()
        return HttpResponse("Tag added: {}".format(tag));
    return HttpResponse('Failed to add tag: {}'.format(tag));

def edit_entry(request):
    user = request.user
    id = request.POST['id']
    word = request.POST['word']
    description = request.POST['description']
    if user and id and word and description:
        try:
            entry = Word.objects.get(id=id, author=user)
        except django.core.exceptions.ObjectDoesNotExist:
            entry = None
        if entry:
            entry.word = word
            entry.brief_description = description
            entry.save()
            return HttpResponse('Edited: id: {}, word: {}, description: {}'.format(id, word, description));
    return HttpResponse('Failed to edit: id: {}, word: {}, description: {}'.format(id, word, description));

def delete_entry(request):
    user = request.user
    entry_id = request.POST['id']
    if user and entry_id:
        try:
            entry = Word.objects.get(id=entry_id, author=user)
        except django.core.exceptions.ObjectDoesNotExist:
            entry = None
        if(entry):
            word = entry.word
            entry.delete()
            return HttpResponse('Deleted entry: {}, word: {}'.format(entry_id, word))
    return HttpResponse('Failed to delete entry: {}'.format(entry_id))

def add_entry(request):
    user = request.user
    user = user
    word = request.POST['word']
    word = word
    description = request.POST['description']
    if user and word and description:
        word = Word(word=word, brief_description=description, author=user)
        word.save()
        return django.http.HttpResponse(word.id)
    return HttpResponse('word not added. word: {0}'.format(word) + ', description: {0}'.format(description))

def toggle_favourite(request):
    user = request.user
    entry_id = request.POST["id"]
    rating = request.POST["rating"]
    try:
        word = Word.objects.get(id=entry_id, author=user)
    except django.core.exceptions.ObjectDoesNotExist:
        word = None
    if word:
        word.popularity_rating = rating
        word.save()
        return HttpResponse("Rating updated: {}".format(rating))
    return HttpResponse('You do not have permission to change this.')

def get_entries(request, username):
    user = User.objects.get(username=username)
    filters = request.GET['filters']
    variable_filter_strings = {}
    if filters:
        for filter_ in filters.split("#"):
            variable, filter_string = filter_.split('/')
            variable_filter_strings[variable] = filter_string
    query = Word.objects.filter(author=user).order_by("word")
    for variable, filter_string in variable_filter_strings.iteritems():
        if variable == 'tag':
            for tag in filter_string.split("+"):
                query = query.filter(tags__name=tag)
    return HttpResponse(convert_entries_to_json(query), content_type="application/json")

def convert_entries_to_json(entries):
    output = []
    for entry in entries:
        output.append({
            "id": entry.id,
            "word": entry.word,
            "description": entry.brief_description,
            "popularity_rating": entry.popularity_rating,
            "tags": [tag.name for tag in entry.tags.all()],
        })
    return json.dumps(output)

def get_friends(request, username):
    users = User.objects.exclude(username=username)
    response = {}
    response = {'users': [user.username for user in users]}
    return HttpResponse(json.dumps(response), content_type="application/json")

def user_index(request, username):
    try:
        user = User.objects.get(username=username)
    except:
        return HttpResponse("User does not exist: {}".format(username))
    return render(request, 'vocab/user_index.html')

def register(request):
    username = request.POST['username']
    password = request.POST['password']
    # TODO: email = request.POST['email']
    email = None
    user = User.objects.create_user(username, email, password)
    user.save()
    user = django.contrib.auth.authenticate(username=username, password=password)
    django.contrib.auth.login(request, user)
    return redirect('user/{}'.format(username))

def check_username_validity(request, username):
    return HttpResponse(int(User.objects.filter(username=username).exists()))

def sign_in(request):
    username = request.POST['username']
    password = request.POST['password']
    user = django.contrib.auth.authenticate(username=username, password=password)
    django.contrib.auth.login(request, user)
    return redirect('user/{}'.format(username))    

def sign_out(request):
    django.contrib.auth.logout(request)
    return redirect('/vocab')

def index(request, user=None):
    user = request.user
    try:
        user = User.objects.get(username=user)
    except django.core.exceptions.ObjectDoesNotExist:
        return render(request, 'vocab/index.html')
    return redirect('user/{}'.format(user))
