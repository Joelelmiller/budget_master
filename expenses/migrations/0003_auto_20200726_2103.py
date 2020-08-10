# Generated by Django 3.0.8 on 2020-07-26 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0002_expenses_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='expenses',
            name='category',
            field=models.CharField(choices=[('rent', 'Rent'), ('electric', 'Electric'), ('gas', 'Gas'), ('insurance', 'Insurance'), ('grocery', 'Grocery'), ('other', 'Other'), ('bills', 'Bills')], default='Other', max_length=100),
        ),
        migrations.AddField(
            model_name='expenses',
            name='expense_owner',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
