import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CheckCircle, Calendar, Clock, User, Mail, Phone, Home, ClipboardList } from 'lucide-react';

export default function BookingSuccess() {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<any>(null);

  useEffect(() => {
    const bookingId = localStorage.getItem('lastBookingId');
    if (!bookingId) {
      navigate('/book');
      return;
    }

    const stored = localStorage.getItem('appointments');
    const appointments = stored ? JSON.parse(stored) : [];
    const booking = appointments.find((apt: any) => apt.id === bookingId);
    
    if (booking) {
      setAppointment(booking);
    } else {
      navigate('/book');
    }
  }, [navigate]);

  if (!appointment) {
    return <div className="min-h-screen bg-gradient-to-br from-[#D9EEF7] to-[#E8F5E9] flex items-center justify-center">
      <p className="text-gray-600">Loading...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D9EEF7] to-[#E8F5E9]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-8 h-8 text-[#2A91C2]" />
            <span className="text-2xl text-[#2A91C2]">HealthBook</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl text-gray-900 mb-3">Appointment Booked!</h1>
          <p className="text-gray-600">
            Your appointment has been successfully scheduled. You will receive a confirmation email shortly.
          </p>
        </div>

        {/* Appointment Details Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
          <h2 className="text-xl text-gray-900 mb-6">Appointment Details</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <Calendar className="w-5 h-5 text-[#2A91C2] mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-gray-900">{formatDate(appointment.date)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <Clock className="w-5 h-5 text-[#2A91C2] mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="text-gray-900">{appointment.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <User className="w-5 h-5 text-[#2A91C2] mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="text-gray-900">Dr. {appointment.doctor}</p>
                <p className="text-sm text-gray-600">{appointment.department}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <User className="w-5 h-5 text-[#2A91C2] mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Patient</p>
                <p className="text-gray-900">{appointment.patientName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <Mail className="w-5 h-5 text-[#2A91C2] mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{appointment.patientEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <Phone className="w-5 h-5 text-[#2A91C2] mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-900">{appointment.patientPhone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-[#2A91C2] mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Reason for Visit</p>
                <p className="text-gray-900">{appointment.reason}</p>
              </div>
            </div>
          </div>

          {/* Confirmation Number */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Confirmation Number</p>
            <p className="text-gray-900 font-mono">{appointment.id}</p>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-[#D9EEF7] border border-[#2A91C2] rounded-xl p-6 mb-6">
          <h3 className="text-gray-900 mb-2">Important Information</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Please arrive 15 minutes before your appointment time</li>
            <li>• Bring a valid ID and insurance card</li>
            <li>• If you need to reschedule, please call us at least 24 hours in advance</li>
            <li>• You will receive a confirmation email with further instructions</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-[#2A91C2] text-[#2A91C2] rounded-lg hover:bg-[#D9EEF7] transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
          <button
            onClick={() => navigate('/my-appointments')}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#2A91C2] text-white rounded-lg hover:bg-[#1B5E85] transition-colors"
          >
            <ClipboardList className="w-5 h-5" />
            View My Appointments
          </button>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
}