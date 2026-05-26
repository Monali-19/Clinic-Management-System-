from rest_framework.views import APIView
from rest_framework.response import Response
from appointments.models import Appointment
from doctors.models import Doctor
from accounts.models import User

# Create your views here.

class AdminDashboard(APIView):
    def get(self, request):
        total_appointments = Appointment.objects.count()
        completed = Appointment.objects.filter(status='completed').count()
        cancelled = Appointment.objects.filter(status='cancelled').count()
        total_doctors = Doctor.objects.count()
        total_patients = User.objects.filter(role='patient').count()

        return Response({
            'total_appointments': total_appointments,
            'completed': completed,
            'cancelled': cancelled,
            'total_doctors': total_doctors,
            'total_patients': total_patients,
        })