from django.db import models
from django.contrib.auth.models import User

# Create your models here.
CATEGORY_CHOICES = [
    ("rent", "Rent"),
    ("electric", "Electric"),
    ("gas", "Gas"),
    ("insurance", "Insurance"),
    ("grocery", "Grocery"),
    ("other", "Other"),
    ("bills", "Bills"),
    ("auto", "Auto")

]


class Expenses(models.Model):

    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500, null=True)
    expense_date = models.DateTimeField()
    amount = models.DecimalField(decimal_places=2, max_digits=20, default=0)
    category = models.CharField(
        max_length=100, choices=CATEGORY_CHOICES, default="Paycheck")
    expense_owner = models.CharField(max_length=100, null=True)
    owner = models.ForeignKey(
        User, related_name="expenses", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
