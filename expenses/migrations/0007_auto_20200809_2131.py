# Generated by Django 3.0.8 on 2020-08-09 21:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0006_auto_20200809_2127'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expenses',
            name='description',
            field=models.CharField(max_length=500, null=True),
        ),
    ]
