from expenses.models import Expenses
from rest_framework import viewsets, permissions
from .serializers import ExpensesSerializer

# Lead viewset


class ExpensesViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ExpensesSerializer

    def get_queryset(self):
        return self.request.user.expenses.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
