from django.db import models

# Create your models here.


class Patient(models.Model):

    patient_name = models.CharField(
        max_length=100
    )

    patient_age = models.IntegerField()

    gender = models.CharField(
        max_length=20
    )

    mobile = models.CharField(
        max_length=15
    )

    disease = models.CharField(
        max_length=200
    )

    address = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.patient_name