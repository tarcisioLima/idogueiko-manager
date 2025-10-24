from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .services.idogueiko_processor import IdogueikoProcessor
from .models import Category, Technique, Sequence, SequenceTechnique

from .serializers import (
    CategorySerializer,
    TechniqueSerializer,
    SequenceSerializer,
    SequenceTechniqueSerializer
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class TechniqueViewSet(viewsets.ModelViewSet):
    queryset = Technique.objects.all().order_by('-id')
    serializer_class = TechniqueSerializer


class SequenceViewSet(viewsets.ModelViewSet):
    queryset = Sequence.objects.all().order_by('-id')
    serializer_class = SequenceSerializer

    @action(detail=False, methods=['post'], url_path='generate-random')
    def generate_random(self, request, pk=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        sequence = serializer.save()
        processor = IdogueikoProcessor(sequence)
        try:
            processor.generate_random_sequence()
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(self.get_serializer(sequence).data)