import type {
  Destination,
  DestinationCategory,
  GalleryCategory,
  GalleryItem,
  TourPackage,
} from '../data/villageData';

export interface PriceBreakdown {
  subtotal: number;
  discountAmount: number;
  discountRate: number;
  total: number;
  hasGroupDiscount: boolean;
}

export interface BookingInput {
  visitorName: string;
  visitDate: string;
  participants: number;
  packageId: string;
  notes?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    visitorName?: string;
    visitDate?: string;
    participants?: string;
  };
}

export const GROUP_DISCOUNT_THRESHOLD = 6;
export const GROUP_DISCOUNT_RATE = 0.1; // 10% hemat untuk rombongan minimal 6 orang

export function formatRupiah(amount: number): string {
  const safeAmount = Math.max(0, Math.round(amount));
  return `Rp ${safeAmount.toLocaleString('id-ID')}`;
}

export function filterDestinations(
  destinations: Destination[],
  category: DestinationCategory,
  searchQuery = ''
): Destination[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return destinations.filter((item) => {
    const matchesCategory = category === 'Semua' || item.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    const searchable = `${item.name} ${item.shortDesc} ${item.category} ${item.accessibility}`.toLowerCase();
    return searchable.includes(normalizedQuery);
  });
}

export function filterGallery(items: GalleryItem[], category: GalleryCategory): GalleryItem[] {
  if (category === 'Semua') return items;
  return items.filter((item) => item.category === category);
}

export function calculatePackageTotal(pricePerPerson: number, participants: number): PriceBreakdown {
  const safePrice = Math.max(0, pricePerPerson);
  const safeParticipants = Math.max(1, Math.floor(participants));
  const subtotal = safePrice * safeParticipants;
  const hasGroupDiscount = safeParticipants >= GROUP_DISCOUNT_THRESHOLD;
  const discountRate = hasGroupDiscount ? GROUP_DISCOUNT_RATE : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const total = subtotal - discountAmount;

  return {
    subtotal,
    discountAmount,
    discountRate,
    total,
    hasGroupDiscount,
  };
}

export function validateBookingInput(input: BookingInput): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  if (!input.visitorName || input.visitorName.trim().length < 2) {
    errors.visitorName = 'Mohon isi nama lengkap pemesan (minimal 2 huruf).';
  }

  if (!input.visitDate || !/^\d{4}-\d{2}-\d{2}$/.test(input.visitDate)) {
    errors.visitDate = 'Mohon pilih tanggal rencana kunjungan terlebih dahulu.';
  }

  if (!Number.isFinite(input.participants) || input.participants < 1 || input.participants > 100) {
    errors.participants = 'Jumlah peserta harus antara 1 sampai 100 orang.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatBookingWhatsAppMessage(
  selectedPackage: TourPackage,
  input: BookingInput,
  breakdown: PriceBreakdown
): string {
  const lines = [
    'Halo Admin Desa Wisata Lereng Asri,',
    'Saya ingin menanyakan ketersediaan dan memesan paket wisata berikut:',
    '',
    `- Paket: ${selectedPackage.name}`,
    `- Nama Pemesan: ${input.visitorName.trim()}`,
    `- Tanggal Kunjungan: ${input.visitDate}`,
    `- Jumlah Peserta: ${input.participants} orang`,
    `- Estimasi Total: ${formatRupiah(breakdown.total)}${
      breakdown.hasGroupDiscount ? ' (sudah termasuk hemat rombongan 10%)' : ''
    }`,
  ];

  if (input.notes && input.notes.trim().length > 0) {
    lines.push(`- Catatan Tambahan: ${input.notes.trim()}`);
  }

  lines.push('', 'Terima kasih, mohon info kelanjutannya ya.');
  return lines.join('\n');
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${digitsOnly}?text=${encoded}`;
}
