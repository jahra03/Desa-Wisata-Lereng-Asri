import { useEffect, useState } from 'react';
import { Check, Clock, MapPin, MessageCircle, Search, Users, X } from 'lucide-react';
import {
  DESTINATIONS,
  VILLAGE_CONTACT,
  type Destination,
  type DestinationCategory,
} from '../data/villageData';
import { buildWhatsAppUrl, filterDestinations } from '../utils/tourismLogic';
import { ImageWithFallback } from './ImageWithFallback';

const CATEGORIES: DestinationCategory[] = [
  'Semua',
  'Alam & Air',
  'Budaya & Kriya',
  'Kuliner & Inap',
];

export function DestinationSection() {
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);

  const filtered = filterDestinations(DESTINATIONS, selectedCategory, searchQuery);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeDestination) {
        setActiveDestination(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDestination]);

  return (
    <section id="destinasi" className="py-10 md:py-14">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-sm font-bold text-[#3b6847] mb-1">Pilihan Spot Wisata Desa</p>
            <h2 className="text-2xl sm:text-[32px] font-bold text-[#13241c] leading-tight tracking-tight text-balance">
              Daftar Destinasi Lereng Asri
            </h2>
            <p className="text-base text-[#404945] mt-2 max-w-2xl leading-relaxed">
              Semua spot wisata mudah dijangkau dengan jalan setapak tertata rapi dan ramah untuk anak-anak hingga lansia.
            </p>
          </div>
          <p className="text-sm font-semibold text-[#404945] tabular-nums shrink-0">
            Menampilkan {filtered.length} dari {DESTINATIONS.length} destinasi
          </p>
        </div>

        {/* Interactive Filter Bar & Search Input */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div
            role="group"
            aria-label="Filter kategori destinasi"
            className="flex items-center gap-2.5 overflow-x-auto pb-1"
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isSelected}
                  className={`min-h-[48px] px-5 py-2.5 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap shrink-0 inline-flex items-center gap-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4d3e] ${
                    isSelected
                      ? 'bg-[#1b4d3e] text-white'
                      : 'bg-[#f4ebd9] text-[#1b4d3e] hover:bg-[#e8dcc4]'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4" aria-hidden="true" />}
                  <span>{category}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80">
            <label htmlFor="cari-destinasi" className="sr-only">
              Cari destinasi wisata
            </label>
            <Search
              className="w-5 h-5 text-[#404945] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="cari-destinasi"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari curug, kopi, atau batik..."
              className="w-full min-h-[52px] pl-12 pr-4 py-3 bg-white border border-[#e8e0d2] rounded-xl text-base text-[#13241c] placeholder:text-[#707974] focus:outline-2 focus:outline-[#4e7c59]"
            />
          </div>
        </div>

        {/* Destination Cards Grid or Friendly Empty State */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-[#e8e0d2] rounded-2xl p-8 text-center">
            <p className="text-lg font-bold text-[#13241c]">Destinasi tidak ditemukan</p>
            <p className="text-base text-[#404945] mt-1 mb-5">
              Coba kata kunci lain atau tampilkan kembali semua destinasi wisata desa.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
              className="min-h-[48px] px-6 py-3 bg-[#1b4d3e] text-white rounded-xl font-semibold text-base cursor-pointer"
            >
              Tampilkan Semua Destinasi
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-[#e8e0d2] rounded-2xl overflow-hidden botanical-shadow flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#f0ede9]">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  {/* Unboxed Clean Metadata */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-[#3b6847] mb-2">
                    <span>{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{item.openHours}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#13241c] leading-snug mb-2">{item.name}</h3>
                  <p className="text-base text-[#404945] leading-relaxed mb-4 flex-1">{item.shortDesc}</p>

                  <div className="pt-4 border-t border-[#f0ede9] flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-[#404945]">Tarif / Akses</p>
                      <p className="text-base font-extrabold text-[#b85d22] tabular-nums">{item.ticketLabel}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveDestination(item)}
                      className="min-h-[48px] px-5 py-2.5 bg-[#f4ebd9] hover:bg-[#1b4d3e] text-[#1b4d3e] hover:text-white rounded-xl font-bold text-sm sm:text-base whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4d3e]"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Destination Detail Modal */}
      {activeDestination && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="detail-destinasi-judul"
          className="fixed inset-0 z-50 bg-[#13241c]/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setActiveDestination(null)}
        >
          <div
            className="bg-[#fcf9f4] w-full sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl botanical-shadow-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-[#f0ede9]">
              <ImageWithFallback
                src={activeDestination.image}
                alt={activeDestination.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveDestination(null)}
                aria-label="Tutup detail destinasi"
                className="absolute top-4 right-4 min-h-[48px] min-w-[48px] rounded-full bg-white/95 text-[#13241c] flex items-center justify-center shadow-md hover:bg-white cursor-pointer"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 sm:p-7">
              <p className="text-sm font-bold text-[#3b6847] mb-1">
                {activeDestination.category} · {activeDestination.duration}
              </p>
              <h3 id="detail-destinasi-judul" className="text-2xl font-extrabold text-[#13241c] mb-3">
                {activeDestination.name}
              </h3>
              <p className="text-base text-[#13241c] leading-relaxed mb-5">{activeDestination.fullDesc}</p>

              <div className="bg-white border border-[#e8e0d2] rounded-2xl p-4 space-y-3 mb-5">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#1b4d3e] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-[#13241c]">Jam Buka & Tarif</p>
                    <p className="text-base text-[#404945] tabular-nums">
                      {activeDestination.openHours} · {activeDestination.ticketLabel}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#1b4d3e] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-[#13241c]">Aksesibilitas</p>
                    <p className="text-base text-[#404945]">{activeDestination.accessibility}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#1b4d3e] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-[#13241c]">Tips Pengunjung</p>
                    <p className="text-base text-[#404945]">{activeDestination.highlightTip}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm font-bold text-[#13241c] mb-2">Fasilitas Tersedia:</p>
                <p className="text-base text-[#404945] leading-relaxed">
                  {activeDestination.facilities.join(' · ')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={buildWhatsAppUrl(
                    VILLAGE_CONTACT.whatsappNumber,
                    `Halo Admin Desa Wisata Lereng Asri, saya ingin bertanya tentang destinasi ${activeDestination.name}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-h-[52px] px-6 py-3.5 bg-[#1b4d3e] hover:bg-[#003629] text-white rounded-xl font-bold text-base inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>Tanya Spot Ini via WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveDestination(null)}
                  className="min-h-[52px] px-6 py-3.5 bg-[#f4ebd9] text-[#1b4d3e] rounded-xl font-bold text-base cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
