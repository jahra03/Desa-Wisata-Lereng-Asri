import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_ITEMS, type GalleryCategory } from '../data/villageData';
import { filterGallery } from '../utils/tourismLogic';
import { ImageWithFallback } from './ImageWithFallback';

const GALLERY_CATEGORIES: GalleryCategory[] = [
  'Semua',
  'Pesona Alam',
  'Aktivitas Wisata',
  'Kuliner & Inap',
];

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = filterGallery(GALLERY_ITEMS, activeCategory);
  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] ?? null : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filteredItems.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section id="galeri" className="py-10 md:py-14">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-sm font-bold text-[#3b6847] mb-1">Dokumentasi Suasana Asli Desa</p>
            <h2 className="text-2xl sm:text-[32px] font-bold text-[#13241c] leading-tight tracking-tight text-balance">
              Galeri Foto Wisatawan
            </h2>
            <p className="text-base text-[#404945] mt-2 max-w-2xl leading-relaxed">
              Ketuk foto untuk memperbesar tampilan dan melihat cerita di balik setiap sudut Desa Wisata Lereng Asri.
            </p>
          </div>
        </div>

        <div
          role="group"
          aria-label="Filter kategori galeri"
          className="flex items-center gap-2.5 overflow-x-auto pb-2 mb-7"
        >
          {GALLERY_CATEGORIES.map((category) => {
            const selected = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setLightboxIndex(null);
                }}
                aria-pressed={selected}
                className={`min-h-[48px] px-5 py-2.5 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selected
                    ? 'bg-[#1b4d3e] text-white'
                    : 'bg-[#f4ebd9] text-[#1b4d3e] hover:bg-[#e8dcc4]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group text-left bg-white border border-[#e8e0d2] rounded-2xl overflow-hidden botanical-shadow cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4d3e]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#f0ede9]">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-xs font-bold text-[#3b6847] mb-1">{item.category}</p>
                <h3 className="text-lg font-bold text-[#13241c] leading-snug">{item.title}</h3>
                <p className="text-sm text-[#404945] mt-1 line-clamp-2 leading-relaxed">{item.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau foto ${currentLightboxItem.title}`}
          className="fixed inset-0 z-50 bg-[#0d221b]/90 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="w-full max-w-3xl bg-[#fcf9f4] rounded-3xl overflow-hidden botanical-shadow-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-[#13241c]">
              <ImageWithFallback
                src={currentLightboxItem.image}
                alt={currentLightboxItem.title}
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Tutup galeri foto"
                className="absolute top-3 right-3 min-h-[48px] min-w-[48px] rounded-full bg-white/95 text-[#13241c] flex items-center justify-center shadow-md cursor-pointer"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#3b6847]">
                  {currentLightboxItem.category} · Foto {lightboxIndex + 1} dari {filteredItems.length}
                </p>
                <h3 className="text-xl font-extrabold text-[#13241c] mt-0.5">{currentLightboxItem.title}</h3>
                <p className="text-base text-[#404945] mt-1 leading-relaxed">{currentLightboxItem.caption}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length)
                  }
                  aria-label="Foto sebelumnya"
                  className="min-h-[48px] min-w-[48px] px-4 rounded-xl bg-[#f4ebd9] text-[#1b4d3e] font-bold inline-flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % filteredItems.length)}
                  aria-label="Foto berikutnya"
                  className="min-h-[48px] min-w-[48px] px-4 rounded-xl bg-[#1b4d3e] text-white font-bold inline-flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
