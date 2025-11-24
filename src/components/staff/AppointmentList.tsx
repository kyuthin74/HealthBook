import React from 'react';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import StaffLayout from './StaffLayout';
import { Search, Filter, Calendar } from 'lucide-react';

interface AppointmentListProps {
  onLogout: () => void;
}

export default function AppointmentList({ onLogout }: AppointmentListProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Get appointments from localStorage
  const allAppointments = useMemo(() => {
    const stored = localStorage.getItem('appointments');
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with mock data
    const mockData = getMockAppointments();
    localStorage.setItem('appointments', JSON.stringify(mockData));
    return mockData;
  }, []);

  const filteredAppointments = useMemo(() => {
    return allAppointments.filter((apt: any) => {
      const matchesSearch =
        apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.reason.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = filterStatus === 'all' || apt.status === filterStatus;

      return matchesSearch && matchesFilter;
    });
  }, [allAppointments, searchTerm, filterStatus]);

  return (
    <StaffLayout onLogout={onLogout}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl text-gray-900 mb-8">Appointments</h1>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by patient, doctor, or reason..."
                value={searchTerm}
                onChange={(e: { target: { value: any; }; }) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-700">Patient</th>
                  <th className="px-6 py-4 text-left text-gray-700">Date & Time</th>
                  <th className="px-6 py-4 text-left text-gray-700">Doctor</th>
                  <th className="px-6 py-4 text-left text-gray-700">Reason</th>
                  <th className="px-6 py-4 text-left text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment: any) => (
                    <tr
                      key={appointment.id}
                      onClick={() => navigate(`/staff/appointments/${appointment.id}`)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-gray-900">{appointment.patientName}</div>
                          <div className="text-sm text-gray-500">{appointment.patientPhone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-gray-900">{formatDate(appointment.date)}</div>
                          <div className="text-sm text-gray-500">{appointment.time}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-gray-900">Dr. {appointment.doctor}</div>
                          <div className="text-sm text-gray-500">{appointment.department}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{appointment.reason}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            appointment.status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : appointment.status === 'pending'
                              ? 'bg-amber-100 text-amber-700'
                              : appointment.status === 'completed'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getMockAppointments() {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  
  return [
    {
      id: '1',
      patientId: 'p1',
      patientName: 'John Smith',
      patientEmail: 'john.smith@email.com',
      patientPhone: '(555) 123-4567',
      date: today,
      time: '09:00 AM',
      doctor: 'Sarah Johnson',
      department: 'General Medicine',
      reason: 'Regular checkup',
      status: 'confirmed',
      notes: 'Patient has no known allergies',
    },
    {
      id: '2',
      patientId: 'p2',
      patientName: 'Emma Wilson',
      patientEmail: 'emma.wilson@email.com',
      patientPhone: '(555) 234-5678',
      date: today,
      time: '10:30 AM',
      doctor: 'Michael Chen',
      department: 'Cardiology',
      reason: 'Heart consultation',
      status: 'pending',
      notes: '',
    },
    {
      id: '3',
      patientId: 'p3',
      patientName: 'James Brown',
      patientEmail: 'james.brown@email.com',
      patientPhone: '(555) 345-6789',
      date: today,
      time: '02:00 PM',
      doctor: 'Sarah Johnson',
      department: 'General Medicine',
      reason: 'Flu symptoms',
      status: 'confirmed',
      notes: 'Patient requested afternoon slot',
    },
    {
      id: '4',
      patientId: 'p4',
      patientName: 'Lisa Anderson',
      patientEmail: 'lisa.anderson@email.com',
      patientPhone: '(555) 456-7890',
      date: tomorrow,
      time: '11:00 AM',
      doctor: 'David Martinez',
      department: 'Dermatology',
      reason: 'Skin rash examination',
      status: 'confirmed',
      notes: '',
    },
    {
      id: '5',
      patientId: 'p5',
      patientName: 'Robert Taylor',
      patientEmail: 'robert.taylor@email.com',
      patientPhone: '(555) 567-8901',
      date: tomorrow,
      time: '03:30 PM',
      doctor: 'Sarah Johnson',
      department: 'General Medicine',
      reason: 'Follow-up appointment',
      status: 'pending',
      notes: 'Follow-up after last week\'s visit',
    },
  ];
}
