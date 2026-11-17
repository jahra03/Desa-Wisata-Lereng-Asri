import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { VILLAGE_CONTACT } from '../data/villageData';
import { buildWhatsAppUrl } from '../utils/tourismLogic';
import type { NavSectionId } from './Navbar';

interface FooterProps {
  onNavigate: (section: NavSectionId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const waFooterUrl = buildWhatsAppUrl(
    VILLAGE_CONTACT.whatsappNumber,
    'Halo Admin Desa Wisata Lereng Asri, saya ingin menanyakan info wisata.'
  );

  return (
    <footer className="bg-[#1b4d3e] text-[#f3f0eb] pt-12 pb-28 md:pb-12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/15">
          <div className="md:col-span-5">
            <h2 className="text-2xl font-extrabold text-white mb-3">{VILLAGE_CONTACT.name}</h2>
            <p className="text-base text-[#d5e5dd] leading-relaxed mb-4">
              Dikelola langsung oleh kelompok sadar wisata dan warga setempat untuk menghadirkan liburan alam
              yang tenang, bersih, dan hangat bagi setiap tamu.
            </p>
            <p className="text-sm text-[#baeed9] font-semibold">{VILLAGE_CONTACT.openHours}</p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-base font-bold text-white mb-3">Menu Halaman</h3>
            <ul className="space-y-2 text-base">
              {(
                [
                  ['beranda', 'Beranda Utama'],
                  ['destinasi', 'Daftar Destinasi'],
                  ['paket', 'Paket Wisata & Harga'],
                  ['galeri', 'Galeri Foto'],
                  ['lokasi', 'Peta Lokasi'],
                ] as [NavSectionId, string][]
              ).map(([id, label]) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(id)}
                    className="text-[#d5e5dd] hover:text-white underline-offset-4 hover:underline py-1 cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-base font-bold text-white mb-3">Kontak & Pemesanan Cepat</h3>
            <div className="space-y-3 text-base text-[#d5e5dd] mb-5">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#baeed9] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{VILLAGE_CONTACT.address}</span>
              </p>
              <p className="flex items-center gap-2.5 tabular-nums">
                <Phone className="w-5 h-5 text-[#baeed9] shrink-0" aria-hidden="true" />
                <span>WhatsApp Admin: {VILLAGE_CONTACT.displayPhone}</span>
              </p>
            </div>

            <a
              href={waFooterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[52px] px-6 py-3 bg-[#d97736] hover:bg-[#b85d22] text-white rounded-xl font-bold text-base inline-flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              <span>Hubungi via WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-[#d5e5dd]">
          <p>© 2026 Desa Wisata Lereng Asri. Pariwisata Berbasis Masyarakat.</p>
          <p>Ramah Keluarga · Wisata Alam & Budaya</p>
        </div>
      </div>
    </footer>
  );
}
