# Generated by Django 3.0.8 on 2020-07-27 14:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('expenses', '0003_auto_20200726_2103'),
    ]

    operations = [
        migrations.AddField(
            model_name='expenses',
            name='expense_date',
            field=models.DateTimeField(default='2016-01-01'),
        ),
        migrations.AlterField(
            model_name='expenses',
            name='amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=20),
        ),
        migrations.AlterField(
            model_name='expenses',
            name='category',
            field=models.CharField(choices=[('rent', 'Rent'), ('electric', 'Electric'), ('gas', 'Gas'), ('insurance', 'Insurance'), ('grocery', 'Grocery'), ('other', 'Other'), ('bills', 'Bills')], default='Paycheck', max_length=100),
        ),
        migrations.AlterField(
            model_name='expenses',
            name='description',
            field=models.CharField(default='none', max_length=500),
        ),
        migrations.AlterField(
            model_name='expenses',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='expense', to=settings.AUTH_USER_MODEL),
        ),
    ]
