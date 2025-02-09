import jwt from 'jsonwebtoken';
import { toast } from "@/components/ui/use-toast"

const isClient = typeof window !== 'undefined';

// Mock authentication for development
let isLoggedIn = false

export async function login({ email, password }: { email: string; password: string }) {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, action: 'login' }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export function logout(): void {
  isLoggedIn = false
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("token")
}

export function getToken() {
  if (!isClient) return null;
  return localStorage.getItem('token');
}

export function isAuthenticated() {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('token')
}

export function getCurrentUser() {
  if (!isAuthenticated()) return null;
  return {
    email: "user@example.com",
    name: "Test User"
  }
}

export async function signup(userData: { 
  email: string; 
  password: string; 
  name: string; 
}) {
  try {
    // Debug logs
    console.log('1. Starting signup...');
    console.log('2. Signup data:', { 
      email: userData.email, 
      name: userData.name,
      action: 'signup' 
    });

    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData, action: 'signup' }),
    });

    console.log('3. Response status:', response.status);
    const data = await response.json();
    console.log('4. Response data:', data);

    if (!response.ok) {
      console.log('5. Response not OK');
      switch (response.status) {
        case 400:
          toast({
            variant: "destructive",
            title: "Signup Failed",
            description: "User already exists with this email."
          });
          return null;
        default:
          toast({
            variant: "destructive",
            title: "Signup Failed",
            description: data.error || "Failed to create account."
          });
          return null;
      }
    }

    console.log('6. Signup successful');
    toast({
      title: "Success",
      description: "Account created successfully! You can now login."
    });

    return data.user;
  } catch (error) {
    console.error('7. Signup error:', error);
    toast({
      variant: "destructive",
      title: "Error",
      description: "An unexpected error occurred during signup."
    });
    return null;
  }
}

