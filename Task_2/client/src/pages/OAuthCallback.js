import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const token = searchParams.get('token');
    const user = searchParams.get('user');

    if (token && user) {
      // Store the token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', decodeURIComponent(user));
      
      // Redirect to home page after successful login
      navigate('/');
      window.location.reload(); // Force reload to update app state
    } else {
      // Handle error or redirect to login
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] flex flex-col items-center justify-center text-white">
      <Loader className="w-12 h-12 animate-spin text-[#ea698b] mb-4" />
      <p className="text-lg">Finalizing your login...</p>
    </div>
  );
};

export default OAuthCallback;