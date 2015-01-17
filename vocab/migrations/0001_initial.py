# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Word',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('word', models.CharField(max_length=200)),
                ('entry_date', models.DateTimeField(default=datetime.datetime.now)),
                ('brief_description', models.CharField(max_length=1000)),
                ('detailed_description', models.CharField(max_length=10000)),
                ('popularity_rating', models.IntegerField(default=0)),
                ('skill_rating', models.IntegerField(default=0)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
