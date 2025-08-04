import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Icon from '../components/Icon';

const initialTasks = [
    { id: 1, title: 'Design landing page mockups', project: 'Website Redesign', projectColor: 'bg-blue-100 text-blue-700', priority: 'High', dueDate: '2025-08-05', assignees: ['https://placehold.co/40x40/a7f3d0/14532d?text=FZ'] },
    { id: 2, title: 'Setup user authentication flow', project: 'Mobile App', projectColor: 'bg-purple-100 text-purple-700', priority: 'High', dueDate: '2025-08-08', assignees: ['https://placehold.co/40x40/c7d2fe/3730a3?text=EA'] },
    { id: 3, title: 'Develop homepage component', project: 'Website Redesign', projectColor: 'bg-blue-100 text-blue-700', priority: 'Medium', dueDate: '2025-08-03', assignees: ['https://placehold.co/40x40/bae6fd/0c4a6e?text=ER'] },
    { id: 4, title: 'Finalize color palette', project: 'Website Redesign', projectColor: 'bg-blue-100 text-blue-700', priority: 'Low', dueDate: '2025-07-28', assignees: ['https://placehold.co/40x40/fecaca/991b1b?text=JE'] },
    { id: 5, title: 'API key for payment gateway is not working', project: 'API Integration', projectColor: 'bg-green-100 text-green-700', priority: 'High', dueDate: '2025-08-01', assignees: ['https://placehold.co/40x40/fed7aa/9a3412?text=FZ'] },
    { id: 6, title: 'Write documentation for API endpoints', project: 'API Integration', projectColor: 'bg-green-100 text-green-700', priority: 'Medium', dueDate: '2025-08-12', assignees: ['https://placehold.co/40x40/bae6fd/0c4a6e?text=EA', 'https://placehold.co/40x40/fed7aa/9a3412?text=ER'] },
    { id: 7, title: 'Create social media assets', project: 'Q3 Marketing', projectColor: 'bg-orange-100 text-orange-700', priority: 'Low', dueDate: '2025-08-01', assignees: ['https://placehold.co/40x40/fecaca/991b1b?text=ER'] },
];

// --- New Task Card Component ---
const TaskCard = ({ task, onSelectTask }) => {
    const [isHovered, setIsHovered] = useState(false);
    const priorityClasses = {
        High: 'bg-rose-100 text-rose-700 border-rose-200',
        Medium: 'bg-amber-100 text-amber-700 border-amber-200',
        Low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };

    return (
        <div 
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${task.projectColor}`}>{task.project}</span>
                <h3 className="font-bold text-slate-800 mt-3 text-base">{task.title}</h3>
            </div>
            
            <div className="mt-4">
                <div className="flex justify-between items-center text-sm text-slate-600 mb-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${priorityClasses[task.priority]}`}>
                        {task.priority}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Icon name="calendar" className="w-4 h-4 text-slate-400" />
                        {new Date(task.dueDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                </div>

                <div className="flex justify-between items-center border-t border-slate-200 pt-4">
                    <div className="flex -space-x-2">
                        {task.assignees.map((avatar, index) => (
                            <img key={index} className="w-8 h-8 rounded-full border-2 border-white object-cover ring-1 ring-slate-200" src={avatar} alt={`Assignee ${index + 1}`} />
                        ))}
                    </div>
                    <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <button onClick={() => onSelectTask(task)} className="text-xs font-semibold text-sky-600 hover:text-sky-800">View Detail</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- New Modal Component ---
const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

// --- New Task Form Component ---
const NewTaskForm = ({ onAddTask, onCancel }) => {
    const [title, setTitle] = useState('');
    const [project, setProject] = useState('Website Redesign');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !dueDate) {
            alert('Please fill out all fields.');
            return;
        }
        onAddTask({ title, project, priority, dueDate });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Create New Task</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-700">Task Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
                <div>
                    <label htmlFor="project" className="block text-sm font-medium text-slate-700">Project</label>
                    <select id="project" value={project} onChange={(e) => setProject(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                        <option>Website Redesign</option>
                        <option>Mobile App</option>
                        <option>API Integration</option>
                        <option>Q3 Marketing</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-slate-700">Priority</label>
                    <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700">Due Date</label>
                    <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-slate-200 rounded-lg text-sm font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-semibold">Add Task</button>
            </div>
        </form>
    );
};


const BountyBoard = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: 'dueDate', direction: 'ascending' });
    const [isNewTaskModalOpen, setNewTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const getProjectColor = (projectName) => {
        const colors = {
            'Website Redesign': 'bg-blue-100 text-blue-700',
            'Mobile App': 'bg-purple-100 text-purple-700',
            'API Integration': 'bg-green-100 text-green-700',
            'Q3 Marketing': 'bg-orange-100 text-orange-700',
        };
        return colors[projectName] || 'bg-gray-100 text-gray-700';
    };

    const handleAddTask = (newTaskData) => {
        const newTask = {
            ...newTaskData,
            id: Date.now(),
            projectColor: getProjectColor(newTaskData.project),
            assignees: [], // Default to no assignees
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
        setNewTaskModalOpen(false);
    };

    const sortedAndFilteredTasks = useMemo(() => {
        let sortableTasks = [...tasks];
        
        if (searchTerm) {
            sortableTasks = sortableTasks.filter(task => 
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.project.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        sortableTasks.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        return sortableTasks;
    }, [tasks, searchTerm, sortConfig]);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tasksDueToday = sortedAndFilteredTasks.filter(task => new Date(task.dueDate).setHours(0,0,0,0) === today.getTime());
    const upcomingTasks = sortedAndFilteredTasks.filter(task => new Date(task.dueDate).setHours(0,0,0,0) > today.getTime());

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 p-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-md hover:bg-slate-200"><Icon name="menu" className="w-6 h-6" /></button>
                        <h1 className="text-2xl font-bold text-slate-800">Task Board</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-xs px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <button onClick={() => setNewTaskModalOpen(true)} className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-600 transition-colors text-sm">
                            <Icon name="plus" className="w-5 h-5" />
                            <span>New Task</span>
                        </button>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Due Today ({tasksDueToday.length})</h2>
                        {tasksDueToday.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {tasksDueToday.map(task => <TaskCard key={task.id} task={task} onSelectTask={setSelectedTask} />)}
                            </div>
                        ) : (
                            <div className="text-center p-8 bg-white rounded-xl border border-slate-200 text-slate-500">No tasks due today! 🎉</div>
                        )}
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Upcoming ({upcomingTasks.length})</h2>
                         {upcomingTasks.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {upcomingTasks.map(task => <TaskCard key={task.id} task={task} onSelectTask={setSelectedTask} />)}
                            </div>
                        ) : (
                            <div className="text-center p-8 bg-white rounded-xl border border-slate-200 text-slate-500">No upcoming tasks.</div>
                        )}
                    </div>
                </main>
            </div>
            {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"></div>}

            {/* New Task Modal */}
            <Modal isOpen={isNewTaskModalOpen} onClose={() => setNewTaskModalOpen(false)}>
                <NewTaskForm onAddTask={handleAddTask} onCancel={() => setNewTaskModalOpen(false)} />
            </Modal>

            {/* View Detail Modal */}
            <Modal isOpen={!!selectedTask} onClose={() => setSelectedTask(null)}>
                {selectedTask && (
                    <div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${selectedTask.projectColor}`}>{selectedTask.project}</span>
                        <h2 className="text-2xl font-bold my-3">{selectedTask.title}</h2>
                        <p className="text-slate-600"><strong>Priority:</strong> {selectedTask.priority}</p>
                        <p className="text-slate-600"><strong>Due Date:</strong> {new Date(selectedTask.dueDate).toLocaleDateString('en-US', { dateStyle: 'full' })}</p>
                        <div className="mt-4">
                            <strong>Assignees:</strong>
                            <div className="flex mt-2">
                                {selectedTask.assignees.map((avatar, index) => (
                                    <img key={index} className="w-10 h-10 rounded-full border-2 border-white object-cover" src={avatar} alt={`Assignee ${index + 1}`} />
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button onClick={() => setSelectedTask(null)} className="px-4 py-2 bg-slate-200 rounded-lg">Close</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default BountyBoard;
