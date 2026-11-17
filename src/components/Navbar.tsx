import { Compass, Home, Image as ImageIcon, MapPin, MessageCircle, Ticket } from 'lucide-react';
import { VILLAGE_CONTACT } from '../data/villageData';
import { buildWhatsAppUrl } from '../utils/tourismLogic';

export type NavSectionId = 'beranda' | 'destinasi' | 'paket' | 'galeri' | 'lokasi';

interface NavbarProps {
  activeSection: NavSectionId;
  onNavigate: (section: NavSectionId) => void;
}

const DESKTOP_LINKS: { id: NavSectionId; label: string }[] = [
  { id: 'destinasi', label: 'Destinasi' },
  { id: 'paket', label: 'Paket Wisata' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'lokasi', label: 'Peta Lokasi' },
];

const MOBILE_DOCK_TABS: { id: NavSectionId; label: string; Icon: typeof Home }[] = [
  { id: 'beranda', label: 'Beranda', Icon: Home },
  { id: 'destinasi', label: 'Destinasi', Icon: Compass },
  { id: 'paket', label: 'Paket', Icon: Ticket },
  { id: 'galeri', label: 'Galeri', Icon: ImageIcon },
  { id: 'lokasi', label: 'Lokasi', Icon: MapPin },
];

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const quickWaUrl = buildWhatsAppUrl(
    VILLAGE_CONTACT.whatsappNumber,
    'Halo Admin Desa Wisata Lereng Asri, saya ingin bertanya informasi kunjungan dan paket wisata.'
  );

  return (
    <>
      {/* Desktop Sticky Top Bar (Strict 3-Zone Contract) */}
      <header className="hidden md:block sticky top-0 z-40 bg-[#fcf9f4]/95 backdrop-blur-md border-b border-[#e8e0d2]">
        <div className="max-w-[1200px] mx-auto px-8 h-[76px] flex items-center justify-between gap-8">
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('beranda');
            }}
            className="text-xl font-extrabold tracking-tight text-[#1b4d3e] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b4d3e] rounded"
          >
            Desa Lereng Asri
          </a>

          <nav aria-label="Navigasi utama" className="flex items-center gap-7">
            {DESKTOP_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(link.id);
                  }}
                  className={`text-base font-semibold whitespace-nowrap shrink-0 py-2 transition-colors hover:text-[#1b4d3e] hover:underline underline-offset-8 decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b4d3e] rounded ${
                    isActive ? 'text-[#1b4d3e] underline' : 'text-[#404945]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <a
            href={quickWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] px-5 py-2.5 bg-[#1b4d3e] hover:bg-[#003629] text-white rounded-xl font-semibold text-base inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4d3e]"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            <span>Tanya WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Mobile Compact Header (52px height) */}
      <header className="md:hidden sticky top-0 z-40 bg-[#fcf9f4]/95 backdrop-blur-md border-b border-[#e8e0d2]">
        <div className="px-4 h-[52px] flex items-center justify-between gap-4">
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('beranda');
            }}
            className="text-lg font-extrabold tracking-tight text-[#1b4d3e] whitespace-nowrap shrink-0"
          >
            Desa Lereng Asri
          </a>

          <a
            href={quickWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat WhatsApp Desa Wisata Lereng Asri"
            className="min-h-[40px] px-3.5 py-1.5 bg-[#1b4d3e] text-white rounded-lg font-semibold text-sm inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Chat WA</span>
          </a>
        </div>
      </header>

      {/* Mobile Bottom Navigation Dock (64px height, total sticky <= 116px / 13.7% of 844px) */}
      <nav
        aria-label="Navigasi bawah seluler"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-[#fcf9f4]/95 backdrop-blur-md border-t border-[#e8e0d2] rounded-t-3xl botanical-shadow-dock px-2"
      >
        <div className="grid grid-cols-5 h-full items-center">
          {MOBILE_DOCK_TABS.map(({ id, label, Icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                aria-current={isActive ? 'page' : undefined}
                className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 rounded-xl transition-colors ${
                  isActive ? 'text-[#1b4d3e] font-bold' : 'text-[#404945] font-medium hover:text-[#1b4d3e]'
                }`}
              >
                <span
                  className={`px-3 py-1 rounded-full transition-colors ${
                    isActive ? 'bg-[#baeed9]' : 'bg-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="text-[11px] leading-none whitespace-nowrap">{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
