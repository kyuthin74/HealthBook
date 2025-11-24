import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Clock, Award } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-8 h-8 text-[#2A91C2]" />
              <span className="text-2xl text-[#2A91C2]">HealthBook</span>
            </div>
            <button
              onClick={() => navigate('/staff/login')}
              className="px-4 py-2 text-[#2A91C2] bg-[#D9EEF7] hover:bg-[#1B5E85] hover:text-white rounded-lg transition-colors"
            >
              Staff Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6">
            Book Your Medical Appointments with Ease
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Fast, convenient, and hassle-free appointment booking for all your healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/book')}
              className="px-8 py-4 bg-[#2A91C2] text-white rounded-lg hover:bg-[#1B5E85] transition-colors text-lg"
            >
              Book Appointment
            </button>
            <button
              onClick={() => navigate('/my-appointments')}
              className="px-8 py-4 bg-white text-[#2A91C2] border-2 border-[#2A91C2] rounded-lg hover:bg-[#D9EEF7] transition-colors text-lg"
            >
              View My Appointments
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-[#D9EEF7] rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-[#2A91C2]" />
            </div>
            <h3 className="text-xl mb-2 text-gray-900">Quick Booking</h3>
            <p className="text-gray-600">
              Schedule appointments in minutes with our easy-to-use booking system
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-[#D9EEF7] rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-[#2A91C2]" />
            </div>
            <h3 className="text-xl mb-2 text-gray-900">Expert Doctors</h3>
            <p className="text-gray-600">
              Choose from a wide range of qualified healthcare professionals
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-[#D9EEF7] rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-[#2A91C2]" />
            </div>
            <h3 className="text-xl mb-2 text-gray-900">Quality Care</h3>
            <p className="text-gray-600">
              Receive the best medical care from our trusted healthcare providers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}