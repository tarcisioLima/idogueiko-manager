import pytest
from apps.idogueiko.models import Sequence
from apps.idogueiko.services.idogueiko_processor import IdogueikoProcessor


@pytest.mark.django_db
def test_generate_random_sequence_raises_if_not_enough_techniques():    
    sequence = Sequence.objects.create(name="Seq Teste", quantity=3)
    processor = IdogueikoProcessor(sequence)

    with pytest.raises(ValueError, match="Não há golpes suficientes cadastrados."):
        processor.generate_random_sequence()
    
    assert not Sequence.objects.filter(id=sequence.id).exists()
