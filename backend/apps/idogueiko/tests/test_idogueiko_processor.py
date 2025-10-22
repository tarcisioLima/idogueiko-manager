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

    def test_generate_sequence_raises_if_not_enough_moves(self):
        # Arrange
        Technique.objects.create(name="Oi-zuki", stance="Zenkutsu-dachi")
        processor = IdogueikoProcessor("Zenkutsu-dachi")

        # Act / Assert
        with pytest.raises(ValueError, match="Não há golpes suficientes"):
            processor.generate_sequence()

    def test_generate_sequence_randomness(self):
        # Arrange
        for name in ["Oi-zuki", "Mae-geri", "Yoko-geri", "Uchi-uke"]:
            Technique.objects.create(name=name, stance="Zenkutsu-dachi")

        processor = IdogueikoProcessor()

        # Act
        seq1 = processor.generate_sequence()
        seq2 = processor.generate_sequence()

        # Assert
        assert seq1 != seq2  # Alta chance de serem diferentes
