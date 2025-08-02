import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Icon from '../components/Icon';

// --- Initial Project Data ---
const initialProjectsData = {
    ToDo: [
        { id: 3, title: 'Q3 Marketing Campaign', description: 'Plan and execute the marketing campaign for Q3.', progress: 10, startDate: '2025-08-10', endDate: '2025-08-20', team: ['https://placehold.co/40x40/fecaca/991b1b?text=FZ', 'https://placehold.co/40x40/fed7aa/9a3412?text=ER'] },
        { id: 5, title: 'Initial Research for AI Tool', description: 'Feasibility study for a new AI feature.', progress: 0, startDate: '2025-08-05', endDate: '2025-08-15', team: ['https://placehold.co/40x40/a7f3d0/14532d?text=EA'] },
    ],
    Ongoing: [
        { id: 1, title: 'Website Redesign', description: 'Complete overhaul of the main company website.', progress: 75, startDate: '2025-08-03', endDate: '2025-09-15', team: ['https://placehold.co/40x40/a7f3d0/14532d?text=EA', 'https://placehold.co/40x40/fecaca/991b1b?text=FZ', 'https://placehold.co/40x40/bae6fd/0c4a6e?text=ER'] },
    ],
    Done: [
        { id: 2, title: 'Mobile App Launch', description: 'Develop and launch the new iOS and Android app.', progress: 100, startDate: '2025-06-10', endDate: '2025-07-25', team: ['https://placehold.co/40x40/a7f3d0/14532d?text=FZ', 'https://placehold.co/40x40/c7d2fe/3730a3?text=ER'] },
    ],
    Stuck: [
        { id: 4, title: 'API Integration', description: 'Integrate third-party payment API.', progress: 90, startDate: '2025-07-20', endDate: '2025-08-01', team: ['https://placehold.co/40x40/bae6fd/0c4a6e?text=EA', 'https://placehold.co/40x40/c7d2fe/3730a3?text=ER', 'https://placehold.co/40x40/fed7aa/9a3412?text=FZ'] },
    ]
};

// --- Component for Kanban Card Display ---
const ProjectKanbanCard = ({ project, onDragStart }) => (
    <div
        draggable
        onDragStart={(e) => onDragStart(e, project.id)}
        className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 mb-3 cursor-grab active:cursor-grabbing"
    >
        <h4 className="font-semibold text-slate-800 mb-2">{project.title}</h4>
        <div className="flex justify-between items-center text-sm text-slate-500">
            <span>Due: {project.endDate}</span>
            <div className="flex -space-x-2">{project.team.map((avatar, index) => (<img key={index} className="w-6 h-6 rounded-full border-2 border-white object-cover" src={avatar} alt={`Team member ${index + 1}`} />))}</div>
        </div>
    </div>
);

const BoardColumn = ({ title, projects, color, status, onDrop, onDragOver }) => (
    <div
        onDrop={(e) => onDrop(e, status)}
        onDragOver={onDragOver}
        className="bg-slate-100 rounded-xl p-3 w-80 flex-shrink-0"
    >
        <h3 className={`font-bold text-lg mb-4 px-2 text-${color}-600 flex items-center gap-2`}>
            <span className={`w-3 h-3 rounded-full bg-${color}-500`}></span>
            {title}
            <span className="text-sm text-slate-400 font-medium">{projects.length}</span>
        </h3>
        <div className="h-full overflow-y-auto pr-1">
            {projects.map(project => <ProjectKanbanCard key={project.id} project={project} onDragStart={(e, projectId) => e.dataTransfer.setData("projectId", projectId)} />)}
        </div>
    </div>
);

const MyProjects = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [projects, setProjects] = useState(initialProjectsData);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    
    const handleDrop = (e, targetStatus) => {
        const projectId = parseInt(e.dataTransfer.getData("projectId"));
        
        let sourceStatus;
        let draggedProject;

        // Find the project and its source column
        for (const status in projects) {
            const project = projects[status].find(p => p.id === projectId);
            if (project) {
                sourceStatus = status;
                draggedProject = project;
                break;
            }
        }

        if (draggedProject && sourceStatus !== targetStatus) {
            setProjects(prevProjects => {
                // Remove from source column
                const newSourceProjects = prevProjects[sourceStatus].filter(p => p.id !== projectId);
                // Add to target column
                const newTargetProjects = [...prevProjects[targetStatus], { ...draggedProject, status: targetStatus }];
                
                return {
                    ...prevProjects,
                    [sourceStatus]: newSourceProjects,
                    [targetStatus]: newTargetProjects
                };
            });
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Required for drop to work
    };

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 p-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-md hover:bg-slate-200"><Icon name="menu" className="w-6 h-6" /></button>
                        <h1 className="text-2xl font-bold text-slate-800">My Projects</h1>
                    </div>
                    <button className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-600 transition-colors text-sm">
                        <Icon name="plus" className="w-5 h-5" />
                        <span>New Project</span>
                    </button>
                </header>
                
                <main className="flex-1 flex overflow-x-auto overflow-y-hidden p-4 sm:p-6 lg:p-8">
                    <div className="flex gap-6 h-full">
                        <BoardColumn title="To Do" projects={projects.ToDo} color="sky" status="ToDo" onDrop={handleDrop} onDragOver={handleDragOver} />
                        <BoardColumn title="Ongoing" projects={projects.Ongoing} color="amber" status="Ongoing" onDrop={handleDrop} onDragOver={handleDragOver} />
                        <BoardColumn title="Done" projects={projects.Done} color="emerald" status="Done" onDrop={handleDrop} onDragOver={handleDragOver} />
                        <BoardColumn title="Stuck" projects={projects.Stuck} color="rose" status="Stuck" onDrop={handleDrop} onDragOver={handleDragOver} />
                    </div>
                </main>
            </div>
            {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"></div>}
        </div>
    );
};

export default MyProjects;