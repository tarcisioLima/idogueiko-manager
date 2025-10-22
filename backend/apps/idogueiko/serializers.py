from rest_framework import serializers
from .models import Category, Technique, Sequence, SequenceTechnique


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class TechniqueSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source="category.name")

    class Meta:
        model = Technique
        fields = "__all__"


class SequenceTechniqueSerializer(serializers.ModelSerializer):
    technique_name = serializers.ReadOnlyField(source="technique.name")

    class Meta:
        model = SequenceTechnique
        fields = ["id", "order", "side", "technique", "technique_name"]


class SequenceSerializer(serializers.ModelSerializer):
    techniques_detail = serializers.SerializerMethodField()

    class Meta:
        model = Sequence
        fields = ["id", "stance", "quantity", "techniques_detail", "created_date", "updated_date"]

    def get_techniques_detail(self, obj):
        techniques = SequenceTechnique.objects.filter(sequence=obj)
        return SequenceTechniqueSerializer(techniques, many=True).data