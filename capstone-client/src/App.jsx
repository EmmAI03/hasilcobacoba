import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import Howtouse from './pages/Howtouse';
import Schedule from './pages/Schedule';
import BountyBoard from './pages/BountyBoard';
import InboxMessages from './pages/Inboxmesseges';
import Settings from './pages/Settings';
import LoadingPage from './pages/Loadingpages';
import Dashboard from './pages/Dashboard'; // Import halaman Dashboard

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Hanya tampilkan loading screen saat pertama kali membuka web
    if (location.pathname === '/') {
        const timer = setTimeout(() => {
            setIsFading(true); // Mulai fade out
            setTimeout(() => {
                setIsLoading(false);
                navigate('/dashboard'); // Arahkan ke dashboard setelah loading
            }, 700); // Hapus setelah fade
        }, 2000); // Durasi sebelum fading

        return () => clearTimeout(timer);
    } else {
        setIsLoading(false);
    }
  }, []); // Hanya dijalankan sekali

  if (isLoading && location.pathname === '/') {
    return <LoadingPage isFading={isFading} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/howtouse" element={<Howtouse />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/bountyboard" element={<BountyBoard />} />
      <Route path="/inboxmesseges" element={<InboxMessages />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/loading" element={<LoadingPage isFading={false} />} />
    </Routes>
  );
}

export default App;
