'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface LoginFormProps {
  onClose: () => void;
}

export default function LoginForm({ onClose }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmitLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('token', result.token);
        toast.success('Login successful!');
        onClose();
        window.location.reload();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          password: data.password,
        }),
      });

      if (response.ok) {
        toast.success('Registration successful! Please login.');
        setIsLogin(true);
        registerForm.reset();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-poppins font-bold gradient-text">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-gray-600 mt-2">
          {isLogin ? 'Sign in to your account' : 'Join our community'}
        </p>
      </div>

      {/* Toggle buttons */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={cn(
            'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all',
            isLogin
              ? 'bg-white text-cyber-violet shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          )}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={cn(
            'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all',
            !isLogin
              ? 'bg-white text-cyber-violet shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          )}
        >
          Sign Up
        </button>
      </div>

      {/* Login Form */}
      {isLogin && (
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={loginForm.handleSubmit(onSubmitLogin)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              {...loginForm.register('email')}
              className="input-field"
              placeholder="Enter your email"
            />
            {loginForm.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {loginForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...loginForm.register('password')}
                className="input-field pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {loginForm.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {loginForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </motion.form>
      )}

      {/* Register Form */}
      {!isLogin && (
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={registerForm.handleSubmit(onSubmitRegister)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              {...registerForm.register('email')}
              className="input-field"
              placeholder="Enter your email"
            />
            {registerForm.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {registerForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              {...registerForm.register('username')}
              className="input-field"
              placeholder="Choose a username"
            />
            {registerForm.formState.errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {registerForm.formState.errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...registerForm.register('password')}
                className="input-field pr-10"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {registerForm.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {registerForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              {...registerForm.register('confirmPassword')}
              className="input-field"
              placeholder="Confirm your password"
            />
            {registerForm.formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {registerForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </motion.form>
      )}
    </div>
  );
}