'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        setError('Invalid credentials');
      } else {
        router.push('/profile');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black  white-text  px-4">
      <div className="w-full max-w-md">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Welcome Back
          </h1>
          <p className=" grey-text  mt-2">
            Login to access your component library
          </p>
        </div>

        {/* Card */}
        
        <div className="bg-[#0a0a0a] border border-transparent hover:border-[#F9B31B]/30 rounded-2xl p-6">
          <div className="text-center mb-6">
            <h2 className="flex items-center justify-center gap-2 text-primary text-xl font-semibold">
              <LogIn className="w-5 h-5" />
              Login
            </h2>
            <p className=" grey-text  text-sm mt-1">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-primary text-sm">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 w-4 h-4  grey-text " />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 rounded-md bg-black border border-[#F9B31B]/30 focus:border-[#F9B31B]  white-text  placeholder-gray-500 outline-none transition"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-primary text-sm">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 w-4 h-4  grey-text " />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-2 rounded-md bg-black border border-[#F9B31B]/30 focus:border-[#F9B31B]  white-text  placeholder-gray-500 outline-none transition"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 p-1  grey-text  cursor-pointer "
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            {/* <div className="flex justify-end text-sm">
              <Link href="/forgot-password" className="text-primary transition-colors">
                Forgot password?
              </Link>
            </div> */}

            {/* Submit */}
            <button
              style={{
    backgroundImage: 'linear-gradient(135deg, #F9B31B, #EBEBEB)',
  }} 
              type="submit"
              disabled={isLoading}
              className="w-full  black-text cursor-pointer  font-semibold py-2 rounded-md transition flex justify-center items-center"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />
                  Signing in...
                </div>
              ) : (
                "Login"
              )}
            </button>


            {/* <div className="mt-6 space-y-3"> */}

  {/* <div className="flex items-center gap-2">
    <div className="flex-1 h-px bg-[#F9B31B]/20" />
    <span className="text-xs grey-text">OR</span>
    <div className="flex-1 h-px bg-[#F9B31B]/20" />
  </div> */}

  {/* Google */}
  {/* <button
    onClick={() => signIn("google", { callbackUrl: "/profile" })}
    className="w-full border border-[#F9B31B]/30 py-2 rounded-md font-semibold hover:bg-[#111] transition"
  >
    Continue with Google
  </button> */}

  {/* GitHub */}
  {/* <button
    onClick={() => signIn("github", { callbackUrl: "/profile" })}
    className="w-full border border-[#F9B31B]/30 py-2 rounded-md font-semibold hover:bg-[#111] transition"
  >
    Continue with GitHub
  </button> */}

{/* </div> */}
          </form>

          {/* Sign Up */}
          <div className="mt-6 text-center">
            <p className=" grey-text ">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
