import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import Howtouse from './pages/Howtouse';
import Schedule from './pages/Schedule';
import BountyBoard from './pages/Bountyboard';
import InboxMessages from './pages/Inboxmesseges';
import Settings from './pages/Settings';
import LoadingPage from './pages/Loadingpages';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true); // Start fade out
      setTimeout(() => setIsLoading(false), 700); // Remove after fade
    }, 2000); // Duration before fading

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage isFading={isFading} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/howtouse" element={<Howtouse />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/bountyboard" element={<BountyBoard />} />
        <Route path="/inboxmesseges" element={<InboxMessages />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/loading" element={<LoadingPage isFading={false} />} />
      </Routes>
    </Router>
  );
}

export default App;
