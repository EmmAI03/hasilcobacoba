import React, { useState } from 'react';
import Sidebar from "../components/Sidebar"; // 👈 import sidebar

// Sidebar sekarang diimpor dari file eksternal.
// Baris di bawah ini akan berfungsi di lingkungan pengembangan lokal Anda.
// import Sidebar from "../components/Sidebar"; 

// --- KOMPONEN-KOMPONEN KECIL & IKON ---

const Icon = ({ path, className = "w-5 h-5", isSolid = false }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill={isSolid ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isSolid ? 0 : 2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
);

const Header = () => {
    return (
        <header className="relative z-10 bg-white border-b">
            <div className="flex items-center justify-between h-16 md:h-20 px-6 mx-auto">
                <div className="relative w-full max-w-full focus-within:text-indigo-500">
                    <div className="absolute inset-y-0 flex items-center pl-2">
                         <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md focus:placeholder-gray-500 focus:bg-white focus:border-indigo-300 focus:outline-none focus:shadow-outline-indigo form-input" type="text" placeholder="Cari..." aria-label="Search" />
                </div>
            </div>
        </header>
    );
};
// --- KOMPONEN KONTEN PENGATURAN (BARU) ---

const SettingsNav = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { id: 'profile', label: 'Profil', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { id: 'account', label: 'Akun', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4z' },
        { id: 'security', label: 'Keamanan', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
        { id: 'notifications', label: 'Notifikasi', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
        { id: 'appearance', label: 'Tampilan', icon: 'M4 8l4-4m0 0l4 4m-4-4v12' },
        { id: 'workspace', label: 'Workspace', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
        { id: 'integrations', label: 'Integrasi', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    ];

    return (
        <nav className="flex-shrink-0 w-full md:w-56 pr-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Pengaturan</h2>
            <ul className="space-y-1">
                {navItems.map(item => (
                    <li key={item.id}>
                        <button
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center px-3 py-2 text-left text-sm font-medium rounded-md transition-colors ${
                                activeTab === item.id
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                        >
                            <Icon path={item.icon} className="mr-3 h-5 w-5" />
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

// --- KUMPULAN KOMPONEN PENGATURAN ---

const ProfileSettings = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Profil Publik</h3>
        <div className="flex items-center space-x-6 mb-6">
            <img src="https://placehold.co/96x96/eab308/ffffff?text=E" alt="Profile" className="w-24 h-24 rounded-full object-cover" />
            <div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Unggah Foto Baru</button>
                <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF hingga 10MB.</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Pengguna</label>
                <input type="text" name="name" id="name" defaultValue="Elmira" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">Profesi / Jabatan</label>
                <input type="text" name="profession" id="profession" defaultValue="Product Designer" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
             <div className="col-span-1 md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea id="bio" name="bio" rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" defaultValue="Desainer produk dengan fokus pada pengalaman pengguna dan antarmuka yang bersih."></textarea>
            </div>
             <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Bahasa</label>
                <select id="language" name="language" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Bahasa Indonesia</option>
                    <option>English</option>
                </select>
            </div>
            <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">Zona Waktu</label>
                <select id="timezone" name="timezone" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                    <option>(GMT+7:00) Jakarta</option>
                    <option>(GMT+8:00) Singapore</option>
                </select>
            </div>
        </div>
    </div>
);

const AccountSettings = () => (
    <>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Akun</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
                    <input type="email" name="email" id="email" defaultValue="elmira@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input type="text" name="username" id="username" defaultValue="elmira_d" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
            </div>
        </div>
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500">
            <h3 className="text-xl font-semibold text-red-700 mb-4">Danger Zone</h3>
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-medium">Hapus Akun Ini</p>
                    <p className="text-sm text-gray-500">Setelah dihapus, semua data akan hilang selamanya.</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Hapus Akun</button>
            </div>
        </div>
    </>
);

const SecuritySettings = () => (
    <>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Ubah Kata Sandi</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi Saat Ini</label>
                    <input type="password" name="current-password" id="current-password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi Baru</label>
                    <input type="password" name="new-password" id="new-password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
            </div>
        </div>
         <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Autentikasi Dua Faktor (2FA)</h3>
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-medium">Amankan akun Anda dengan lapisan keamanan tambahan.</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Aktifkan 2FA</button>
            </div>
        </div>
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Riwayat Login</h3>
            <ul className="divide-y divide-gray-200">
                <li className="py-3 flex justify-between items-center">
                    <div>
                        <p className="font-medium">Chrome di Windows</p>
                        <p className="text-sm text-gray-500">Bekasi, Indonesia - 31 Juli 2025, 16:01</p>
                    </div>
                    <span className="text-sm text-green-600 font-semibold">Sesi Aktif</span>
                </li>
                 <li className="py-3 flex justify-between items-center">
                    <div>
                        <p className="font-medium">Safari di iPhone</p>
                        <p className="text-sm text-gray-500">Bekasi, Indonesia - 30 Juli 2025, 20:45</p>
                    </div>
                </li>
            </ul>
        </div>
    </>
);

const NotificationSettings = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Notifikasi</h3>
        <div className="divide-y divide-gray-200">
            <div className="py-4 flex flex-col md:flex-row justify-between">
                <div className="mb-2 md:mb-0">
                    <h4 className="text-md font-medium text-gray-800">Ringkasan Email</h4>
                    <p className="text-sm text-gray-500">Terima ringkasan aktivitas mingguan atau harian.</p>
                </div>
                <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer"><input type="radio" name="summary" className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"/> <span>Harian</span></label>
                    <label className="flex items-center space-x-2 cursor-pointer"><input type="radio" name="summary" defaultChecked className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"/> <span>Mingguan</span></label>
                    <label className="flex items-center space-x-2 cursor-pointer"><input type="radio" name="summary" className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"/> <span>Tidak sama sekali</span></label>
                </div>
            </div>
            <div className="py-4 flex justify-between items-center">
                <h4 className="text-md font-medium text-gray-800">Notifikasi Desktop</h4>
                 <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" defaultChecked className="sr-only peer" /><div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div></label>
            </div>
            <div className="py-4 flex justify-between items-center">
                <h4 className="text-md font-medium text-gray-800">Pengingat Tugas</h4>
                <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" defaultChecked className="sr-only peer" /><div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div></label>
            </div>
        </div>
    </div>
);

const AppearanceSettings = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">Tampilan</h3>
        <div className="py-4 flex items-center justify-between border-b border-gray-200">
            <div>
                <h4 className="text-md font-medium text-gray-800">Tema</h4>
            </div>
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-md">
                <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white rounded-md shadow">Light</button>
                <button className="px-3 py-1 text-sm font-medium text-gray-500">Dark</button>
                <button className="px-3 py-1 text-sm font-medium text-gray-500">System</button>
            </div>
        </div>
        <div className="py-4 flex items-center justify-between">
            <h4 className="text-md font-medium text-gray-800">Ukuran Font</h4>
            <div className="flex items-center space-x-4">
                <span className="text-sm">Kecil</span>
                <input type="range" min="1" max="3" defaultValue="2" className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                <span className="text-lg">Besar</span>
            </div>
        </div>
    </div>
);

const WorkspaceSettings = () => (
    <>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Workspace</h3>
             <div>
                <label htmlFor="workspace-name" className="block text-sm font-medium text-gray-700 mb-1">Nama Workspace</label>
                <input type="text" name="workspace-name" id="workspace-name" defaultValue="Elmira's Workspace" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
        </div>
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Anggota</h3>
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">Anda memiliki 3 dari 5 anggota.</p>
                <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Undang Anggota</button>
            </div>
            <ul className="divide-y divide-gray-200">
                <li className="py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <img src="https://placehold.co/40x40/eab308/ffffff?text=E" alt="Elmira" className="w-10 h-10 rounded-full"/>
                        <div>
                            <p className="font-medium">Elmira (Anda)</p>
                            <p className="text-sm text-gray-500">elmira@example.com</p>
                        </div>
                    </div>
                    <span className="text-sm text-gray-500">Admin</span>
                </li>
                <li className="py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <img src="https://placehold.co/40x40/6366f1/ffffff?text=BS" alt="Budi" className="w-10 h-10 rounded-full"/>
                        <div>
                            <p className="font-medium">Budi Santoso</p>
                            <p className="text-sm text-gray-500">budi.s@example.com</p>
                        </div>
                    </div>
                    <select className="text-sm border-gray-300 rounded-md">
                        <option>Editor</option>
                        <option>Viewer</option>
                        <option>Admin</option>
                    </select>
                </li>
                 <li className="py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <img src="https://placehold.co/40x40/ec4899/ffffff?text=CL" alt="Citra" className="w-10 h-10 rounded-full"/>
                        <div>
                            <p className="font-medium">Citra Lestari</p>
                            <p className="text-sm text-gray-500">citra.l@example.com</p>
                        </div>
                    </div>
                     <select className="text-sm border-gray-300 rounded-md">
                        <option>Viewer</option>
                        <option>Editor</option>
                        <option>Admin</option>
                    </select>
                </li>
            </ul>
        </div>
    </>
);

const IntegrationSettings = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Integrasi</h3>
        <ul className="divide-y divide-gray-200">
            <li className="py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Icon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" className="h-8 w-8 text-gray-500"/>
                    <div>
                        <p className="font-medium">Google Calendar</p>
                        <p className="text-sm text-gray-500">Sinkronkan jadwal dan deadline Anda.</p>
                    </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Hubungkan</button>
            </li>
            <li className="py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                     <Icon path="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" isSolid={true} className="h-8 w-8 text-gray-500"/>
                    <div>
                        <p className="font-medium">Slack</p>
                        <p className="text-sm text-green-600 font-semibold">Terhubung</p>
                    </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Kelola</button>
            </li>
             <li className="py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                     <Icon path="M13 10V3L4 14h7v7l9-11h-7z" isSolid={true} className="h-8 w-8 text-gray-500"/>
                    <div>
                        <p className="font-medium">Zapier</p>
                        <p className="text-sm text-gray-500">Hubungkan dengan ribuan aplikasi lain.</p>
                    </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Hubungkan</button>
            </li>
        </ul>
    </div>
);


const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const renderContent = () => {
        switch (activeTab) {
            case 'profile': return <ProfileSettings />;
            case 'account': return <AccountSettings />;
            case 'security': return <SecuritySettings />;
            case 'notifications': return <NotificationSettings />;
            case 'appearance': return <AppearanceSettings />;
            case 'workspace': return <WorkspaceSettings />;
            case 'integrations': return <IntegrationSettings />;
            default: return <ProfileSettings />;
        }
    };
    
    return (
        <main className="flex-1 h-full p-6 md:p-8 overflow-y-auto bg-gray-100">
            <div className="max-w-6xl mx-auto md:flex">
                <SettingsNav activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="flex-1 mt-8 md:mt-0">
                    {renderContent()}
                    {activeTab !== 'integrations' && (
                        <div className="flex justify-end mt-6">
                            <button className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Simpan Perubahan
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

// --- KOMPONEN UTAMA APLIKASI ---

export default function App() {
    const [activeSidebarItem, setActiveSidebarItem] = useState('Settings');

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar activeItem={activeSidebarItem} setActiveItem={setActiveSidebarItem} />
            <div className="flex flex-col flex-1 w-full overflow-hidden">
                <Header />
                <SettingsPage />
            </div>
        </div>
    );
}
