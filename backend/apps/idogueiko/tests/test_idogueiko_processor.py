import pytest
from unittest.mock import patch, MagicMock
from apps.idogueiko.models import Sequence
from apps.idogueiko.services.idogueiko_processor import IdogueikoProcessor


@pytest.mark.django_db
def test_techniques_status_code(client):
    response = client.get('/techniques/')
    assert response.status_code == 200


def test_generate_random_sequence_raises_if_not_enough_techniques():
    mock_sequence = MagicMock(spec=Sequence)
    mock_sequence.quantity = 3

    processor = IdogueikoProcessor(mock_sequence)

    with (
        patch("apps.idogueiko.models.SequenceTechnique.objects.filter") as mock_filter,
        patch("apps.idogueiko.models.Technique.objects.all") as mock_all,
    ):
        mock_filter.return_value.delete.return_value = None
        mock_all.return_value = []

        with pytest.raises(ValueError, match="Não há golpes suficientes cadastrados."):
            processor.generate_random_sequence()

        mock_sequence.delete.assert_called_once()
        mock_filter.assert_called_once_with(sequence=mock_sequence)
        mock_filter.return_value.delete.assert_called_once()