from income.models import Income
from rest_framework import viewsets, permissions
from .serializers import IncomeSerializer

# Lead viewset


class IncomeViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = IncomeSerializer

    def get_queryset(self):
        return self.request.user.income.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
