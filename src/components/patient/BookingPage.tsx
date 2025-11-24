import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, User, Mail, Phone, FileText } from 'lucide-react';

export default function BookingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    date: '',
    time: '',
    doctor: '',
    department: '',
    reason: '',
  });

  const doctors = [
    { name: 'Sarah Johnson', department: 'General Medicine', workDays: [1, 2, 3, 4, 5] }, // Mon-Fri
    { name: 'Michael Chen', department: 'Cardiology', workDays: [2, 3, 4, 5] }, // Tue-Fri
    { name: 'David Martinez', department: 'Dermatology', workDays: [1, 3, 5] }, // Mon, Wed, Fri
    { name: 'Emily Roberts', department: 'Pediatrics', workDays: [1, 2, 3, 4, 5] }, // Mon-Fri
    { name: 'James Wilson', department: 'Orthopedics', workDays: [2, 4, 5] }, // Tue, Thu, Fri
  ];

  const allTimeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  ];

  // Get existing appointments from localStorage
  const existingAppointments = useMemo(() => {
    const stored = localStorage.getItem('appointments');
    return stored ? JSON.parse(stored) : [];
  }, []);

  // Get available time slots for selected doctor and date
  const availableTimeSlots = useMemo(() => {
    if (!formData.doctor || !formData.date) return [];

    // Get booked slots for this doctor on this date
    const bookedSlots = existingAppointments
      .filter((apt: any) => 
        apt.doctor === formData.doctor && 
        apt.date === formData.date &&
        apt.status !== 'cancelled'
      )
      .map((apt: any) => apt.time);

    // Return slots that are not booked
    return allTimeSlots.filter(slot => !bookedSlots.includes(slot));
  }, [formData.doctor, formData.date, existingAppointments]);

  // Check if a date is available for the selected doctor
  const isDateAvailable = (dateStr: string) => {
    if (!formData.doctor) return false;

    const selectedDoctor = doctors.find(d => d.name === formData.doctor);
    if (!selectedDoctor) return false;

    const date = new Date(dateStr + 'T00:00:00');
    const dayOfWeek = date.getDay();

    // Check if doctor works on this day
    return selectedDoctor.workDays.includes(dayOfWeek);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new appointment
    const newAppointment = {
      id: Date.now().toString(),
      patientId: `p${Date.now()}`,
      ...formData,
      status: 'pending',
      notes: '',
    };

    // Save to localStorage
    const stored = localStorage.getItem('appointments');
    const appointments = stored ? JSON.parse(stored) : [];
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Save booking ID for success page
    localStorage.setItem('lastBookingId', newAppointment.id);

    navigate('/booking-success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Auto-fill department when doctor is selected and reset date/time
    if (name === 'doctor') {
      const selectedDoctor = doctors.find((d) => d.name === value);
      if (selectedDoctor) {
        setFormData((prev) => ({ 
          ...prev, 
          doctor: value,
          department: selectedDoctor.department,
          date: '', // Reset date when doctor changes
          time: ''  // Reset time when doctor changes
        }));
      }
    } else if (name === 'date') {
      // Reset time when date changes
      setFormData((prev) => ({ ...prev, date: value, time: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Get selected doctor info
  const selectedDoctor = doctors.find(d => d.name === formData.doctor);

  // Get work days text for selected doctor
  const workDaysText = useMemo(() => {
    if (!selectedDoctor) return '';
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return selectedDoctor.workDays.map(day => dayNames[day]).join(', ');
  }, [selectedDoctor]);

  // Get min date (today)
  const minDate = new Date().toISOString().split('T')[0];

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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl text-gray-900 mb-3">Book an Appointment</h1>
          <p className="text-gray-600">Fill in your details to schedule your visit</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl text-gray-900 mb-4">Personal Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="patientName" className="block text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="patientName"
                      name="patientName"
                      type="text"
                      required
                      value={formData.patientName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                      placeholder="John Smith"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="patientPhone" className="block text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="patientPhone"
                      name="patientPhone"
                      type="tel"
                      required
                      value={formData.patientPhone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="patientEmail" className="block text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="patientEmail"
                    name="patientEmail"
                    type="email"
                    required
                    value={formData.patientEmail}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                    placeholder="john.smith@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-xl text-gray-900 mb-4">Appointment Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="doctor" className="block text-gray-700 mb-2">
                    Select Doctor *
                  </label>
                  <select
                    id="doctor"
                    name="doctor"
                    required
                    value={formData.doctor}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                  >
                    <option value="">Choose a doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc.name} value={doc.name}>
                        Dr. {doc.name} - {doc.department}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="department" className="block text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    readOnly
                    value={formData.department}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    placeholder="Auto-filled"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    min={minDate}
                    value={formData.date}
                    onChange={handleChange}
                    disabled={!formData.doctor}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  {!formData.doctor && (
                    <p className="text-xs text-gray-500 mt-1">Please select a doctor first</p>
                  )}
                  {formData.doctor && selectedDoctor && (
                    <p className="text-xs text-[#2A91C2] mt-1">
                      Dr. {selectedDoctor.name} is available on: {workDaysText}
                    </p>
                  )}
                  {formData.doctor && formData.date && !isDateAvailable(formData.date) && (
                    <p className="text-xs text-[#D32F2F] mt-1">
                      Dr. {selectedDoctor?.name} is not available on this day. Please choose: {workDaysText}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="time" className="block text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    disabled={!formData.doctor || !formData.date}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select a time</option>
                    {availableTimeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {!formData.doctor && (
                    <p className="text-xs text-gray-500 mt-1">Please select a doctor first</p>
                  )}
                  {formData.doctor && !formData.date && (
                    <p className="text-xs text-gray-500 mt-1">Please select a date first</p>
                  )}
                  {formData.doctor && formData.date && availableTimeSlots.length === 0 && (
                    <p className="text-xs text-[#D32F2F] mt-1">
                      No available time slots for this date. Please choose another date.
                    </p>
                  )}
                  {formData.doctor && formData.date && availableTimeSlots.length > 0 && (
                    <p className="text-xs text-[#4CAF50] mt-1">
                      {availableTimeSlots.length} time slot{availableTimeSlots.length !== 1 ? 's' : ''} available
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="reason" className="block text-gray-700 mb-2">
                  Reason for Visit *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    id="reason"
                    name="reason"
                    required
                    value={formData.reason}
                    onChange={handleChange}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none resize-none"
                    placeholder="Describe your symptoms or reason for the visit..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-4 bg-[#2A91C2] text-white rounded-lg hover:bg-[#1B5E85] transition-colors text-lg"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}