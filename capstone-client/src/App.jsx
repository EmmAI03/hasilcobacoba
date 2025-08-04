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
import Dashboard from './pages/Dashboard';
import Myprojects from './pages/Myprojects';
import Profile from './pages/Profile';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Jalankan loading hanya saat di path "/"
    if (location.pathname === '/') {
      const timer = setTimeout(() => {
        setIsFading(true); // Efek fading
        setTimeout(() => {
          setIsLoading(false);
          navigate('/landing'); // ⬅️ arahkan ke "/landing" (huruf kecil semua)
        }, 700);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [location.pathname, navigate]);

  // Tampilkan loading hanya jika memang di halaman awal "/"
  if (isLoading && location.pathname === '/') {
    return <LoadingPage isFading={isFading} />;
  }

  return (
    <Routes>
      <Route path="/landing" element={<Landing />} /> {/* Pastikan path ini lowercase */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/howtouse" element={<Howtouse />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/bountyboard" element={<BountyBoard />} />
      <Route path="/inboxmesseges" element={<InboxMessages />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/loading" element={<LoadingPage isFading={false} />} />
      <Route path="/myprojects" element={<Myprojects />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
