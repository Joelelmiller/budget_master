from rest_framework import routers
from .api import IncomeViewSet

router = routers.DefaultRouter()
router.register('api/incomes', IncomeViewSet, 'income')

urlpatterns = router.urls
