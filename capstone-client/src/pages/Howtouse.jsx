// Salin kode ini ke dalam file Anda: src/pages/HowToUse.jsx

import React, { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import Icon from '../components/Icon';

// --- Data untuk FAQ ---
const faqData = [
    {
        question: "Bagaimana cara menavigasi aplikasi?",
        answer: "Gunakan sidebar di sisi kiri untuk mengakses semua halaman utama seperti Dashboard, My Projects, Bounty Board, Schedule, dan Settings. Halaman yang sedang aktif akan ditandai dengan warna yang lebih cerah."
    },
    {
        question: "Apa fungsi dari halaman 'My Projects'?",
        answer: "Halaman 'My Projects' menampilkan semua proyek Anda dalam format Kanban Board. Anda dapat memindahkan proyek antar kolom (To Do, Ongoing, Done, Stuck) dengan fitur drag-and-drop untuk mengelola alur kerja Anda."
    },
    {
        question: "Bagaimana cara menggunakan 'Schedule'?",
        answer: "Halaman 'Schedule' menampilkan kalender bulanan. Anda dapat melihat jadwal dan deadline tugas. Gunakan tombol panah untuk berpindah antar bulan dan tombol 'Today' untuk kembali ke bulan ini. Klik pada tanggal untuk melihat detail jadwal harian."
    },
    {
        question: "Apa itu 'Bounty Board'?",
        answer: "Bounty Board adalah halaman yang menampilkan daftar semua tugas individual dari seluruh proyek Anda. Halaman ini dirancang untuk membantu Anda fokus pada tugas-tugas yang perlu diselesaikan, dipisahkan antara yang jatuh tempo hari ini dan yang akan datang."
    },
    {
        question: "Bagaimana cara mengubah tema aplikasi (Light/Dark Mode)?",
        answer: "Pergi ke halaman 'Settings' melalui sidebar, lalu klik tab 'Tampilan'. Di sana Anda akan menemukan opsi untuk beralih antara tema Light dan Dark. Pilihan Anda akan disimpan secara otomatis di browser."
    },
    {
        question: "Apakah saya bisa mengubah informasi profil saya?",
        answer: "Tentu. Di halaman 'Settings', buka tab 'Profil'. Anda dapat mengunggah foto profil baru serta mengubah nama pengguna dan jabatan Anda. Jangan lupa klik 'Simpan Perubahan' setelah selesai."
    }
];

// --- Komponen Accordion untuk FAQ ---
const AccordionItem = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-slate-200">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-4 px-1"
            >
                <span className="font-semibold text-slate-800">{item.question}</span>
                <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} className="w-5 h-5 text-slate-500" />
            </button>
            {isOpen && (
                <div className="pb-4 px-1 text-slate-600">
                    <p>{item.answer}</p>
                </div>
            )}
        </div>
    );
};


const HowToUse = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const handleAccordionClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredFaqData = useMemo(() => {
        if (!searchTerm) return faqData;
        const lowercasedFilter = searchTerm.toLowerCase();
        return faqData.filter(item =>
            item.question.toLowerCase().includes(lowercasedFilter) ||
            item.answer.toLowerCase().includes(lowercasedFilter)
        );
    }, [searchTerm]);

    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-20 p-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-md hover:bg-slate-200">
                            <Icon name="menu" className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-bold text-slate-800">How To Use / FAQ</h1>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                             <h2 className="text-3xl font-bold text-slate-800 mb-2">Ada yang bisa kami bantu?</h2>
                             <p className="text-slate-600">Temukan jawaban untuk pertanyaan yang sering diajukan di bawah ini.</p>
                        </div>
                        
                        <div className="mb-8">
                             <input
                                type="text"
                                placeholder="Cari pertanyaan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            {filteredFaqData.length > 0 ? (
                                filteredFaqData.map((item, index) => (
                                    <AccordionItem
                                        key={index}
                                        item={item}
                                        isOpen={openIndex === index}
                                        onClick={() => handleAccordionClick(index)}
                                    />
                                ))
                            ) : (
                                <p className="text-center text-slate-500 py-8">Tidak ada hasil yang ditemukan untuk pencarian Anda.</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"></div>}
        </div>
    );
};

export default HowToUse;
