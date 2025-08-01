import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Icon from '../components/Icon';

// --- Data Proyek (sumber data tunggal) ---
const projectsData = [
    { id: 1, title: 'Website Redesign', description: 'Complete overhaul of the main company website.', progress: 75, status: 'Ongoing', startDate: '2025-08-03', endDate: '2025-09-15', team: ['https://placehold.co/40x40/a7f3d0/14532d?text=AS', 'https://placehold.co/40x40/fecaca/991b1b?text=BD', 'https://placehold.co/40x40/bae6fd/0c4a6e?text=CJ'] },
    { id: 2, title: 'Mobile App Launch', description: 'Develop and launch the new iOS and Android app.', progress: 100, status: 'Done', startDate: '2025-06-10', endDate: '2025-07-25', team: ['https://placehold.co/40x40/a7f3d0/14532d?text=AS', 'https://placehold.co/40x40/c7d2fe/3730a3?text=DM'] },
    { id: 3, title: 'Q3 Marketing Campaign', description: 'Plan and execute the marketing campaign for Q3.', progress: 10, status: 'ToDo', startDate: '2025-08-10', endDate: '2025-08-20', team: ['https://placehold.co/40x40/fecaca/991b1b?text=BD', 'https://placehold.co/40x40/fed7aa/9a3412?text=EK'] },
    { id: 4, title: 'API Integration', description: 'Integrate third-party payment API.', progress: 90, status: 'Stuck', startDate: '2025-07-20', endDate: '2025-08-01', team: ['https://placehold.co/40x40/bae6fd/0c4a6e?text=CJ', 'https://placehold.co/40x40/c7d2fe/3730a3?text=DM', 'https://placehold.co/40x40/fed7aa/9a3412?text=EK'] },
    { id: 5, title: 'Initial Research for AI Tool', description: 'Feasibility study for a new AI feature.', progress: 0, status: 'ToDo', startDate: '2025-08-05', endDate: '2025-08-15', team: ['https://placehold.co/40x40/a7f3d0/14532d?text=AS'] },
];

// --- Komponen untuk Tampilan Grid ---
const ProjectGridCard = ({ project }) => {
    // ... (Komponen ini sama seperti ProjectCard dari versi sebelumnya)
    const statusColor = { 'Ongoing': 'bg-amber-100 text-amber-700', 'Completed': 'bg-emerald-100 text-emerald-700', 'Paused': 'bg-slate-100 text-slate-700', 'ToDo': 'bg-sky-100 text-sky-700', 'Stuck': 'bg-rose-100 text-rose-700' };
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
                    <div className="flex justify-between text-sm text-slate-600 mb-1"><span>Progress</span><span>{project.progress}%</span></div>
                    <div className="w-full bg-slate-200 rounded-full h-2"><div className="bg-sky-500 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div></div>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
                    <div className="flex -space-x-2">{project.team.map((avatar, index) => (<img key={index} className="w-8 h-8 rounded-full border-2 border-white object-cover" src={avatar} alt={`Team member ${index + 1}`} />))}</div>
                    <Link to={`/project/${project.id}`} className="text-sm font-semibold text-sky-600 hover:underline">View Project</Link>
                </div>
            </div>
        </div>
    );
};

// --- Komponen untuk Tampilan Kanban ---
const ProjectKanbanCard = ({ project }) => (
    <Link to={`/project/${project.id}`} className="block bg-white p-3 rounded-lg shadow-sm border border-slate-200 mb-3 hover:shadow-md hover:border-sky-500 transition-all">
        <h4 className="font-semibold text-slate-800 mb-2">{project.title}</h4>
        <div className="flex justify-between items-center text-sm text-slate-500">
            <span>Due: {project.endDate}</span>
            <div className="flex -space-x-2">{project.team.map((avatar, index) => (<img key={index} className="w-6 h-6 rounded-full border-2 border-white object-cover" src={avatar} alt={`Team member ${index + 1}`} />))}</div>
        </div>
    </Link>
);

const BoardColumn = ({ title, projects, color }) => (
    <div className="bg-slate-100 rounded-xl p-3 w-80 flex-shrink-0">
        <h3 className={`font-bold text-lg mb-4 px-2 text-${color}-600 flex items-center gap-2`}>
            <span className={`w-3 h-3 rounded-full bg-${color}-500`}></span>
            {title}
            <span className="text-sm text-slate-400 font-medium">{projects.length}</span>
        </h3>
        <div className="h-full overflow-y-auto pr-1">
            {projects.map(project => <ProjectKanbanCard key={project.id} project={project} />)}
        </div>
    </div>
);


const MyProjects = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [viewMode, setViewMode] = useState('kanban'); // 'kanban' atau 'grid'
    const [isViewSwitcherOpen, setViewSwitcherOpen] = useState(false);
    const viewSwitcherRef = useRef(null);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (viewSwitcherRef.current && !viewSwitcherRef.current.contains(event.target)) {
                setViewSwitcherOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const todoProjects = projectsData.filter(p => p.status === 'ToDo');
    const ongoingProjects = projectsData.filter(p => p.status === 'Ongoing');
    const doneProjects = projectsData.filter(p => p.status === 'Done');
    const stuckProjects = projectsData.filter(p => p.status === 'Stuck');

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 p-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-md hover:bg-slate-200"><Icon name="menu" className="w-6 h-6" /></button>
                        <h1 className="text-2xl font-bold text-slate-800">My Projects</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative" ref={viewSwitcherRef}>
                            <button onClick={() => setViewSwitcherOpen(!isViewSwitcherOpen)} className="flex items-center gap-2 border border-slate-300 bg-white px-3 py-2 rounded-lg font-semibold hover:bg-slate-100 transition-colors text-sm">
                                <Icon name={viewMode === 'kanban' ? 'layout' : 'briefcase'} className="w-5 h-5" />
                                <span>View</span>
                                <Icon name="chevron-down" className="w-4 h-4" />
                            </button>
                            {isViewSwitcherOpen && (
                                <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-xl z-30 animate-fade-in-down">
                                    <button onClick={() => { setViewMode('kanban'); setViewSwitcherOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"><Icon name="layout" className="w-4 h-4" />Kanban</button>
                                    <button onClick={() => { setViewMode('grid'); setViewSwitcherOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"><Icon name="briefcase" className="w-4 h-4" />Grid</button>
                                </div>
                            )}
                        </div>
                        <button className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-600 transition-colors text-sm">
                            <Icon name="plus" className="w-5 h-5" />
                            <span>New Project</span>
                        </button>
                    </div>
                </header>
                
                {viewMode === 'kanban' ? (
                     <main className="flex-1 flex overflow-x-auto overflow-y-hidden p-4 sm:p-6 lg:p-8">
                        <div className="flex gap-6 h-full">
                            <BoardColumn title="To Do" projects={todoProjects} color="sky" />
                            <BoardColumn title="Ongoing" projects={ongoingProjects} color="amber" />
                            <BoardColumn title="Done" projects={doneProjects} color="emerald" />
                            <BoardColumn title="Stuck" projects={stuckProjects} color="rose" />
                        </div>
                    </main>
                ) : (
                    <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {projectsData.map(p => <ProjectGridCard key={p.id} project={p} />)}
                        </div>
                    </main>
                )}
            </div>
            {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"></div>}
        </div>
    );
};

export default MyProjects;
