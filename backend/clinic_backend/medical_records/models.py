from django.db import models

from patients.models import Patient

from doctors.models import Doctor

class MedicalRecord(models.Model):

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

    diagnosis = models.TextField(
        null=True,
        blank=True
    )

    patient_history = models.TextField(
        null=True,
        blank=True
    )

    previous_prescription = models.TextField(
        null=True,
        blank=True
    )

    appointment_history = models.TextField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return str(self.patient)