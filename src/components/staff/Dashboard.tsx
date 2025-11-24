import { useNavigate } from 'react-router-dom';
import StaffLayout from './StaffLayout';
import { Calendar, Users, Clock, CheckCircle, TrendingUp, Plus, ChevronDown, ChevronRight, X, ChevronLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Get mock appointments from localStorage
  const appointments = useMemo(() => {
    const stored = localStorage.getItem('appointments');
    return stored ? JSON.parse(stored) : getMockAppointments();
  }, [refreshKey]);

  const stats = {
    totalMonth: appointments.length,
    pending: appointments.filter((apt: any) => apt.status === 'pending').length,
    completed: appointments.filter((apt: any) => apt.status === 'completed').length,
  };

  // Get today's appointments for timeline
  const todayAppointments = appointments
    .filter((apt: any) => apt.date === getTodayDate())
    .sort((a: any, b: any) => a.time.localeCompare(b.time))
    .slice(0, 4);

  // Get pending appointment requests
  const appointmentRequests = appointments
    .filter((apt: any) => apt.status === 'pending')
    .slice(0, 4);

  // Generate calendar days for the current month
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Get today for comparison
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    const todayDate = today.getDate();
    
    // Build calendar grid
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const appointmentCount = appointments.filter((apt: any) => apt.date === dateStr).length;
      
      days.push({
        day,
        dateStr,
        isToday: isCurrentMonth && day === todayDate,
        isSelected: selectedDate && 
                    selectedDate.getFullYear() === year && 
                    selectedDate.getMonth() === month && 
                    selectedDate.getDate() === day,
        hasAppointments: appointmentCount > 0,
        appointmentCount
      });
    }
    
    return days;
  }, [currentDate, selectedDate, appointments]);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const selectedDayAppointments = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = selectedDate.toISOString().split('T')[0];
    return appointments
      .filter((apt: any) => apt.date === dateStr)
      .sort((a: any, b: any) => a.time.localeCompare(b.time));
  }, [selectedDate, appointments, refreshKey]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: any) => {
    if (day) {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day);
      setSelectedDate(newDate);
    }
  };

  const handleAccept = (id: string) => {
    const stored = localStorage.getItem('appointments');
    const appointments = stored ? JSON.parse(stored) : [];
    const updated = appointments.map((apt: any) =>
      apt.id === id ? { ...apt, status: 'confirmed' } : apt
    );
    localStorage.setItem('appointments', JSON.stringify(updated));
    setShowConfirmModal(true);
    setRefreshKey(prev => prev + 1);
  };

  const handleReject = (id: string) => {
    const stored = localStorage.getItem('appointments');
    const appointments = stored ? JSON.parse(stored) : [];
    const updated = appointments.map((apt: any) =>
      apt.id === id ? { ...apt, status: 'cancelled' } : apt
    );
    localStorage.setItem('appointments', JSON.stringify(updated));
    setRefreshKey(prev => prev + 1);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <StaffLayout onLogout={onLogout}>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Hero Banner */}
          <div className="bg-white rounded-2xl p-8 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-3xl text-gray-900 mb-4">
                Add appointment in<br />your schedule now
              </h2>
              <button 
                onClick={() => navigate('/book')}
                className="flex items-center gap-2 px-6 py-3 bg-[#2A91C2] text-white rounded-lg hover:bg-[#1B5E85] transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Appointment
              </button>
            </div>
            <div className="hidden md:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1587391795437-3b59fca90950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9ycyUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjM5ODg3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Medical staff illustration"
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-gray-900">Calendar</h3>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePrevMonth}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-gray-900 min-w-[120px] text-center">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <button 
                  onClick={handleNextMonth}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <div className="min-w-max">
                <div className="grid grid-cols-7 gap-4 mb-4">
                  {weekDays.map((day) => (
                    <div key={day} className="text-center text-xs text-gray-500 w-12">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-4">
                  {calendarData.map((day, index) => (
                    <button
                      key={day ? `day-${day.day}` : `empty-${index}`}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        day && day.isToday
                          ? 'bg-[#2A91C2] text-white'
                          : day && day.isSelected
                            ? 'bg-[#E8F5E9] text-[#4CAF50]'
                            : day && day.hasAppointments
                              ? 'bg-gray-100 text-gray-700'
                              : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => handleDateClick(day)}
                      disabled={!day}
                    >
                      {day ? day.day : ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-gray-900">Timeline</h3>
              {selectedDate && (
                <span className="text-sm text-gray-500">
                  {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              )}
            </div>
            <div className="space-y-6">
              {selectedDayAppointments.map((apt: any) => (
                <div key={apt.id} className="flex gap-6">
                  <div className="text-sm text-gray-500 w-16 flex-shrink-0">
                    {apt.time.split(' ')[0]}<br/>{apt.time.split(' ')[1].toLowerCase()}
                  </div>
                  <div className="flex-1 pb-6 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          apt.status === 'confirmed' ? 'bg-[#4CAF50]' : 
                          apt.status === 'pending' ? 'bg-orange-500' : 
                          'bg-gray-400'
                        }`}></div>
                        <div>
                          <h4 className="text-gray-900 mb-1">{apt.reason}</h4>
                          <p className="text-sm text-gray-500">Patient Name - {apt.patientName}</p>
                          <span className={`inline-block mt-1 px-2 py-1 rounded text-xs ${
                            apt.status === 'confirmed' ? 'bg-[#E8F5E9] text-[#4CAF50]' : 
                            apt.status === 'pending' ? 'bg-orange-50 text-orange-600' : 
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">{apt.time}</p>
                        <button 
                          onClick={() => navigate(`/staff/appointments/${apt.id}`)}
                          className="text-sm text-[#2A91C2] hover:text-[#1B5E85]"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {selectedDayAppointments.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  No appointments scheduled for {selectedDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Requests */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white rounded-2xl p-6 space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Total appointment in This Month</p>
              <p className="text-5xl text-gray-900">{stats.totalMonth}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Pending appointment in This Month</p>
              <p className="text-5xl text-gray-900">{stats.pending}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Complete appointment in This Month</p>
              <p className="text-5xl text-gray-900">{stats.completed}</p>
            </div>
          </div>

          {/* Appointment Requests */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-gray-900">Appointment Request's</h3>
              <button 
                onClick={() => navigate('/staff/appointments')}
                className="text-sm text-[#2A91C2] hover:text-[#1B5E85]"
              >
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {appointmentRequests.map((apt: any) => (
                <div key={apt.id} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 flex-shrink-0">
                      {apt.patientName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-gray-900">{apt.patientName}</h4>
                        <span className="text-xs text-gray-500 whitespace-nowrap">{apt.time}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {apt.patientName.split(' ')[1]}, {calculateAge(apt.patientId)}
                      </p>
                      <p className="text-sm text-gray-600">{apt.reason}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAccept(apt.id)}
                      className="flex-1 py-2 bg-[#E8F5E9] text-[#4CAF50] rounded-lg hover:bg-[#4CAF50] hover:text-white transition-colors text-sm"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => handleReject(apt.id)}
                      className="flex-1 py-2 bg-red-50 text-[#D32F2F] rounded-lg hover:bg-[#D32F2F] hover:text-white transition-colors text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
              {appointmentRequests.length === 0 && (
                <p className="text-center text-gray-500 py-8">No pending requests</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 border-[#E8F5E9]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#4CAF50]" />
                </div>
                <h3 className="text-xl text-gray-900">Appointment Confirmed</h3>
              </div>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-8">
              The appointment has been successfully confirmed and the patient will be notified.
            </p>
            <button 
              onClick={handleCloseModal}
              className="w-full py-3 bg-[#2A91C2] text-white rounded-lg hover:bg-[#1B5E85] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </StaffLayout>
  );
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function calculateAge(patientId: string) {
  // Mock age calculation
  const ages = [28, 35, 42, 24, 38];
  return ages[parseInt(patientId.slice(-1)) % ages.length];
}

function getMockAppointments() {
  const today = getTodayDate();
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
  ];
}