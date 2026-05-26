from django.db import models

from patients.models import Patient

from doctors.models import Doctor

class Prescription(models.Model):

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    medicines = models.TextField(
        null=True,
        blank=True
    )

    dosage = models.TextField(
        null=True,
        blank=True
    )

    remarks = models.TextField(
        null=True,
        blank=True
    )

    prescription_date = models.DateField(
        null=True,
        blank=True
    )

    def __str__(self):

        return str(self.patient)