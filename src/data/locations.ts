import type { LocationItem } from '../types/location';

export const LABUAN_LOCATIONS: LocationItem[] = [
  {
    id: 'dataran-labuan',
    name: 'Dataran Labuan',
    imageLabel: 'Dataran Labuan',
    accentTheme: 'cobalt',
    verificationState: 'empty',
    statusLabel: 'Maklumat belum dimasukkan',
    cardSummary:
      'Maklumat belum dimasukkan. Klik untuk melihat susunan latihan dan status semakan.',
    facts: [],
    storySteps: null,
    keywords: [],
    quiz: [],
    sources: [],
    reviewNote:
      'Bahan sejarah dan sumber rujukan untuk Dataran Labuan belum dimasukkan. Sila semak dan masukkan bahan yang disahkan sahaja sebelum digunakan bersama pelawat.',
  },
  {
    id: 'muzium-marin-labuan',
    name: 'Muzium Marin Labuan',
    imageLabel: 'Muzium Marin Labuan',
    accentTheme: 'teal',
    verificationState: 'verified',
    statusLabel: 'Fakta disahkan',
    cardSummary:
      'Pameran hidupan marin perairan Borneo dan Labuan, termasuk rangka paus dari Pantai Sebatu, Melaka.',
    facts: [
      'Muzium memfokuskan pameran hidupan marin.',
      'Antara objektifnya ialah memberi pengetahuan tentang hidupan marin perairan Borneo, khususnya Labuan.',
      'Muzium memupuk kesedaran menjaga warisan semula jadi.',
      'Menurut JMM, rangka paus yang dipamerkan ditemui di Pantai Sebatu, Melaka.',
    ],
    storySteps: {
      tarikanPembuka:
        'Selamat datang ke Muzium Marin Labuan. Di sinilah kita dapat mendekati dunia hidupan laut di perairan Borneo dan Labuan dalam satu persinggahan.',
      faktaDisahkan:
        'Muzium ini memfokuskan pameran hidupan marin untuk memberi pengetahuan tentang hidupan marin perairan Borneo, khususnya Labuan. Menurut JMM, rangka paus yang dipamerkan di sini ditemui di Pantai Sebatu, Melaka.',
      maknaTempat:
        'Muzium ini berperanan memupuk kesedaran dalam kalangan pengunjung tentang pentingnya menjaga warisan semula jadi.',
      hubunganPelawat:
        'Sebagai pelawat yang datang ke pulau ini, mengenali hidupan marin membantu kita lebih menghargai alam laut di sekeliling Labuan.',
      soalanAtauAjakan:
        'Selepas melihat pameran di dalam nanti, apakah satu perkara yang ingin anda kongsikan atau lakukan untuk membantu menjaga warisan semula jadi kita?',
    },
    keywords: [
      'Hidupan marin',
      'Perairan Borneo',
      'Labuan',
      'Warisan semula jadi',
      'Rangka paus (Pantai Sebatu, Melaka)',
    ],
    quiz: [
      {
        id: 'mm-q1',
        question: 'Apakah fokus utama pameran di Muzium Marin Labuan?',
        answer: 'Muzium memfokuskan pameran hidupan marin.',
      },
      {
        id: 'mm-q2',
        question: 'Apakah objektif muzium ini berkaitan hidupan marin tempatan?',
        answer:
          'Memberi pengetahuan tentang hidupan marin perairan Borneo, khususnya Labuan, serta memupuk kesedaran menjaga warisan semula jadi.',
      },
      {
        id: 'mm-q3',
        question: 'Menurut JMM, di manakah rangka paus yang dipamerkan ditemui?',
        answer: 'Di Pantai Sebatu, Melaka.',
      },
    ],
    sources: [
      {
        label: 'Jabatan Muzium Malaysia (JMM) — Muzium Marin Labuan',
        url: 'https://www.jmm.gov.my/en/content/labuan-marine-museum',
        verified: true,
      },
    ],
    reviewNote:
      'Catatan untuk semakan lanjut: Tarikh penubuhan, waktu lawatan, harga tiket dan bilangan spesimen tidak dinyatakan dalam bahan rujukan ini. Rujuk laman rasmi JMM jika maklumat tambahan diperlukan.',
  },
  {
    id: 'tanjung-batu',
    name: 'Tanjung Batu',
    imageLabel: 'Tanjung Batu',
    accentTheme: 'emerald',
    verificationState: 'empty',
    statusLabel: 'Maklumat belum dimasukkan',
    cardSummary:
      'Maklumat belum dimasukkan. Klik untuk melihat susunan latihan dan status semakan.',
    facts: [],
    storySteps: null,
    keywords: [],
    quiz: [],
    sources: [],
    reviewNote:
      'Bahan sejarah dan sumber rujukan untuk Tanjung Batu belum dimasukkan. Sila semak dan masukkan bahan yang disahkan sahaja sebelum digunakan bersama pelawat.',
  },
  {
    id: 'tugu-peringatan-perang',
    name: 'Tugu Peringatan Perang',
    imageLabel: 'Tugu Peringatan Perang (Tanah Perkuburan Perang Labuan)',
    accentTheme: 'amber',
    verificationState: 'partial',
    statusLabel: 'Sebahagian diisi · Maklumat tidak mencukupi',
    cardSummary:
      'Tanah Perkuburan Perang Labuan & Tugu Peringatan (CWGC) di Jalan Tanjung Batu. Sebahagian bahan masih terputus dan perlu semakan sumber.',
    facts: [
      'Tanah Perkuburan Perang Labuan & Tugu Peringatan (Labuan War Cemetery & Memorial) terletak di Jalan Tanjung Batu, Labuan — kira-kira 1 km dari lapangan terbang dan 3 km dari Bandar Labuan.',
      'Merupakan tanah perkuburan perang terbesar di Malaysia yang dikendalikan oleh Commonwealth War Graves Commission (CWGC).',
      'Ditubuhkan pada 28 Disember 1945 dan menempatkan seramai 3,908 orang pahlawan yang gugur semasa Perang Dunia Kedua (termasuk mangsa Kawat Maut Sandakan-Ranau serta kem tahanan Batu Lintang).',
      'Melibatkan askar warganegara dari Australia, Britain, India, New Zealand [Maklumat tidak mencukupi: senarai penuh negara terputus selepas New Zealand].',
      'Nota bahan tidak lengkap: Bahan menyebut sejarah Perang Dunia Kedua di Labuan terbahagi kepada beberapa lokasi utama, tetapi hanya lokasi pertama dibekalkan.',
    ],
    storySteps: {
      tarikanPembuka:
        'Selamat datang ke Tanah Perkuburan Perang Labuan & Tugu Peringatan di Jalan Tanjung Batu, yang terletak kira-kira 1 km dari lapangan terbang dan 3 km dari Bandar Labuan.',
      faktaDisahkan:
        'Ditubuhkan pada 28 Disember 1945, ini ialah tanah perkuburan perang terbesar di Malaysia yang dikendalikan oleh Commonwealth War Graves Commission (CWGC). Ia menempatkan 3,908 pahlawan yang gugur semasa Perang Dunia Kedua, termasuk mangsa Kawat Maut Sandakan-Ranau serta kem tahanan Batu Lintang, melibatkan warganegara dari Australia, Britain, India, New Zealand (senarai penuh negara belum lengkap dalam bahan).',
      maknaTempat:
        'Tapak ini merupakan antara lokasi utama yang sangat penting berkaitan sejarah Perang Dunia Kedua di Wilayah Persekutuan Labuan sebagai tanda peringatan kepada pahlawan yang gugur.',
      hubunganPelawat:
        'Bagi pelawat yang datang ke Labuan, lokasi ini mengingatkan kita bahawa kisah pulau ini turut berkait rapat dengan sejarah bersama negara-negara seperti Australia, Britain, India dan New Zealand.',
      soalanAtauAjakan:
        'Sambil kita melawat kawasan ini dengan penuh hormat, apakah bahagian sejarah Perang Dunia Kedua di Labuan yang ingin anda ketahui lebih lanjut daripada sumber rasmi?',
    },
    keywords: [
      'Jalan Tanjung Batu (1 km lapangan terbang, 3 km Bandar Labuan)',
      'Tanah perkuburan perang terbesar di Malaysia (CWGC)',
      '28 Disember 1945',
      '3,908 pahlawan Perang Dunia Kedua',
      'Kawat Maut Sandakan-Ranau & Batu Lintang',
    ],
    quiz: [
      {
        id: 'tpp-q1',
        question:
          'Di manakah lokasi Tanah Perkuburan Perang Labuan & Tugu Peringatan dan berapakah jaraknya dari lapangan terbang serta Bandar Labuan?',
        answer:
          'Di Jalan Tanjung Batu, Labuan — kira-kira 1 km dari lapangan terbang dan 3 km dari Bandar Labuan.',
      },
      {
        id: 'tpp-q2',
        question:
          'Bilakah tanah perkuburan perang ini ditubuhkan dan badan manakah yang mengendalikannya?',
        answer:
          'Ditubuhkan pada 28 Disember 1945 dan dikendalikan oleh Commonwealth War Graves Commission (CWGC).',
      },
      {
        id: 'tpp-q3',
        question:
          'Berapakah jumlah pahlawan yang gugur semasa Perang Dunia Kedua yang ditempatkan di sini menurut bahan yang dibekalkan?',
        answer:
          'Seramai 3,908 orang pahlawan (termasuk mangsa Kawat Maut Sandakan-Ranau serta kem tahanan Batu Lintang).',
      },
    ],
    sources: [
      {
        label: 'Bahan catatan peserta (pautan sumber asal belum disertakan)',
        verified: false,
      },
    ],
    reviewNote:
      'Maklumat tidak mencukupi & perlu disemak: (1) Pautan sumber rujukan (URL) tidak disertakan dalam bahan yang dibekalkan; (2) Senarai komposisi warganegara askar terputus selepas Australia, Britain, India dan New Zealand; (3) Pengenalan menyebut terdapat beberapa lokasi utama lain berkaitan Perang Dunia Kedua di Labuan, namun hanya lokasi pertama yang dibekalkan.',
  },
];
