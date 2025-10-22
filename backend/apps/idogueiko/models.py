from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Technique(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey(
        Category,
        related_name='techniques',
        on_delete=models.PROTECT
    )
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Sequence(models.Model):
    TYPE_STANCE = (
        ("ZENKUTSU_DACHI", "Zenkutsu Dachi"),
        ("KOKUTSU_DACHI", "Kokutsu Dachi"),
        ("KIBA_DACHI", "Kiba Dachi"),
    )

    stance = models.CharField(max_length=30, choices=TYPE_STANCE)
    quantity = models.PositiveIntegerField(default=3)
    techniques = models.ManyToManyField(
        Technique,
        through='SequenceTechnique',
        related_name='sequences'
    )
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Sequence {self.pk} - {self.stance}"


class SequenceTechnique(models.Model):
    TYPE_SIDE = (
        ('OI', 'Oi'),
        ('GYAKU', 'Gyaku'),
    )

    side = models.CharField(max_length=30, choices=TYPE_SIDE, default='OI')
    sequence = models.ForeignKey(Sequence, on_delete=models.CASCADE)
    technique = models.ForeignKey(Technique, on_delete=models.PROTECT)
    order = models.PositiveIntegerField(default=1) 

    class Meta:
        unique_together = ('sequence', 'order')
        ordering = ['order'] 

    def __str__(self):
        return f"{self.sequence.id}: {self.order} - {self.side} - {self.technique.name}"
