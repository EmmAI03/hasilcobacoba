import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Icon from '../components/Icon';

const CalendarEvent = ({ event }) => (
    <div className={`p-1 text-xs font-semibold rounded-md text-white ${event.color} mb-1 truncate`}>
        {event.title}
    </div>
);

const CalendarDay = ({ date, isToday, isCurrentMonth, events }) => {
    const dayClass = isCurrentMonth ? 'text-slate-700' : 'text-slate-400';
    const todayClass = isToday ? 'bg-sky-500 text-white' : '';

    return (
        <div className="border border-slate-200 h-28 p-2 flex flex-col">
            <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold ${dayClass} ${todayClass}`}>{date}</span>
            <div className="mt-1 flex-1 overflow-y-auto">
                {events.map(event => <CalendarEvent key={event.id} event={event} />)}
            </div>
        </div>
    );
};


const Schedule = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    
    // Data dummy untuk kalender Agustus 2025
    // 1 Agustus 2025 adalah hari Jumat
    const calendarData = [
        { date: 27, isCurrentMonth: false, events: [] },
        { date: 28, isCurrentMonth: false, events: [] },
        { date: 29, isCurrentMonth: false, events: [] },
        { date: 30, isCurrentMonth: false, events: [] },
        { date: 31, isCurrentMonth: false, events: [] },
        { date: 1, isCurrentMonth: true, isToday: true, events: [{ id: 1, title: 'API Key Issue', color: 'bg-rose-500' }] },
        { date: 2, isCurrentMonth: true, events: [] },
        { date: 3, isCurrentMonth: true, events: [{ id: 2, title: 'Develop Homepage', color: 'bg-amber-500' }] },
        { date: 4, isCurrentMonth: true, events: [] },
        { date: 5, isCurrentMonth: true, events: [{ id: 3, title: 'Design Mockups', color: 'bg-sky-500' }] },
        { date: 6, isCurrentMonth: true, events: [] },
        { date: 7, isCurrentMonth: true, events: [] },
        { date: 8, isCurrentMonth: true, events: [{ id: 4, title: 'User Auth Setup', color: 'bg-sky-500' }] },
        { date: 9, isCurrentMonth: true, events: [] },
        { date: 10, isCurrentMonth: true, events: [] },
        { date: 11, isCurrentMonth: true, events: [] },
        { date: 12, isCurrentMonth: true, events: [] },
        { date: 13, isCurrentMonth: true, events: [] },
        { date: 14, isCurrentMonth: true, events: [] },
        { date: 15, isCurrentMonth: true, events: [] },
        { date: 16, isCurrentMonth: true, events: [] },
    ];

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 p-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-md hover:bg-slate-200">
                            <Icon name="menu" className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-bold text-slate-800">Schedule</h1>
                    </div>
                     <button className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-600 transition-colors">
                        <Icon name="plus" className="w-5 h-5" />
                        <span>Connect Calendar</span>
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Agustus 2025</h2>
                            {/* Di sini bisa ditambahkan logika navigasi bulan */}
                        </div>
                        <div className="grid grid-cols-7 text-center font-semibold text-slate-500">
                            {daysOfWeek.map(day => <div key={day} className="py-2">{day}</div>)}
                        </div>
                        <div className="grid grid-cols-7">
                            {calendarData.map((d, i) => <CalendarDay key={i} {...d} />)}
                        </div>
                    </div>
                </main>
            </div>
            {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"></div>}
        </div>
    );
};

export default Schedule;
