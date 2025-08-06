import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon';

const Sidebar = ({ isOpen }) => {
    const [isProfileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navLinks = [
        { name: 'Dashboard', icon: 'layout', path: '/dashboard' },
        { name: 'My Projects', icon: 'briefcase', path: '/Myprojects' },
        { name: 'Bounty Board', icon: 'award', path: '/bountyboard' },
        { name: 'Schedule', icon: 'calendar', path: '/schedule' },
        { name: 'How to Use', icon: 'help-circle', path: '/howtouse' },
    ];

    return (
        <aside
            className={`absolute lg:relative z-20 w-64 h-full border-r border-slate-200 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}
            style={{ backgroundColor: '#0B1C47' }}
        >
            <div className="flex flex-col h-full">
                {/* === BLOK YANG DIUBAH === */}
                <div className="p-4 border-b border-slate-200">
                    <Link to="/dashboard" className="flex items-center justify-center py-1">
                        <img src="/logo.png" alt="Eagle Eye Logo" className="h-6" />
                    </Link>
                </div>
                {/* === AKHIR BLOK YANG DIUBAH === */}

                <div className="p-4 relative" ref={profileRef}>
                    <div onClick={() => setProfileOpen(!isProfileOpen)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100/10 cursor-pointer transition-colors">
                        <img src="https://placehold.co/40x40/a7f3d0/14532d?text=AS" alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
                        <div>
                            <p className="font-semibold text-sm text-white">Jonathan Ezra</p>
                            <p className="text-xs text-white/80">Project Manager</p>
                        </div>
                        <Icon name="chevron-down" className="w-4 h-4 ml-auto text-white/70" />
                    </div>
                    {isProfileOpen && (
                    <div className="absolute top-full left-4 right-4 mt-2 bg-white border border-slate-200 rounded-lg shadow-xl z-30 animate-fade-in-down">
                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"><Icon name="user" className="w-4 h-4" />View Profile</Link>
                        <hr className="my-1 border-slate-200" />
                        <Link to="/login" className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50"><Icon name="log-out" className="w-4 h-4" />Logout</Link>
                    </div>
                    )}
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navLinks.map(link => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-white transition-colors
                                    ${isActive ? 'font-bold' : ''}
                                    ${isActive ? 'bg-[#173A7A]' : 'hover:bg-slate-100/10'}`}
                            >
                                <Icon name={link.icon} className="w-5 h-5 text-white" />
                                <span>{link.name}</span>
                                {link.notification && (
                                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                        {link.notification}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;