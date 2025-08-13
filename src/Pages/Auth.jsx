import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    phone: '',
    department: '',
    academicYear: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  // Generate a simple captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let str = '';
    for (let i = 0; i < 5; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
  };

  // On registration mode, generate captcha
  useEffect(() => {
    if (!isLogin) {
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
    }
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isLogin && captchaInput !== captcha) {
      setError('Captcha does not match. Please try again.');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const result = await login({
          email: formData.email,
          password: formData.password
        });
        
        if (result.success) {
          navigate(from, { replace: true });
        } else {
          setError(result.error || 'Login failed');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        const result = await register({
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          phone: formData.phone,
          department: formData.department,
          academicYear: formData.academicYear,
          password: formData.password
        });
        
        if (result.success) {
          navigate(from, { replace: true });
        } else {
          setError(result.error || 'Registration failed');
        }
      }
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? "Welcome Back!" : "Join oneCircle"}
            </h1>
            <p className="text-gray-600">
              {isLogin
                ? "Sign in to access all features"
                : "Create your account to get started"}
            </p>

            {isLogin && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-left">
                <h4 className="font-semibold text-blue-800 text-sm mb-2">🔑 Admin Panel Demo Credentials:</h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <div>Username: <span className="font-mono">admin</span></div>
                  <div>Password: <span className="font-mono">onecircle2025</span></div>
                  <div className="text-xs text-gray-500">(Use these to access the Admin Panel at <span className="font-mono">/admin-panel</span>)</div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="alert alert-error mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input input-bordered w-full focus:input-primary"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Phone </span>
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="input input-bordered w-full focus:input-primary"
                    placeholder="Enter your Phone Number"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Department </span>
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="input input-bordered w-full focus:input-primary"
                    placeholder="Enter your Department"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Academic Year </span>
                  </label>
                  <input
                    type="text"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    className="input input-bordered w-full focus:input-primary"
                    placeholder="Enter your Academic Year"
                    required
                  />
                </div>
              </>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input input-bordered w-full focus:input-primary"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Department and Academic Year fields removed from login form */}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input input-bordered w-full focus:input-primary"
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            {!isLogin && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Captcha</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="px-4 py-2 bg-gray-100 rounded font-mono text-lg tracking-widest select-none border border-gray-300">{captcha}</span>
                  <button type="button" className="btn btn-xs btn-outline" onClick={() => setCaptcha(generateCaptcha())}>Refresh</button>
                </div>
                <input
                  type="text"
                  name="captchaInput"
                  value={captchaInput}
                  onChange={e => setCaptchaInput(e.target.value.toUpperCase())}
                  className="input input-bordered w-full focus:input-primary mt-2"
                  placeholder="Enter captcha above"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full text-white font-semibold py-3 ${
                loading ? "loading" : ""
              }`}
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          <div className="divider my-6">OR</div>

          <div className="text-center">
            <button
              onClick={toggleMode}
              className="link link-primary font-semibold"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
