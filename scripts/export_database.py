import os

os.environ['DJANGO_SETTINGS_MODULE'] = 'myproject.settings'

import django
django.setup()

from vocab.models import Word


f = open('output.txt', 'wb')
for word in sorted(Word.objects.all()):
    print 'word.word:', word.word
    # if word.word == u"Termagant" or word.brief_description == "A harsh-tempered or overbearing woman.":
    #     print 'continue'
    #     continue
    print 'word.brief_description:', word.brief_description
    f.write(u'{0}\t{1}\n'.format(word.word, word.brief_description))
