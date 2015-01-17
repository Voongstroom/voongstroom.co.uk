import os, sys, json

f = open('vocabulary.txt', 'rb')

lines = [line.replace('\t', '').replace('\r\n', '').strip() for line in f]

#for line in lines:
#    print line

words = {}
for i in range(0, len(lines), 2):
    words[lines[i]] = lines[i+1]

#print words

#for word in words:
#    print '{0}: {1}'.format(word, words[word])

os.environ['DJANGO_SETTINGS_MODULE'] = 'myproject.settings'

import django
django.setup()

from vocab.models import Word

print 'Word.objects.all(): {0}'.format(Word.objects.all())

# Convert words into word objects
word_objects = []
for word, description in words.iteritems():
    word_objects += [Word(word=word, brief_description=description)]

for word in word_objects:
    if word.brief_description == 'A brilliant display or effect.':
        continue
    if word.word not in [a.word for a in Word.objects.all()]:
        word.save()
