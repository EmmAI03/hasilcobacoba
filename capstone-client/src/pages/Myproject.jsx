import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Icon from '../components/Icon';

const ProjectCard = ({ project }) => {
    const statusColor = {
        'Ongoing': 'bg-amber-100 text-amber-700',
        'Completed': 'bg-emerald-100 text-emerald-700',
        'Paused': 'bg-slate-100 text-slate-700',
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-slate-800">{project.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor[project.status]}`}>{project.status}</span>
                </div>
                <p className="text-sm text-slate-500 mb-4">{project.description}</p>
            </div>
            <div>
                <div className="mb-2">
                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-sky-500 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
                    <div className="flex -space-x-2">
                        {project.team.map((avatar, index) => (
                            <img key={index} className="w-8 h-8 rounded-full border-2 border-white object-cover" src={avatar} alt={`Team member ${index + 1}`} />
                        ))}
                    </div>
                    <a href="#" className="text-sm font-semibold text-sky-600 hover:underline">View Project</a>
                </div>
            </div>
        </div>
    );
};

const MyProjects = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const projects = [
        { id: 1, title: 'Website Redesign', description: 'Complete overhaul of the main company website.', progress: 75, status: 'Ongoing', team: ['https://placehold.co/40x40/a7f3d0/14532d?text=AS', 'https://placehold.co/40x40/fecaca/991b1b?text=BD', 'https://placehold.co/40x40/bae6fd/0c4a6e?text=CJ'] },
        { id: 2, title: 'Mobile App Launch', description: 'Develop and launch the new iOS and Android app.', progress: 100, status: 'Completed', team: ['https://placehold.co/40x40/a7f3d0/14532d?text=AS', 'https://placehold.co/40x40/c7d2fe/3730a3?text=DM'] },
        { id: 3, title: 'Q3 Marketing Campaign', description: 'Plan and execute the marketing campaign for Q3.', progress: 40, status: 'Ongoing', team: ['https://placehold.co/40x40/fecaca/991b1b?text=BD', 'https://placehold.co/40x40/fed7aa/9a3412?text=EK'] },
        { id: 4, title: 'API Integration', description: 'Integrate third-party payment API.', progress: 90, status: 'Ongoing', team: ['https://placehold.co/40x40/bae6fd/0c4a6e?text=CJ', 'https://placehold.co/40x40/c7d2fe/3730a3?text=DM', 'https://placehold.co/40x40/fed7aa/9a3412?text=EK'] },
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
                        <h1 className="text-2xl font-bold text-slate-800">My Projects</h1>
                    </div>
                    <button className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-600 transition-colors">
                        <Icon name="plus" className="w-5 h-5" />
                        <span>New Project</span>
                    </button>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {projects.map(p => <ProjectCard key={p.id} project={p} />)}
                    </div>
                </main>
            </div>
            {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"></div>}
        </div>
    );
};

export default MyProjects;