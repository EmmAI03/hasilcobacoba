import React, { useState } from 'react';

// In a real project, these would be in separate files.
import Icon from './Icon';
import ProductivityChart from './charts/Productivitychart';
import TaskStatusChart from './charts/Taskstatuschart';

// --- Reusable Modal Component ---
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200">
                        <Icon name="x" className="w-6 h-6 text-slate-500" />
                    </button>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

const MainContent = ({ onToggleSidebar }) => {
    const [modalState, setModalState] = useState({ isOpen: false, content: null, title: '' });

    const recapCards = [
        { id: 'tasks', title: 'Tasks Completed', value: '18', icon: 'check-circle', color: 'sky' },
        { id: 'projects', title: 'Active Projects', value: '4', icon: 'loader', color: 'amber' },
        { id: 'deadlines', title: 'Missed Deadlines', value: '2', icon: 'alert-triangle', color: 'rose' },
        { id: 'banners', title: 'Banners Earned', value: '5', icon: 'award', color: 'emerald' },
    ];
    
    const allAchievements = [
        { id: 1, title: 'New Banner Earned: "Collaborator King"!', description: "You became the most active contributor on the 'Website Redesign' project.", icon: 'star', color: 'violet' },
        { id: 2, title: 'Certificate Available: "Top Contributor"', description: "Congratulations! You were the top contributor on the 'Q3 Marketing Campaign' project.", icon: 'file-text', color: 'sky' },
        { id: 3, title: 'Achievement Unlocked: "Perfect Week"', description: "You completed all assigned tasks on time for an entire week.", icon: 'calendar', color: 'emerald' },
        { id: 4, title: 'New Banner Earned: "Bug Squasher"', description: "You resolved over 10 critical bugs in the 'API Integration' project.", icon: 'bug', color: 'rose' }
    ];

    const allCertificates = [
        { id: 1, title: 'Certified Scrum Master', issuedBy: 'Scrum Alliance', date: '2023-05-15', color: 'violet' },
        { id: 2, title: 'Project Management Professional (PMP)', issuedBy: 'PMI', date: '2022-11-20', color: 'sky' },
        { id: 3, title: 'AWS Certified Solutions Architect', issuedBy: 'Amazon Web Services', date: '2024-02-10', color: 'amber' },
    ];

    const openModal = (type) => {
        let content, title;
        switch (type) {
            case 'tasks':
                title = 'Tasks Completed Details';
                content = <p>A detailed breakdown of the 18 completed tasks would be shown here, perhaps with another chart.</p>;
                break;
            case 'projects':
                title = 'Active Projects Overview';
                content = <p>A list or grid of the 4 active projects would be displayed here.</p>;
                break;
            case 'deadlines':
                title = 'Missed Deadlines Report';
                content = <p>Details about the 2 missed deadlines, including task and project, would be shown here.</p>;
                break;
            case 'banners':
                title = 'Banners Earned';
                content = <p>A gallery of the 5 banners earned by the user would be displayed here.</p>;
                break;
            case 'viewAllRewards':
                title = 'All Achievements & Certificates';
                content = (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-700 mb-3">Achievements & Contributions</h3>
                            <div className="space-y-4">
                                {allAchievements.map(ach => (
                                     <div key={ach.id} className={`bg-gradient-to-r from-${ach.color}-500 to-${ach.color}-400 text-white p-4 rounded-lg flex items-center gap-4`}>
                                        <Icon name={ach.icon} className="w-8 h-8" />
                                        <div>
                                            <p className="font-bold">{ach.title}</p>
                                            <p className="text-sm opacity-90">{ach.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                             <h3 className="text-lg font-semibold text-slate-700 mb-3">Certificates</h3>
                            <div className="space-y-3">
                                {allCertificates.map(cert => (
                                    <div key={cert.id} className="p-4 border border-slate-200 rounded-lg flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-slate-800">{cert.title}</p>
                                            <p className="text-sm text-slate-500">Issued by {cert.issuedBy} on {new Date(cert.date).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
                                        </div>
                                        <button className="text-sm font-semibold text-sky-600 hover:underline">Download</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
                break;
            default:
                return;
        }
        setModalState({ isOpen: true, content, title });
    };

    const closeModal = () => setModalState({ isOpen: false, content: null, title: '' });

    return (
        <>
            <main className="flex-1 h-full overflow-y-auto">
                <header className="p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 z-10" style={{ backgroundColor: '#0B1C47' }}>
                    <div className="flex items-center gap-4">
                        <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded-md hover:bg-slate-100/10">
                            <Icon name="menu" className="w-6 h-6 text-white" />
                        </button>
                        <h1 className="text-2xl text-white font-bold">Dashboard</h1>
                    </div>
                </header>

                <div className="p-4 sm:p-6 lg:p-8 space-y-8">
                    {/* Recap Cards Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recapCards.map(card => (
                            <div key={card.id} onClick={() => openModal(card.id)} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 cursor-pointer hover:shadow-md hover:border-sky-300 transition-all">
                                <div className={`bg-${card.color}-100 text-${card.color}-600 p-3 rounded-full`}>
                                    <Icon name={card.icon} className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm">{card.title}</p>
                                    <p className="text-2xl font-bold text-slate-800">{card.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-lg font-semibold mb-4">Productivity Trends</h3>
                            <div className="h-80"><ProductivityChart /></div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-lg font-semibold mb-4">Task Status</h3>
                            <div className="h-80 flex items-center justify-center"><TaskStatusChart /></div>
                        </div>
                    </div>

                    {/* Combined Achievements & Certificates Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Achievements & Certificates</h3>
                            <button onClick={() => openModal('viewAllRewards')} className="text-sm font-semibold text-sky-600 hover:underline">View All</button>
                        </div>
                        <div className="space-y-4">
                        {/* Achievement Preview */}
                        {allAchievements.slice(0, 1).map(ach => (
                            <div key={ach.id} className="bg-[#0B1C47] text-white p-4 rounded-lg flex items-center gap-4">
                                <Icon name={ach.icon} className="w-8 h-8" />
                                <div>
                                    <p className="font-bold">{ach.title}</p>
                                    <p className="text-sm opacity-90">{ach.description}</p>
                                </div>
                            </div>
                        ))}
                        {/* Certificate Preview */}
                        {allCertificates.slice(0, 1).map(cert => (
                            <div key={cert.id} className="bg-[#0B1C47] text-white p-4 rounded-lg flex items-center gap-4">
                                <Icon name="file-text" className="w-8 h-8" />
                                <div>
                                    <p className="font-bold">{cert.title}</p>
                                    <p className="text-sm opacity-90">Issued by {cert.issuedBy}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </main>

            <Modal 
                isOpen={modalState.isOpen} 
                onClose={closeModal}
                title={modalState.title}
            >
                {modalState.content}
            </Modal>
        </>
    );
};

export default MainContent;