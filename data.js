const talents = {
    logika: {
        id: 'logika',
        name: 'Logika & Analitis',
        description: 'Anda memiliki kemampuan berpikir kritis, sistematis, dan objektif. Anda suka memecahkan masalah kompleks dengan pendekatan rasional.',
        careers: ['Data Analyst', 'Financial Advisor', 'Programmer', 'Researcher', 'Economist'],
        majors: ['Matematika', 'Statistika', 'Ilmu Komputer', 'Ekonomi', 'Teknik'],
        insight: {
            strength: 'Mampu melihat pola yang tidak terlihat orang lain, objektif dalam konflik, dan sangat efisien.',
            weakness: 'Cenderung terlalu kritis terhadap diri sendiri dan orang lain, terkadang melupakan aspek emosional.',
            motivation: 'Menyelesaikan masalah yang rumit dan menemukan kebenaran berdasarkan fakta.'
        }
    },
    komunikasi: {
        id: 'komunikasi',
        name: 'Komunikasi',
        description: 'Anda pandai menyampaikan ide, negosiasi, dan berbicara di depan umum. Kata-kata adalah senjata utama Anda untuk mempengaruhi orang lain.',
        careers: ['Public Relations', 'Jurnalis', 'Content Creator', 'Sales Manager', 'Diplomat'],
        majors: ['Ilmu Komunikasi', 'Hubungan Internasional', 'Sastra', 'Marketing'],
        insight: {
            strength: 'Persuasif, mudah bergaul, dan mampu mencairkan suasana yang kaku.',
            weakness: 'Bisa terlalu banyak bicara tanpa mendengarkan, atau cenderung membesar-besarkan cerita.',
            motivation: 'Mendapat apresiasi dari audiens dan berhasil meyakinkan orang lain.'
        }
    },
    kreativitas: {
        id: 'kreativitas',
        name: 'Kreativitas',
        description: 'Anda memiliki imajinasi tanpa batas dan suka menciptakan sesuatu yang baru. Anda melihat dunia penuh dengan potensi inovasi.',
        careers: ['Graphic Designer', 'UI/UX Designer', 'Arsitek', 'Fashion Designer', 'Creative Director'],
        majors: ['Desain Komunikasi Visual', 'Arsitektur', 'Seni Rupa', 'Film & Televisi'],
        insight: {
            strength: 'Visioner, orisinil, dan selalu punya solusi out-of-the-box.',
            weakness: 'Kadang sulit fokus pada satu hal, mudah bosan, dan kurang terorganisir.',
            motivation: 'Kebebasan untuk berekspresi dan menciptakan karya yang unik.'
        }
    },
    kepemimpinan: {
        id: 'kepemimpinan',
        name: 'Kepemimpinan',
        description: 'Anda berbakat mengarahkan orang lain, mengambil keputusan tegas, dan bertanggung jawab. Orang lain sering melihat Anda sebagai panutan.',
        careers: ['Project Manager', 'Entrepreneur', 'HR Manager', 'Politisi', 'CEO'],
        majors: ['Manajemen', 'Administrasi Bisnis', 'Hukum', 'Ilmu Politik'],
        insight: {
            strength: 'Percaya diri, visioner, dan mampu menggerakkan tim menuju tujuan.',
            weakness: 'Bisa terlihat dominan atau otoriter, kadang kurang sabar dengan proses yang lambat.',
            motivation: 'Memiliki kendali dan melihat hasil nyata dari kerja tim.'
        }
    },
    teknologi: {
        id: 'teknologi',
        name: 'Teknologi',
        description: 'Anda tertarik dengan perkembangan gadget, software, dan inovasi digital. Anda cepat memahami cara kerja sistem komputer.',
        careers: ['Software Engineer', 'Cyber Security Specialist', 'Systems Administrator', 'AI Specialist'],
        majors: ['Teknik Informatika', 'Sistem Informasi', 'Teknik Elektro', 'Robotika'],
        insight: {
            strength: 'Adaptif terhadap perubahan zaman, pemecah masalah teknis yang handal, dan logis.',
            weakness: 'Lebih nyaman berinteraksi dengan mesin daripada manusia, bisa terlalu detail oriented.',
            motivation: 'Mempelajari teknologi terbaru dan mengotomatisasi pekerjaan manual.'
        }
    },
    sosial: {
        id: 'sosial',
        name: 'Sosial',
        description: 'Anda memiliki empati tinggi dan kepedulian tulus terhadap orang lain. Anda merasa puas jika bisa membantu sesama.',
        careers: ['Psikolog', 'Guru/Dosen', 'Konselor', 'Perawat', 'Social Worker'],
        majors: ['Psikologi', 'Keguruan', 'Kesejahteraan Sosial', 'Keperawatan', 'Sosiologi'],
        insight: {
            strength: 'Pendengar yang baik, peka emosional, dan tulus dalam membantu.',
            weakness: 'Sering mendahulukan kepentingan orang lain hingga mengorbankan diri sendiri, mudah terbawa perasaan.',
            motivation: 'Melihat orang lain bahagia atau sembuh berkat bantuan Anda.'
        }
    }
};

const questions = [
    // Logika (1-3)
    { id: 1, text: "Saya menyukai teka-teki logika atau matematika yang menantang.", category: "logika" },
    { id: 2, text: "Saya membuat keputusan berdasarkan data dan fakta, bukan perasaan.", category: "logika" },
    { id: 3, text: "Saya mudah menemukan pola atau kesalahan dalam sebuah urutan data.", category: "logika" },

    // Komunikasi (4-6)
    { id: 4, text: "Saya merasa percaya diri saat berbicara di depan banyak orang.", category: "komunikasi" },
    { id: 5, text: "Saya suka menyusun kata-kata untuk meyakinkan orang lain.", category: "komunikasi" },
    { id: 6, text: "Teman-teman bilang saya pandai bercerita atau menjelaskan sesuatu.", category: "komunikasi" },

    // Kreativitas (7-9)
    { id: 7, text: "Saya sering memiliki ide-ide unik yang belum terpikirkan orang lain.", category: "kreativitas" },
    { id: 8, text: "Saya lebih suka tugas yang membebaskan saya berekspresi secara artistik.", category: "kreativitas" },
    { id: 9, text: "Rutinitas yang monoton membuat saya cepat bosan.", category: "kreativitas" },

    // Kepemimpinan (10-12)
    { id: 10, text: "Saya sering ditunjuk menjadi ketua dalam tugas kelompok.", category: "kepemimpinan" },
    { id: 11, text: "Saya berani mengambil keputusan sulit ketika orang lain ragu.", category: "kepemimpinan" },
    { id: 12, text: "Saya suka memotivasi tim untuk mencapai target bersama.", category: "kepemimpinan" },

    // Teknologi (13-15)
    { id: 13, text: "Saya selalu penasaran dengan gadget atau aplikasi terbaru.", category: "teknologi" },
    { id: 14, text: "Saya sering mengutak-atik pengaturan komputer atau HP untuk mengoptimalkannya.", category: "teknologi" },
    { id: 15, text: "Saya tertarik belajar coding atau bagaimana software bekerja.", category: "teknologi" },

    // Sosial (16-18)
    { id: 16, text: "Saya sangat peka terhadap perubahan perasaan orang lain.", category: "sosial" },
    { id: 17, text: "Saya senang menjadi tempat curhat dan memberikan dukungan emosional.", category: "sosial" },
    { id: 18, text: "Membantu orang lain berkembang memberikan kepuasan tersendiri bagi saya.", category: "sosial" }
];
