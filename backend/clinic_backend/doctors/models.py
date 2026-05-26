from django.db import models

class Doctor(models.Model):

    name = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )

    specialization = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )

    fee = models.IntegerField(
        default=500
    )

    experience = models.IntegerField(
        null=True,
        blank=True
    )

    available_days = models.CharField(
        max_length=200,
        null=True,
        blank=True
    )

    available_time = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )

    def __str__(self):

        return str(self.name)