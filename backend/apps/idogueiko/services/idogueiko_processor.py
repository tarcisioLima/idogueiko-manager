import random
from apps.idogueiko.models import Sequence, Technique, SequenceTechnique


class IdogueikoProcessor:
    def __init__(self, sequence: Sequence):
        self.sequence = sequence

    def generate_random_sequence(self):
        quantity = self.sequence.quantity or 3
        SequenceTechnique.objects.filter(sequence=self.sequence).delete()

        all_techniques = list(Technique.objects.all())
        if len(all_techniques) < quantity:
            self.sequence.delete()
            raise ValueError("Não há golpes suficientes cadastrados.")

        chosen = random.sample(all_techniques, quantity)
        for i, tech in enumerate(chosen, start=1):
            SequenceTechnique.objects.create(
                sequence=self.sequence,
                technique=tech,
                side=random.choice(["OI", "GYAKU"]),
                order=i
            )

        return self.sequence
