import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Lock, User } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation (demo purposes)
    if (email === 'staff@clinic.com' && password === 'password') {
      onLogin();
      navigate('/staff/dashboard');
    } else {
      setError('Invalid credentials. Use: staff@clinic.com / password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#2A91C2] rounded-2xl flex items-center justify-center">
              <Calendar className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl text-gray-900 mb-2">HealthBook Staff</h1>
          <p className="text-gray-600">Sign in to access the dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                  placeholder="staff@clinic.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A91C2] focus:border-transparent outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#2A91C2] text-white rounded-lg hover:bg-[#1B5E85] transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-[#2A91C2] hover:text-[#1B5E85]"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 text-center text-sm text-gray-600 bg-white rounded-lg p-4">
          <p className="mb-1">Demo Credentials:</p>
          <p>Email: staff@clinic.com</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
}