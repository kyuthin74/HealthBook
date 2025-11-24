import { useState } from 'react';
import StaffLayout from './StaffLayout';
import { User, Mail, Phone, Lock, Building, Save } from 'lucide-react';

interface SettingsProps {
  onLogout: () => void;
}

export default function Settings({ onLogout }: SettingsProps) {
  const [formData, setFormData] = useState({
    name: 'Dr. Mark James',
    email: 'staff@clinic.com',
    phone: '(555) 987-6543',
    specialty: 'Dentist',
    clinicName: 'HealthBook Medical Center',
    clinicAddress: '123 Medical Drive, Health City, HC 12345',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <StaffLayout onLogout={onLogout}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl text-gray-900 mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Profile Information */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-xl text-gray-900 mb-6">Profile Information</h2>
            
            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-100">
              <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-white text-2xl">
                DJ
              </div>
              <div>
                <button className="px-4 py-2 bg-[#2A91C2] text-white rounded-lg hover:bg-[#1B5E85] transition-colors mb-2">
                  Change Photo
                </button>
                <p className="text-sm text-gray-500">JPG, GIF or PNG. Max size 2MB</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="specialty" className="block text-gray-700 mb-2">
                  Specialty
                </label>
                <select
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                >
                  <option value="Dentist">Dentist</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                </select>
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Clinic Information */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-xl text-gray-900 mb-6">Clinic Information</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="clinicName" className="block text-gray-700 mb-2">
                  Clinic Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="clinicName"
                    name="clinicName"
                    type="text"
                    value={formData.clinicName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="clinicAddress" className="block text-gray-700 mb-2">
                  Clinic Address
                </label>
                <input
                  id="clinicAddress"
                  name="clinicAddress"
                  type="text"
                  value={formData.clinicAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-xl text-gray-900 mb-6">Change Password</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="currentPassword" className="block text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                    placeholder="Enter current password"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="newPassword" className="block text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-xl text-gray-900 mb-6">Notification Preferences</h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 text-[#2A91C2] rounded focus:ring-2 focus:ring-[#2A91C2]" />
                <div>
                  <p className="text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive email notifications for new appointments</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 text-[#2A91C2] rounded focus:ring-2 focus:ring-[#2A91C2]" />
                <div>
                  <p className="text-gray-900">SMS Notifications</p>
                  <p className="text-sm text-gray-500">Receive SMS reminders for upcoming appointments</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 text-[#2A91C2] rounded focus:ring-2 focus:ring-[#2A91C2]" />
                <div>
                  <p className="text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                </div>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-8 py-3 bg-[#2A91C2] text-white rounded-lg hover:bg-[#1B5E85] transition-colors"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
}