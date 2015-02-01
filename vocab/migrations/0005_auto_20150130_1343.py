# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vocab', '0004_tag_tagwordrelationship'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tagwordrelationship',
            name='tag',
        ),
        migrations.RemoveField(
            model_name='tagwordrelationship',
            name='word',
        ),
        migrations.DeleteModel(
            name='TagWordRelationship',
        ),
        migrations.AddField(
            model_name='word',
            name='tags',
            field=models.ManyToManyField(to='vocab.Tag'),
            preserve_default=True,
        ),
    ]
