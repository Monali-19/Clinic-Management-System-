from rest_framework import viewsets
from .models import Appointment
from .serializers import AppointmentSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def create(self, request, *args, **kwargs):
        doctor = request.data.get('doctor')
        appointment_date = request.data.get('appointment_date')
        appointment_time = request.data.get('appointment_time')

        exists = Appointment.objects.filter(
            doctor=doctor,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
            status='pending'
        ).exists()
        if exists:
            return Response(
                {'message': 'Slot already booked'},
                status=status.HTTP_400_BAD_REQUEST
            )

        return super().create(request, *args, **kwargs)