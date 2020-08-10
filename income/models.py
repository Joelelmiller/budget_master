from django.db import models
from django.contrib.auth.models import User

CATEGORY_CHOICES = [
    ("Paycheck", "Paycheck"),
    ("Bonus", "Bonus"),
    ("Investment", "Investment"),
    ("Rental", "Rental"),
    ("Other", "Other"),
]


class Income(models.Model):

    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500,  null=True)
    income_date = models.DateTimeField(default="2016-01-01")
    amount = models.DecimalField(decimal_places=2, max_digits=20, default=0)
    category = models.CharField(
        max_length=100, choices=CATEGORY_CHOICES, default="Paycheck")
    income_owner = models.CharField(max_length=100, null=True)
    owner = models.ForeignKey(
        User, related_name="income", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
