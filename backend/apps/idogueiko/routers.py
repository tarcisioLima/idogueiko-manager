from rest_framework.routers import DefaultRouter
from .viewsets import CategoryViewSet, TechniqueViewSet, SequenceViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('techniques', TechniqueViewSet)
router.register('sequences', SequenceViewSet)
urlpatterns = router.urls
