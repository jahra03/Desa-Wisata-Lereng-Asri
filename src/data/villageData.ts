export type DestinationCategory = 'Semua' | 'Alam & Air' | 'Budaya & Kriya' | 'Kuliner & Inap';

export interface Destination {
  id: string;
  name: string;
  category: Exclude<DestinationCategory, 'Semua'>;
  shortDesc: string;
  fullDesc: string;
  image: string;
  openHours: string;
  ticketLabel: string;
  duration: string;
  accessibility: string;
  facilities: string[];
  highlightTip: string;
}

export interface TourPackage {
  id: string;
  name: string;
  subtitle: string;
  duration: string;
  pricePerPerson: number;
  minPeople: number;
  isPopular?: boolean;
  includes: string[];
  itinerary: string[];
  image: string;
}

export type GalleryCategory = 'Semua' | 'Pesona Alam' | 'Aktivitas Wisata' | 'Kuliner & Inap';

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: Exclude<GalleryCategory, 'Semua'>;
  image: string;
}

export interface MapLandmark {
  id: string;
  name: string;
  type: string;
  xPercent: number;
  yPercent: number;
  walkTime: string;
  elevation: string;
  description: string;
  facilities: string[];
}

export interface Testimonial {
  id: string;
  visitorName: string;
  origin: string;
  packageName: string;
  quote: string;
  visitDate: string;
}

export const VILLAGE_CONTACT = {
  name: 'Desa Wisata Lereng Asri',
  whatsappNumber: '6281234567890',
  displayPhone: '0812-3456-7890',
  address: 'Jl. Raya Lereng Pegunungan KM 14, Dusun Krajan, Kec. Sumber Asri',
  openHours: 'Setiap Hari · 06.30 – 17.30 WIB',
  googleMapsUrl: 'https://maps.google.com/?q=-7.654321,111.123456',
  heroImage: '/src/assets/images/hero_lereng_asri_1794886899661.jpg',
};

export const DESTINATIONS: Destination[] = [
  {
    id: 'curug-embun',
    name: 'Curug Embun Pagi',
    category: 'Alam & Air',
    shortDesc: 'Air terjun jernih berundak batu vulkanik dengan jembatan bambu yang aman untuk keluarga.',
    fullDesc:
      'Nikmati kesegaran air pegunungan alami yang mengalir tenang di tengah rimbunnya pakis hutan. Dilengkapi jalur setapak batu yang rata dan jembatan bambu kokoh agar nyaman dilalui anak-anak maupun orang tua.',
    image: '/src/assets/images/dest_curug_embun_1794886900205.jpg',
    openHours: '07.00 – 16.30 WIB',
    ticketLabel: 'Rp 15.000 / orang',
    duration: '1,5 – 2 jam',
    accessibility: 'Ramah Anak & Lansia (jalur datar 300 m)',
    facilities: ['Jembatan Bambu Foto', 'Gazebo Istirahat', 'Ruang Bilas Bersih', 'Pemandu Lokal'],
    highlightTip: 'Datang sebelum pukul 09.30 WIB untuk melihat pantulan sinar matahari di atas kolam air terjun.',
  },
  {
    id: 'kebun-teh',
    name: 'Gardu Pandang Kebun Teh & Kopi',
    category: 'Alam & Air',
    shortDesc: 'Hamparan terasering teh hijau dan kebun kopi arabika dengan dek kayu menghadap lembah.',
    fullDesc:
      'Spot terbaik menyaksikan lautan kabut pagi dan matahari terbit di lereng gunung. Pengunjung bisa ikut berjalan menyusuri pematang kebun teh serta mencoba memetik pucuk daun teh segar bersama petani setempat.',
    image: '/src/assets/images/dest_kebun_teh_1794886900125.jpg',
    openHours: '05.30 – 17.00 WIB',
    ticketLabel: 'Rp 10.000 / orang',
    duration: '1 – 2 jam',
    accessibility: 'Akses kendaraan roda 2 & 4 dekat gerbang',
    facilities: ['Dek Pandang Kayu', 'Area Parkir Luas', 'Warung Teh Hangat', 'Toilet Umum'],
    highlightTip: 'Bawa jaket tipis karena suhu pagi hari berkisar 17–20°C yang sejuk menyegarkan.',
  },
  {
    id: 'sanggar-ecoprint',
    name: 'Sanggar Kriya Batik Ecoprint',
    category: 'Budaya & Kriya',
    shortDesc: 'Belajar membatik ramah lingkungan menggunakan daun dan bunga segar langsung dari kebun desa.',
    fullDesc:
      'Dipandu oleh ibu-ibu pengrajin desa yang ramah, wisatawan diajak memilih daun pakis, kayu secang, dan bunga kenikir untuk dicetak di atas kain katun alami. Hasil karya kain bisa langsung dibawa pulang sebagai kenang-kenangan.',
    image: '/src/assets/images/galeri_batik_alam_1794886901706.jpg',
    openHours: '08.30 – 16.00 WIB',
    ticketLabel: 'Rp 45.000 / sesi (termasuk kain)',
    duration: '2 jam',
    accessibility: 'Pendopo datar dan teduh untuk semua usia',
    facilities: ['Alat & Bahan Lengkap', 'Minuman Herbal Gratis', 'Galeri Oleh-Oleh'],
    highlightTip: 'Cocok untuk kegiatan kelompok keluarga, sekolah, maupun komunitas akhir pekan.',
  },
  {
    id: 'pendopo-kopi',
    name: 'Pendopo Kuliner & Kopi Ndeso',
    category: 'Kuliner & Inap',
    shortDesc: 'Sajian kopi seduh manual panen lereng, singkong keju hangat, pisang goreng, dan nasi liwet.',
    fullDesc:
      'Tempat singgah favorit setelah berjalan-jalan di alam. Semua bahan makanan dimasak segar dari hasil kebun warga: kopi arabika lereng, teh sangrai wangi, wedang jahe serai, hingga paket makan siang tradisional beralas daun pisang.',
    image: '/src/assets/images/dest_pendopo_kopi_1794886902042.jpg',
    openHours: '07.30 – 20.00 WIB',
    ticketLabel: 'Menu mulai Rp 12.000',
    duration: '1 – 1,5 jam',
    accessibility: 'Area duduk luas, musala & toilet bersih',
    facilities: ['Seduh Kopi Manual', 'Masakan Rumahan Halal', 'Musala Nyaman', 'Colokan & Wi-Fi'],
    highlightTip: 'Coba Kopi Tubruk Lereng dipadukan dengan Singkong Merekah Gula Aren hangat.',
  },
  {
    id: 'homestay-bambu',
    name: 'Homestay Bambu & Kayu Asri',
    category: 'Kuliner & Inap',
    shortDesc: 'Penginapan pondok kayu hangat di tengah taman pinus dengan suasana tenang khas pedesaan.',
    fullDesc:
      'Dirancang menggunakan anyaman bambu dan kayu jati pilihan yang hangat di malam hari. Setiap kamar dilengkapi air hangat, sarapan tradisional buatan tuan rumah, dan teras santai untuk menikmati secangkir teh di pagi berkabut.',
    image: '/src/assets/images/dest_homestay_bambu_1794886901863.jpg',
    openHours: 'Check-in 14.00 · Check-out 12.00 WIB',
    ticketLabel: 'Mulai Rp 275.000 / malam',
    duration: '1 malam atau lebih',
    accessibility: 'Tersedia kamar lantai dasar ramah lansia',
    facilities: ['Air Hangat', 'Sarapan Pagi 2 Orang', 'Teras Taman Pinus', 'Api Unggun Malam'],
    highlightTip: 'Pesan minimal 3 hari sebelumnya untuk akhir pekan dan libur panjang.',
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'paket-pagi',
    name: 'Paket Jelajah Pagi Asri',
    subtitle: 'Cocok untuk kunjungan singkat & foto keluarga',
    duration: 'Setengah Hari (07.00 – 12.00 WIB)',
    pricePerPerson: 95000,
    minPeople: 2,
    includes: [
      'Tiket masuk seluruh kawasan wisata',
      'Pemandu lokal ramah berpengalaman',
      'Jalan santai Kebun Teh & Curug Embun Pagi',
      '1x Snack hangat & teh/kopi lereng di Pendopo',
    ],
    itinerary: [
      '07.00 Penyambutan di Gerbang Utama & teh hangat',
      '07.30 Menyusuri terasering Kebun Teh & sesi foto',
      '09.30 Wisata air di Curug Embun Pagi',
      '11.00 Istirahat & camilan tradisional di Pendopo Kopi',
    ],
    image: '/src/assets/images/dest_kebun_teh_1794886900125.jpg',
  },
  {
    id: 'paket-sehari',
    name: 'Paket Sehari Penuh & Kriya Desa',
    subtitle: 'Pengalaman lengkap alam, edukasi, dan makan siang ndeso',
    duration: 'Seharian Penuh (08.00 – 16.00 WIB)',
    pricePerPerson: 185000,
    minPeople: 2,
    isPopular: true,
    includes: [
      'Semua akses destinasi alam (Kebun Teh & Curug)',
      'Workshop Batik Ecoprint (hasil kain dibawa pulang)',
      'Makan siang prasmanan tradisional khas desa',
      'Dokumentasi foto oleh pemandu desa',
    ],
    itinerary: [
      '08.00 Registrasi & minuman selamat datang jahe serai',
      '08.30 Tur Kebun Teh, Kopi & Curug Embun Pagi',
      '12.00 Makan siang hangat bersama di Pendopo Kuliner',
      '13.30 Kelas Batik Ecoprint bersama pengrajin desa',
    ],
    image: '/src/assets/images/galeri_batik_alam_1794886901706.jpg',
  },
  {
    id: 'paket-inap',
    name: 'Paket Menginap 2 Hari 1 Malam',
    subtitle: 'Liburan tenang bermalam di Homestay Bambu Asri',
    duration: '2 Hari 1 Malam (Sabtu – Minggu / Bebas)',
    pricePerPerson: 420000,
    minPeople: 2,
    includes: [
      '1 malam menginap di Homestay Bambu (isi 2–4 orang)',
      '3x makan masakan rumahan (siang, malam, sarapan)',
      'Api unggun sore & seduh kopi bersama warga',
      'Tur matahari terbit di Gardu Pandang Kebun Teh',
    ],
    itinerary: [
      'Hari 1: Check-in, Tur Curug & Kriya Ecoprint, Makan Malam & Api Unggun',
      'Hari 2: Sunrise Kebun Teh, Sarapan Ndeso, Belanja Oleh-Oleh UMKM',
    ],
    image: '/src/assets/images/dest_homestay_bambu_1794886901863.jpg',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Suasana Pagi Kampung Lereng',
    caption: 'Jalan setapak batu yang bersih dan teduh menyusuri deretan gazebo bambu serta terasering hijau.',
    category: 'Pesona Alam',
    image: '/src/assets/images/hero_lereng_asri_1794886899661.jpg',
  },
  {
    id: 'g-2',
    title: 'Kesegaran Curug Embun Pagi',
    caption: 'Jembatan bambu aman tepat di depan kolam jernih air terjun pegunungan.',
    category: 'Pesona Alam',
    image: '/src/assets/images/dest_curug_embun_1794886900205.jpg',
  },
  {
    id: 'g-3',
    title: 'Matahari Terbit di Kebun Teh',
    caption: 'Pemandangan kabut lembut dari gardu pandang kayu sebelum memetik pucuk teh pagi.',
    category: 'Pesona Alam',
    image: '/src/assets/images/dest_kebun_teh_1794886900125.jpg',
  },
  {
    id: 'g-4',
    title: 'Belajar Batik Ecoprint Alami',
    caption: 'Wisatawan berkarya mencetak motif dedaunan asli lereng bersama ibu pengrajin desa.',
    category: 'Aktivitas Wisata',
    image: '/src/assets/images/galeri_batik_alam_1794886901706.jpg',
  },
  {
    id: 'g-5',
    title: 'Kopi Lereng & Camilan Tradisional',
    caption: 'Seduhan kopi arabika panen warga disajikan hangat bersama singkong dan pisang goreng.',
    category: 'Kuliner & Inap',
    image: '/src/assets/images/dest_pendopo_kopi_1794886902042.jpg',
  },
  {
    id: 'g-6',
    title: 'Teras Hangat Homestay Bambu',
    caption: 'Pondok kayu dan bambu beratap asri dikelilingi taman bunga dan pohon pinus.',
    category: 'Kuliner & Inap',
    image: '/src/assets/images/dest_homestay_bambu_1794886901863.jpg',
  },
];

export const MAP_LANDMARKS: MapLandmark[] = [
  {
    id: 'pin-gerbang',
    name: 'Gerbang Utama & Parkir Luas',
    type: 'Titik Kedatangan',
    xPercent: 18,
    yPercent: 72,
    walkTime: 'Titik awal (0 menit)',
    elevation: '820 mdpl',
    description: 'Area parkir aman untuk mobil keluarga & bus kecil, loket informasi ramah, serta musala utama.',
    facilities: ['Parkir 40 Mobil', 'Loket Tiket & Informasi', 'Toilet & Musala'],
  },
  {
    id: 'pin-pendopo',
    name: 'Pendopo Kuliner & Kopi Ndeso',
    type: 'Kuliner & Istirahat',
    xPercent: 38,
    yPercent: 58,
    walkTime: '3 menit jalan kaki dari Gerbang',
    elevation: '845 mdpl',
    description: 'Pusat sajian kopi seduh lereng, teh hangat, dan makan siang tradisional dengan tempat duduk teduh.',
    facilities: ['Kedai Kopi & Teh', 'Prasmanan Desa', 'Tempat Duduk Keluarga'],
  },
  {
    id: 'pin-sanggar',
    name: 'Sanggar Kriya Batik Ecoprint',
    type: 'Edukasi & Budaya',
    xPercent: 54,
    yPercent: 68,
    walkTime: '5 menit jalan kaki dari Gerbang',
    elevation: '850 mdpl',
    description: 'Pendopo terbuka tempat workshop membatik daun alami dan galeri kerajinan UMKM warga.',
    facilities: ['Area Workshop', 'Toko Oleh-Oleh', 'Air Bersih'],
  },
  {
    id: 'pin-kebun',
    name: 'Gardu Pandang Kebun Teh',
    type: 'Spot Sunrise & Alam',
    xPercent: 58,
    yPercent: 30,
    walkTime: '10 menit jalan santai',
    elevation: '930 mdpl',
    description: 'Dek kayu di puncak bukit kebun teh menghadap gunung dan lembah kabut pagi.',
    facilities: ['Dek Foto Luas', 'Gazebo Bambu', 'Pemandu Kebun'],
  },
  {
    id: 'pin-curug',
    name: 'Curug Embun Pagi',
    type: 'Air Terjun Utama',
    xPercent: 74,
    yPercent: 46,
    walkTime: '12 menit menyusuri jalur batu',
    elevation: '890 mdpl',
    description: 'Air terjun asri dengan jembatan bambu aman dan kolam air jernih yang menyegarkan.',
    facilities: ['Jembatan Bambu', 'Ruang Bilas', 'Petugas Keamanan'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    visitorName: 'Ibu Ratna Kusuma',
    origin: 'Yogyakarta',
    packageName: 'Paket Sehari Penuh & Kriya Desa',
    quote: 'Anak-anak dan orang tua saya betah sekali karena jalurnya tertata rapi, makanannya enak, dan warga desa sangat ramah menyambut kami.',
    visitDate: 'Oktober 2026',
  },
  {
    id: 't-2',
    visitorName: 'Bapak Hendra Wijaya',
    origin: 'Semarang',
    packageName: 'Paket Menginap 2 Hari 1 Malam',
    quote: 'Pagi hari duduk di teras homestay bambu sambil minum kopi hangat dan melihat kabut turun terasa damai sekali. Pemesanannya cepat lewat WhatsApp.',
    visitDate: 'November 2026',
  },
];
