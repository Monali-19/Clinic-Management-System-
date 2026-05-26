from django.db import models

from doctors.models import Doctor

class Appointment(models.Model):

    STATUS_CHOICES = (

        ('Pending', 'Pending'),

        ('Completed', 'Completed'),

        ('Cancelled', 'Cancelled'),
    )

    patient_name = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )

    patient_age = models.IntegerField(
        null=True,
        blank=True
    )

    gender = models.CharField(
        max_length=20,
        null=True,
        blank=True
    )

    mobile = models.CharField(
        max_length=15,
        null=True,
        blank=True
    )

    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    appointment_date = models.DateField(
        null=True,
        blank=True
    )

    appointment_time = models.TimeField(
        null=True,
        blank=True
    )

    disease = models.CharField(
        max_length=200,
        null=True,
        blank=True
    )

    address = models.TextField(
        null=True,
        blank=True
    )

    fee = models.IntegerField(
        default=500
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Pending'
    )

    def __str__(self):

        return str(self.patient_name)