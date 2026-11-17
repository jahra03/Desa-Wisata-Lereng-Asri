import test from 'node:test';
import assert from 'node:assert/strict';
import { DESTINATIONS, GALLERY_ITEMS, TOUR_PACKAGES } from '../data/villageData';
import {
  buildWhatsAppUrl,
  calculatePackageTotal,
  filterDestinations,
  filterGallery,
  formatBookingWhatsAppMessage,
  formatRupiah,
  validateBookingInput,
} from './tourismLogic';

test('formatRupiah formats Indonesian currency accurately', () => {
  assert.equal(formatRupiah(95000), 'Rp 95.000');
  assert.equal(formatRupiah(420000), 'Rp 420.000');
  assert.equal(formatRupiah(-500), 'Rp 0');
});

test('filterDestinations filters by category and search query', () => {
  const all = filterDestinations(DESTINATIONS, 'Semua');
  assert.equal(all.length, DESTINATIONS.length);

  const nature = filterDestinations(DESTINATIONS, 'Alam & Air');
  assert.equal(nature.length, 2);
  assert.ok(nature.every((d) => d.category === 'Alam & Air'));

  const searched = filterDestinations(DESTINATIONS, 'Semua', 'ecoprint');
  assert.equal(searched.length, 1);
  assert.equal(searched[0].id, 'sanggar-ecoprint');
});

test('filterGallery returns items matching category', () => {
  const all = filterGallery(GALLERY_ITEMS, 'Semua');
  assert.equal(all.length, GALLERY_ITEMS.length);

  const naturePhotos = filterGallery(GALLERY_ITEMS, 'Pesona Alam');
  assert.equal(naturePhotos.length, 3);
  assert.ok(naturePhotos.every((g) => g.category === 'Pesona Alam'));
});

test('calculatePackageTotal applies 10% group discount at 6 or more people', () => {
  const smallGroup = calculatePackageTotal(100000, 4);
  assert.equal(smallGroup.subtotal, 400000);
  assert.equal(smallGroup.discountAmount, 0);
  assert.equal(smallGroup.total, 400000);
  assert.equal(smallGroup.hasGroupDiscount, false);

  const largeGroup = calculatePackageTotal(100000, 6);
  assert.equal(largeGroup.subtotal, 600000);
  assert.equal(largeGroup.discountAmount, 60000);
  assert.equal(largeGroup.total, 540000);
  assert.equal(largeGroup.hasGroupDiscount, true);
});

test('validateBookingInput rejects missing name or date and accepts valid data', () => {
  const invalid = validateBookingInput({
    visitorName: '',
    visitDate: '',
    participants: 0,
    packageId: 'paket-pagi',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.visitorName);
  assert.ok(invalid.errors.visitDate);
  assert.ok(invalid.errors.participants);

  const valid = validateBookingInput({
    visitorName: 'Budi Santoso',
    visitDate: '2026-12-20',
    participants: 4,
    packageId: 'paket-sehari',
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});

test('formatBookingWhatsAppMessage and buildWhatsAppUrl construct valid WhatsApp link', () => {
  const pkg = TOUR_PACKAGES[1];
  const breakdown = calculatePackageTotal(pkg.pricePerPerson, 6);
  const message = formatBookingWhatsAppMessage(
    pkg,
    {
      visitorName: 'Siti Aminah',
      visitDate: '2026-12-24',
      participants: 6,
      packageId: pkg.id,
      notes: 'Membawa 2 anak kecil',
    },
    breakdown
  );

  assert.match(message, /Siti Aminah/);
  assert.match(message, /6 orang/);
  assert.match(message, /hemat rombongan 10%/);
  assert.match(message, /Membawa 2 anak kecil/);

  const url = buildWhatsAppUrl('+62 812-3456-7890', message);
  assert.ok(url.startsWith('https://wa.me/6281234567890?text='));
  assert.ok(url.includes(encodeURIComponent('Siti Aminah')));
});
