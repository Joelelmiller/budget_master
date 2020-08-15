# Generated by Django 3.1 on 2020-08-15 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0009_auto_20200815_2141'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expenses',
            name='category',
            field=models.CharField(choices=[('rent', 'Rent'), ('electric', 'Electric'), ('gas', 'Gas'), ('insurance', 'Insurance'), ('grocery', 'Grocery'), ('other', 'Other'), ('bills', 'Bills'), ('auto', 'Auto'), ('utilities', 'Utilities'), ('credit card', 'credit card'), ('credit card principle', 'credit card principle'), ('transportation', 'transportation'), ('entertainment', 'entertainment')], default='Paycheck', max_length=100),
        ),
    ]
