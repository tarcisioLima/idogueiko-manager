import pytest
from apps.idogueiko.models import Technique
from apps.idogueiko.services.idogueiko_processor import IdogueikoProcessor

@pytest.mark.django_db
class TestIdogueikoProcessor:
    
    def test_generate_sequence_returns_three_moves(self):

        for name in ["Oi-zuki", "Mae-geri", "Yoko-geri", "Uchi-uke"]:
            Technique.objects.create(name=name, stance="Zenkutsu-dachi")

        processor = IdogueikoProcessor(stance="Zenkutsu-dachi")

        # Act
        sequence = processor.generate_sequence()

        # Assert
        assert len(sequence) == 3
        for item in sequence:
            assert "name" in item
            assert "stance" in item
            assert "side" in item
            assert item["side"] in ["Oi", "Gyaku"]