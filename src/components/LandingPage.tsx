import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  Clock,
  Award,
  Star,
  Stethoscope,
  HeartPulse,
  Baby,
  Eye,
  Pill,
  FileText,
} from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] =
    useState("All");

  const specialties = [
    "All",
    "General Medicine",
    "Cardiology",
    "Dermatology",
    "Pediatrics",
    "Orthopedics",
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      experience: "15 years",
      rating: 4.8,
      qualifications: "MBBS, MD",
      availability: "Mon-Fri",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
      patients: "2000+",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Cardiology",
      experience: "12 years",
      rating: 4.9,
      qualifications: "MBBS, DM Cardiology",
      availability: "Tue-Fri",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
      patients: "1800+",
    },
    {
      id: 3,
      name: "Dr. David Martinez",
      specialty: "Dermatology",
      experience: "10 years",
      rating: 4.7,
      qualifications: "MBBS, MD Dermatology",
      availability: "Mon, Wed, Fri",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
      patients: "1500+",
    },
    {
      id: 4,
      name: "Dr. Emily Roberts",
      specialty: "Pediatrics",
      experience: "14 years",
      rating: 4.9,
      qualifications: "MBBS, MD Pediatrics",
      availability: "Mon-Fri",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
      patients: "2200+",
    },
    {
      id: 5,
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      experience: "18 years",
      rating: 4.8,
      qualifications: "MBBS, MS Orthopedics",
      availability: "Tue, Thu, Fri",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400",
      patients: "2500+",
    },
    {
      id: 6,
      name: "Dr. Lisa Anderson",
      specialty: "General Medicine",
      experience: "8 years",
      rating: 4.6,
      qualifications: "MBBS, MD",
      availability: "Mon-Thu",
      image:
        "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400",
      patients: "1200+",
    },
  ];

  const services = [
    {
      id: 1,
      name: "General Consultation",
      description:
        "Comprehensive health check-up and medical advice",
      icon: Stethoscope,
      duration: "30 mins",
      price: "from $50",
    },
    {
      id: 2,
      name: "Cardiology Check-up",
      description: "Heart health assessment and ECG testing",
      icon: HeartPulse,
      duration: "45 mins",
      price: "from $120",
    },
    {
      id: 3,
      name: "Pediatric Care",
      description:
        "Complete care for infants, children, and adolescents",
      icon: Baby,
      duration: "30 mins",
      price: "from $60",
    },
    {
      id: 4,
      name: "Eye Examination",
      description: "Vision testing and eye health evaluation",
      icon: Eye,
      duration: "40 mins",
      price: "from $80",
    },
    {
      id: 5,
      name: "Lab Tests",
      description:
        "Blood work, urinalysis, and other diagnostic tests",
      icon: Pill,
      duration: "15 mins",
      price: "from $30",
    },
    {
      id: 6,
      name: "Health Screening",
      description:
        "Preventive health packages for early detection",
      icon: FileText,
      duration: "60 mins",
      price: "from $150",
    },
  ];

  const filteredDoctors =
    selectedSpecialty === "All"
      ? doctors
      : doctors.filter(
          (doc) => doc.specialty === selectedSpecialty,
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-8 h-8 text-[#2A91C2]" />
              <span className="text-2xl text-[#2A91C2]">
                HealthBook
              </span>
            </div>
            <button
              onClick={() => navigate("/staff/login")}
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
            Fast, convenient, and hassle-free appointment
            booking for all your healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/book")}
              className="px-8 py-4 bg-[#2A91C2] text-white rounded-lg hover:bg-[#1B5E85] transition-colors text-lg"
            >
              Book Appointment
            </button>
            <button
              onClick={() => navigate("/my-appointments")}
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
            <h3 className="text-xl mb-2 text-gray-900">
              Quick Booking
            </h3>
            <p className="text-gray-600">
              Schedule appointments in minutes with our
              easy-to-use booking system
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-[#D9EEF7] rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-[#2A91C2]" />
            </div>
            <h3 className="text-xl mb-2 text-gray-900">
              Expert Doctors
            </h3>
            <p className="text-gray-600">
              Choose from a wide range of qualified healthcare
              professionals
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-[#D9EEF7] rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-[#2A91C2]" />
            </div>
            <h3 className="text-xl mb-2 text-gray-900">
              Quality Care
            </h3>
            <p className="text-gray-600">
              Receive the best medical care from our trusted
              healthcare providers
            </p>
          </div>
        </div>

        {/* Specialties and Doctors */}
        <div className="mt-16">
          <h2 className="text-3xl text-gray-900 mb-4">
            Choose Your Specialty
          </h2>
          <div className="flex flex-wrap gap-4 mb-8">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-lg ${
                  selectedSpecialty === specialty
                    ? "bg-[#2A91C2] text-white"
                    : "bg-white text-[#2A91C2] border-2 border-[#2A91C2]"
                } transition-colors`}
              >
                {specialty}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <h3 className="text-xl text-gray-900 mb-1">
                    {doc.name}
                  </h3>
                  <p className="text-[#2A91C2] mb-3">
                    {doc.specialty}
                  </p>

                  <div className="w-full space-y-2 text-sm">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">
                        Experience:
                      </span>
                      <span className="text-gray-900">
                        {doc.experience}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">
                        Rating:
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-900">
                          {doc.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">
                        Qualifications:
                      </span>
                      <span className="text-gray-900">
                        {doc.qualifications}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">
                        Availability:
                      </span>
                      <span className="text-gray-900">
                        {doc.availability}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600">
                        Patients Treated:
                      </span>
                      <span className="text-gray-900">
                        {doc.patients}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/book")}
                    className="mt-4 w-full py-3 bg-[#2A91C2] text-white rounded-lg hover:bg-[#1B5E85] transition-colors"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-gray-900 mb-2">
              Our Services
            </h2>
            <p className="text-gray-600">
              Comprehensive healthcare services tailored to your
              needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-[#D9EEF7] rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-[#2A91C2]" />
                </div>
                <h3 className="text-xl mb-2 text-gray-900">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {service.duration}
                  </span>
                  <span className="text-[#2A91C2]">
                    {service.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-8 h-8 text-[#2A91C2]" />
                <span className="text-2xl">HealthBook</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted partner in healthcare. Book
                appointments with ease and get the care you
                deserve.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => navigate("/book")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Book Appointment
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/my-appointments")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    My Appointments
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/staff/login")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Staff Portal
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>General Consultation</li>
                <li>Cardiology Check-up</li>
                <li>Pediatric Care</li>
                <li>Eye Examination</li>
                <li>Lab Tests</li>
                <li>Health Screening</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📍 123 Medical Center Drive</li>
                <li>📞 (555) 123-4567</li>
                <li>✉️ info@healthbook.com</li>
                <li>🕒 Mon-Fri: 8AM - 6PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} HealthBook. All
              rights reserved. | Privacy Policy | Terms of
              Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}