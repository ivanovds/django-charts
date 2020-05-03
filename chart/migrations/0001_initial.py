# Generated by Django 3.0 on 2020-02-24 09:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Chart',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=datetime.date.today, unique=True)),
                ('rate', models.DecimalField(decimal_places=4, max_digits=10)),
            ],
        ),
    ]
