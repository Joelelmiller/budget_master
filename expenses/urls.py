from rest_framework import routers
from .api import ExpensesViewSet

router = routers.DefaultRouter()
router.register('api/expenses', ExpensesViewSet, 'expenses')

urlpatterns = router.urls
