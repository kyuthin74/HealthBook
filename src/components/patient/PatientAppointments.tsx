import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Search, Clock, User, FileText, X } from 'lucide-react';

export default function PatientAppointments() {
  const navigate = useNavigate();
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchEmail && !searchPhone) {
      alert('Please enter your email or phone number');
      return;
    }

    const stored = localStorage.getItem('appointments');
    const appointments = stored ? JSON.parse(stored) : [];

    const results = appointments.filter((apt: any) => {
      const emailMatch = searchEmail ? apt.patientEmail.toLowerCase() === searchEmail.toLowerCase() : true;
      const phoneMatch = searchPhone ? apt.patientPhone.includes(searchPhone) : true;
      return emailMatch && phoneMatch;
    });

    setFilteredAppointments(results);
    setHasSearched(true);
  };

  const handleCancel = (appointmentId: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    const stored = localStorage.getItem('appointments');
    const appointments = stored ? JSON.parse(stored) : [];
    const updatedAppointments = appointments.map((apt: any) =>
      apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    // Update filtered appointments
    setFilteredAppointments(prev =>
      prev.map(apt => apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt)
    );
    
    alert('Appointment cancelled successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D9EEF7] to-[#E8F5E9]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <Calendar className="w-8 h-8 text-[#2A91C2]" />
              <span className="text-2xl text-[#2A91C2]">HealthBook</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl text-gray-900 mb-3">My Appointments</h1>
          <p className="text-gray-600">View and manage your scheduled appointments</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
          <h2 className="text-xl text-gray-900 mb-4">Find Your Appointments</h2>
          <p className="text-gray-600 mb-6">
            Enter your email or phone number to view your appointments
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                placeholder="(555) 123-4567"
              />
            </div>
            <button
              onClick={handleSearch}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#2A91C2] text-white rounded-lg hover:bg-[#1B5E85] transition-colors"
            >
              <Search className="w-5 h-5" />
              Search Appointments
            </button>
          </div>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="space-y-4">
            {filteredAppointments.length > 0 ? (
              <>
                <h2 className="text-xl text-gray-900">Your Appointments ({filteredAppointments.length})</h2>
                {filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
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
                        </div>
                        <p className="text-sm text-gray-500">Confirmation: {appointment.id}</p>
                      </div>
                      {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                        <button
                          onClick={() => handleCancel(appointment.id)}
                          className="flex items-center gap-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span className="text-sm">Cancel</span>
                        </button>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-[#2A91C2] mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="text-gray-900">{formatDate(appointment.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-[#2A91C2] mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="text-gray-900">{appointment.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-[#2A91C2] mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Doctor</p>
                          <p className="text-gray-900">Dr. {appointment.doctor}</p>
                          <p className="text-sm text-gray-600">{appointment.department}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-[#2A91C2] mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Reason</p>
                          <p className="text-gray-900">{appointment.reason}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl text-gray-900 mb-2">No Appointments Found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any appointments with the provided information
                </p>
                <button
                  onClick={() => navigate('/book')}
                  className="px-6 py-3 bg-[#2A91C2] text-white rounded-lg hover:bg-[#1B5E85] transition-colors"
                >
                  Book New Appointment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
}