# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vocab', '0002_word_owner'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='word',
            name='owner',
        ),
    ]
