import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StaffLayout from './StaffLayout';
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, FileText, Save } from 'lucide-react';

interface AppointmentDetailProps {
  onLogout: () => void;
}

export default function AppointmentDetail({ onLogout }: AppointmentDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(() => {
    const stored = localStorage.getItem('appointments');
    const appointments = stored ? JSON.parse(stored) : [];
    return appointments.find((apt: any) => apt.id === id);
  });

  const [status, setStatus] = useState(appointment?.status || '');
  const [notes, setNotes] = useState(appointment?.notes || '');

  if (!appointment) {
    return (
      <StaffLayout onLogout={onLogout}>
        <div className="max-w-4xl mx-auto text-center py-12">
          <p className="text-gray-500 mb-4">Appointment not found</p>
          <button
            onClick={() => navigate('/staff/appointments')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Back to Appointments
          </button>
        </div>
      </StaffLayout>
    );
  }

  const handleSave = () => {
    const stored = localStorage.getItem('appointments');
    const appointments = stored ? JSON.parse(stored) : [];
    const updatedAppointments = appointments.map((apt: any) =>
      apt.id === id ? { ...apt, status, notes } : apt
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointment({ ...appointment, status, notes });
    alert('Appointment updated successfully!');
  };

  return (
    <StaffLayout onLogout={onLogout}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/staff/appointments')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Appointments
        </button>

        <h1 className="text-3xl text-gray-900 mb-8">Appointment Details</h1>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Patient Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl text-gray-900 mb-4">Patient Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Patient Name</p>
                  <p className="text-gray-900">{appointment.patientName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{appointment.patientEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">{appointment.patientPhone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Patient ID</p>
                  <p className="text-gray-900">{appointment.patientId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl text-gray-900 mb-4">Appointment Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-gray-900">{formatDate(appointment.date)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="text-gray-900">{appointment.time}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="text-gray-900">Dr. {appointment.doctor}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="text-gray-900">{appointment.department}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Reason for Visit</p>
              <p className="text-gray-900">{appointment.reason}</p>
            </div>
          </div>

          {/* Status and Notes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl text-gray-900 mb-4">Status & Notes</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-gray-700 mb-2">
                  Appointment Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label htmlFor="notes" className="block text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                  placeholder="Add notes about this appointment..."
                />
              </div>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
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
