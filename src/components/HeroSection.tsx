import { ArrowRight, Clock, MapPin, MessageCircle, Sun, Ticket } from 'lucide-react';
import { VILLAGE_CONTACT } from '../data/villageData';
import { buildWhatsAppUrl } from '../utils/tourismLogic';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroSectionProps {
  onExplorePackages: () => void;
  onExploreDestinations: () => void;
}

const QUICK_FACTS = [
  {
    icon: Clock,
    label: 'Jam Operasional',
    value: '06.30 – 17.30 WIB',
  },
  {
    icon: Ticket,
    label: 'Tiket Kawasan',
    value: 'Mulai Rp 10.000',
  },
  {
    icon: Sun,
    label: 'Udara Pegunungan',
    value: 'Sejuk 17°C – 23°C',
  },
  {
    icon: MapPin,
    label: 'Jarak Tempuh',
    value: '45 Menit dari Kota',
  },
];

export function HeroSection({ onExplorePackages, onExploreDestinations }: HeroSectionProps) {
  const waHeroUrl = buildWhatsAppUrl(
    VILLAGE_CONTACT.whatsappNumber,
    'Halo Admin Desa Wisata Lereng Asri, saya berencana berkunjung dan ingin tanya rekomendasi paket wisata.'
  );

  return (
    <section id="beranda" className="pt-4 pb-8 md:pt-8 md:pb-12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-[#13241c] min-h-[470px] md:min-h-[540px] flex items-end botanical-shadow">
          <div className="absolute inset-0">
            <ImageWithFallback
              src={VILLAGE_CONTACT.heroImage}
              alt="Suasana pagi Desa Wisata Lereng Asri dengan kebun teh berundak, pondok bambu, dan jalan setapak batu"
              loading="eager"
              className="w-full h-full object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0d221b]/95 via-[#0d221b]/65 to-[#0d221b]/40"
            />
          </div>

          <div className="relative z-10 w-full p-6 sm:p-8 md:p-12 max-w-3xl">
            <p className="text-sm sm:text-base font-bold text-[#dff7ed] mb-2">
              Desa Wisata Lereng Asri · Kecamatan Sumber Asri · 820–930 mdpl
            </p>
            <h1 className="text-[30px] sm:text-4xl md:text-[44px] font-extrabold text-white leading-[1.18] tracking-tight text-balance mb-4">
              Nikmati Sejuknya Alam Hijau dan Keramahan Desa Pegunungan
            </h1>
            <p className="text-base sm:text-lg text-[#f3f0eb] leading-relaxed mb-7 max-w-2xl">
              Tempat berlibur yang tenang dan ramah keluarga. Jelajahi air terjun jernih, kebun teh pagi,
              kriya batik alami, hingga sajian kopi hangat langsung dari kebun warga.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={onExplorePackages}
                className="min-h-[52px] px-7 py-3.5 bg-[#d97736] hover:bg-[#b85d22] text-white rounded-xl font-bold text-base inline-flex items-center justify-center gap-2 whitespace-nowrap transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
              >
                <span>Lihat Paket & Harga</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>

              <a
                href={waHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[52px] px-6 py-3.5 bg-white hover:bg-[#f4ebd9] text-[#1b4d3e] rounded-xl font-bold text-base inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Tanya via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onExploreDestinations}
                className="min-h-[52px] px-5 py-3 text-white hover:text-[#baeed9] font-semibold text-base inline-flex items-center justify-center whitespace-nowrap underline underline-offset-4 cursor-pointer"
              >
                Daftar Destinasi
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Tourist Quick-Fact Strip */}
        <div className="mt-4 md:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {QUICK_FACTS.map((fact) => {
            const Icon = fact.icon;
            return (
              <div
                key={fact.label}
                className="bg-white border border-[#e8e0d2] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#f4ebd9] text-[#1b4d3e] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-[#404945] font-medium leading-snug">{fact.label}</p>
                  <p className="text-base font-bold text-[#13241c] mt-0.5 tabular-nums">{fact.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
