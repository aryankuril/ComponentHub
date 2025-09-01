// app/signup/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Eye, EyeOff, User, Mail, UserPlus, Lock } from 'lucide-react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.ok) {
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        router.push('/profile');
      } else {
        const data = await res.json();
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
  {/* Title */}
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
      Welcome Back
    </h1>
    <p className="text-gray-400 mt-2">
      Sign in to access your component library
    </p>
  </div>

  {/* Card */}
  <div className="w-full max-w-md border border-cyan-500/30  rounded-xl shadow-lg p-6">
    {/* Header */}
    <div className="text-center mb-6">
      <h1 className="flex text-4xl items-center justify-center gap-2 text-cyan-400">
        <UserPlus className="w-8 h-8 text-cyan-400" />
        Create Account
      </h1>
      <p className="text-gray-400 mt-2">Fill in your details to get started</p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-cyan-400">Full Name</label>
        <div className="relative mt-1">
          <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="w-full pl-10 pr-3 py-2 bg-black/30 border border-cyan-500/30 focus:border-cyan-400 text-white placeholder-gray-500 rounded-md focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-cyan-400">Email</label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full pl-10 pr-3 py-2 bg-black/30 border border-cyan-500/30 focus:border-cyan-400 text-white placeholder-gray-500 rounded-md focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-cyan-400">Password</label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Create a password"
            className="w-full pl-10 pr-10 py-2 bg-black/30 border border-cyan-500/30 focus:border-cyan-400 text-white placeholder-gray-500 rounded-md focus:outline-none "
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-cyan-400"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-cyan-400">Confirm Password</label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            className="w-full pl-10 pr-10 py-2 bg-black/30 border border-cyan-500/30 focus:border-cyan-400 text-white placeholder-gray-500 rounded-md focus:outline-none"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-cyan-400"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Terms */}
      <p className="text-xs text-gray-400">
        By creating an account, you agree to our{' '}
        <Link href="/terms" className=" text-cyan-400  hover:text-purple-400">Terms & Conditions</Link> and{' '}
        <Link href="/privacy" className="text-cyan-400 hover:text-purple-400">Privacy Policy</Link>.
      </p>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-2 rounded-md transition flex justify-center items-center"
      >
        Create Account
      </button>
    </form>

    {/* Footer */}
    <div className="mt-6 text-center">
      <p className="text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-cyan-400 hover:text-purple-400 font-medium">
          Sign in here
        </Link>
      </p>
    </div>
  </div>
</div>

  );
}
