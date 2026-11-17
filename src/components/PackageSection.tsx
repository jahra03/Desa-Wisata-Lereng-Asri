import { useState, type FormEvent } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
  Minus,
  Plus,
  Quote,
  Users,
} from 'lucide-react';
import {
  TESTIMONIALS,
  TOUR_PACKAGES,
  VILLAGE_CONTACT,
  type TourPackage,
} from '../data/villageData';
import {
  buildWhatsAppUrl,
  calculatePackageTotal,
  formatBookingWhatsAppMessage,
  formatRupiah,
  validateBookingInput,
  type ValidationResult,
} from '../utils/tourismLogic';
import { ImageWithFallback } from './ImageWithFallback';

function getTomorrowIsoDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toISOString().split('T')[0];
}

export function PackageSection() {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(TOUR_PACKAGES[1].id);
  const [visitorName, setVisitorName] = useState('');
  const [visitDate, setVisitDate] = useState(getTomorrowIsoDate);
  const [participants, setParticipants] = useState(2);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<ValidationResult['errors']>({});
  const [readyMessage, setReadyMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedPackage: TourPackage =
    TOUR_PACKAGES.find((p) => p.id === selectedPackageId) ?? TOUR_PACKAGES[0];
  const breakdown = calculatePackageTotal(selectedPackage.pricePerPerson, participants);

  const handleSelectPackage = (pkg: TourPackage) => {
    setSelectedPackageId(pkg.id);
    setReadyMessage(null);
    const formEl = document.getElementById('form-pesan-paket');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAdjustParticipants = (delta: number) => {
    setParticipants((prev) => Math.max(1, Math.min(100, prev + delta)));
    setReadyMessage(null);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validation = validateBookingInput({
      visitorName,
      visitDate,
      participants,
      packageId: selectedPackage.id,
      notes,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setReadyMessage(null);
      return;
    }

    setErrors({});
    const formatted = formatBookingWhatsAppMessage(
      selectedPackage,
      {
        visitorName,
        visitDate,
        participants,
        packageId: selectedPackage.id,
        notes,
      },
      breakdown
    );
    setReadyMessage(formatted);
    setCopied(false);
  };

  const handleCopyMessage = async () => {
    if (!readyMessage) return;
    try {
      await navigator.clipboard.writeText(readyMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  };

  const whatsappUrl = readyMessage
    ? buildWhatsAppUrl(VILLAGE_CONTACT.whatsappNumber, readyMessage)
    : buildWhatsAppUrl(
        VILLAGE_CONTACT.whatsappNumber,
        `Halo Admin Desa Wisata Lereng Asri, saya tertarik dengan ${selectedPackage.name}.`
      );

  return (
    <section id="paket" className="py-10 md:py-14 bg-[#f6f3ee] border-y border-[#e8e0d2]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="max-w-2xl mb-8">
          <p className="text-sm font-bold text-[#3b6847] mb-1">Harga Transparan & Tanpa Biaya Tersembunyi</p>
          <h2 className="text-2xl sm:text-[32px] font-bold text-[#13241c] leading-tight tracking-tight text-balance">
            Paket Wisata & Harga
          </h2>
          <p className="text-base text-[#404945] mt-2 leading-relaxed">
            Pilih paket sesuai waktu liburan Anda. Rombongan keluarga atau kantor minimal 6 orang otomatis
            mendapatkan <span className="font-bold text-[#1b4d3e]">hemat 10%</span>.
          </p>
        </div>

        {/* 3-Column Tour Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-10">
          {TOUR_PACKAGES.map((pkg) => {
            const isSelected = pkg.id === selectedPackageId;
            return (
              <article
                key={pkg.id}
                className={`bg-white rounded-2xl overflow-hidden flex flex-col transition-shadow ${
                  isSelected
                    ? 'border-2 border-[#1b4d3e] botanical-shadow'
                    : 'border border-[#e8e0d2] botanical-shadow'
                }`}
              >
                <div className="aspect-[16/10] w-full bg-[#f0ede9] overflow-hidden">
                  <ImageWithFallback src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <p className="text-sm font-semibold text-[#3b6847] mb-1">
                    {pkg.duration}
                    {pkg.isPopular ? ' · Paling Diminati' : ''}
                  </p>
                  <h3 className="text-xl font-bold text-[#13241c] leading-snug">{pkg.name}</h3>
                  <p className="text-sm sm:text-base text-[#404945] mt-1 mb-4">{pkg.subtitle}</p>

                  <div className="py-3 px-4 rounded-xl bg-[#fcf9f4] border border-[#e8e0d2] mb-5">
                    <p className="text-xs font-semibold text-[#404945]">Biaya Paket</p>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-2xl font-extrabold text-[#b85d22] tabular-nums">
                        {formatRupiah(pkg.pricePerPerson)}
                      </span>
                      <span className="text-sm font-medium text-[#404945]">/ orang</span>
                    </div>
                  </div>

                  <div className="mb-6 flex-1">
                    <p className="text-sm font-bold text-[#13241c] mb-2.5">Sudah termasuk:</p>
                    <ul className="space-y-2">
                      {pkg.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2.5 text-sm sm:text-base text-[#13241c]">
                          <Check className="w-5 h-5 text-[#1b4d3e] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectPackage(pkg)}
                    aria-pressed={isSelected}
                    className={`w-full min-h-[52px] px-5 py-3 rounded-xl font-bold text-base inline-flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4d3e] ${
                      isSelected
                        ? 'bg-[#1b4d3e] text-white'
                        : 'bg-[#f4ebd9] hover:bg-[#1b4d3e] text-[#1b4d3e] hover:text-white'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-5 h-5" aria-hidden="true" />
                        <span>Paket Dipilih</span>
                      </>
                    ) : (
                      <span>Pilih Paket Ini</span>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Interactive Package Estimator & Direct WhatsApp Booking Form */}
        <div
          id="form-pesan-paket"
          className="bg-white border border-[#e8e0d2] rounded-2xl p-5 sm:p-8 botanical-shadow mb-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form onSubmit={handleSubmit} noValidate className="lg:col-span-7 flex flex-col space-y-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#13241c]">
                  Hitung Estimasi & Pesan via WhatsApp
                </h3>
                <p className="text-base text-[#404945] mt-1">
                  Isi data singkat di bawah ini, lalu kirim pesan pemesanan langsung ke admin desa tanpa perlu registrasi akun.
                </p>
              </div>

              <div>
                <span className="block text-sm font-bold text-[#13241c] mb-2">Paket yang Dipilih</span>
                <div className="flex flex-wrap gap-2">
                  {TOUR_PACKAGES.map((pkg) => {
                    const active = pkg.id === selectedPackage.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => {
                          setSelectedPackageId(pkg.id);
                          setReadyMessage(null);
                        }}
                        aria-pressed={active}
                        className={`min-h-[48px] px-4 py-2 rounded-xl text-sm sm:text-base font-semibold transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#1b4d3e] text-white'
                            : 'bg-[#f4ebd9] text-[#1b4d3e] hover:bg-[#e8dcc4]'
                        }`}
                      >
                        {pkg.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nama-pemesan" className="block text-sm font-bold text-[#13241c] mb-1.5">
                    Nama Lengkap Pemesan
                  </label>
                  <input
                    id="nama-pemesan"
                    type="text"
                    value={visitorName}
                    onChange={(e) => {
                      setVisitorName(e.target.value);
                      if (errors.visitorName) setErrors((prev) => ({ ...prev, visitorName: undefined }));
                    }}
                    placeholder="Contoh: Ibu Dewi Lestari"
                    aria-invalid={Boolean(errors.visitorName)}
                    className={`w-full min-h-[52px] px-4 py-3 bg-[#fcf9f4] border rounded-xl text-base text-[#13241c] placeholder:text-[#707974] focus:outline-2 focus:outline-[#4e7c59] ${
                      errors.visitorName ? 'border-[#ba1a1a]' : 'border-[#e8e0d2]'
                    }`}
                  />
                  {errors.visitorName && (
                    <p role="alert" className="text-sm font-semibold text-[#ba1a1a] mt-1.5">
                      {errors.visitorName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="tanggal-kunjungan" className="block text-sm font-bold text-[#13241c] mb-1.5">
                    Tanggal Rencana Berkunjung
                  </label>
                  <input
                    id="tanggal-kunjungan"
                    type="date"
                    value={visitDate}
                    onChange={(e) => {
                      setVisitDate(e.target.value);
                      if (errors.visitDate) setErrors((prev) => ({ ...prev, visitDate: undefined }));
                    }}
                    aria-invalid={Boolean(errors.visitDate)}
                    className={`w-full min-h-[52px] px-4 py-3 bg-[#fcf9f4] border rounded-xl text-base text-[#13241c] focus:outline-2 focus:outline-[#4e7c59] ${
                      errors.visitDate ? 'border-[#ba1a1a]' : 'border-[#e8e0d2]'
                    }`}
                  />
                  {errors.visitDate && (
                    <p role="alert" className="text-sm font-semibold text-[#ba1a1a] mt-1.5">
                      {errors.visitDate}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <span className="block text-sm font-bold text-[#13241c] mb-1.5">Jumlah Peserta</span>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="inline-flex items-center border border-[#e8e0d2] rounded-xl bg-[#fcf9f4] p-1">
                    <button
                      type="button"
                      onClick={() => handleAdjustParticipants(-1)}
                      aria-label="Kurangi jumlah peserta"
                      className="min-h-[48px] min-w-[48px] rounded-lg hover:bg-[#f4ebd9] text-[#1b4d3e] flex items-center justify-center cursor-pointer"
                    >
                      <Minus className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <span
                      data-testid="participant-count"
                      className="px-5 text-lg font-extrabold text-[#13241c] tabular-nums"
                    >
                      {participants} orang
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAdjustParticipants(1)}
                      aria-label="Tambah jumlah peserta"
                      className="min-h-[48px] min-w-[48px] rounded-lg hover:bg-[#f4ebd9] text-[#1b4d3e] flex items-center justify-center cursor-pointer"
                    >
                      <Plus className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>

                  <p className="text-sm font-semibold text-[#3b6847] inline-flex items-center gap-1.5">
                    <Users className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>
                      {breakdown.hasGroupDiscount
                        ? 'Diskon rombongan 10% aktif!'
                        : 'Tambah hingga 6 orang untuk hemat 10%'}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="catatan-tambahan" className="block text-sm font-bold text-[#13241c] mb-1.5">
                  Catatan Tambahan (Opsional)
                </label>
                <input
                  id="catatan-tambahan"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Bawa anak usia 5 tahun / minta makan tidak pedas"
                  className="w-full min-h-[52px] px-4 py-3 bg-[#fcf9f4] border border-[#e8e0d2] rounded-xl text-base text-[#13241c] placeholder:text-[#707974] focus:outline-2 focus:outline-[#4e7c59]"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[56px] px-6 py-3.5 bg-[#d97736] hover:bg-[#b85d22] text-white rounded-xl font-bold text-base sm:text-lg inline-flex items-center justify-center gap-2.5 transition-transform active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d97736]"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Siapkan Pesan WhatsApp</span>
              </button>
            </form>

            {/* Right Column: Live Price Summary & WhatsApp Action Panel */}
            <div className="lg:col-span-5 bg-[#fcf9f4] border border-[#e8e0d2] rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <p className="text-sm font-bold text-[#3b6847] mb-1">Ringkasan Estimasi Biaya</p>
                <h4 className="text-xl font-extrabold text-[#13241c] mb-4">{selectedPackage.name}</h4>

                <dl className="space-y-3 text-base border-b border-[#e8e0d2] pb-4 mb-4">
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-[#404945]">Harga per orang</dt>
                    <dd className="font-bold text-[#13241c] tabular-nums">
                      {formatRupiah(selectedPackage.pricePerPerson)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-[#404945]">Subtotal ({participants} orang)</dt>
                    <dd className="font-bold text-[#13241c] tabular-nums">{formatRupiah(breakdown.subtotal)}</dd>
                  </div>
                  {breakdown.hasGroupDiscount && (
                    <div className="flex items-center justify-between gap-2 text-[#1b4d3e]">
                      <dt className="font-semibold">Hemat Rombongan (10%)</dt>
                      <dd className="font-bold tabular-nums">- {formatRupiah(breakdown.discountAmount)}</dd>
                    </div>
                  )}
                </dl>

                <div className="flex items-baseline justify-between gap-2 mb-5">
                  <span className="text-base font-bold text-[#13241c]">Estimasi Total</span>
                  <span
                    data-testid="booking-total"
                    className="text-2xl sm:text-[28px] font-extrabold text-[#b85d22] tabular-nums"
                  >
                    {formatRupiah(breakdown.total)}
                  </span>
                </div>

                <div className="mb-5">
                  <p className="text-sm font-bold text-[#13241c] mb-2">Alur Kegiatan Singkat:</p>
                  <ul className="space-y-1.5 text-sm text-[#404945]">
                    {selectedPackage.itinerary.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {readyMessage ? (
                <div
                  data-testid="whatsapp-ready-box"
                  className="bg-white border-2 border-[#1b4d3e] rounded-2xl p-4 space-y-3"
                >
                  <p className="text-sm font-bold text-[#1b4d3e]">
                    Pesan Pemesanan Siap Dikirim!
                  </p>
                  <pre className="whitespace-pre-wrap font-sans text-sm text-[#13241c] bg-[#f6f3ee] p-3 rounded-xl leading-relaxed">
                    {readyMessage}
                  </pre>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[52px] px-5 py-3 bg-[#1b4d3e] hover:bg-[#003629] text-white rounded-xl font-bold text-base inline-flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" aria-hidden="true" />
                      <span>Kirim ke WhatsApp Sekarang</span>
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="w-full min-h-[48px] px-4 py-2.5 bg-[#f4ebd9] text-[#1b4d3e] rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      <span>{copied ? 'Pesan Berhasil Disalin!' : 'Salin Teks Pesan'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#f4ebd9]/70 rounded-xl p-4 text-sm text-[#13241c]">
                  Pembayaran dilakukan langsung saat tiba di loket desa atau setelah konfirmasi jadwal dengan
                  admin kami di nomor <span className="font-bold">{VILLAGE_CONTACT.displayPhone}</span>.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Adjacent Social Proof Testimonials */}
        <div>
          <h3 className="text-xl font-bold text-[#13241c] mb-4">Cerita Pengunjung yang Sudah Berkunjung</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TESTIMONIALS.map((item) => (
              <blockquote
                key={item.id}
                className="bg-white border border-[#e8e0d2] rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <Quote className="w-6 h-6 text-[#4e7c59] shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-base text-[#13241c] leading-relaxed">“{item.quote}”</p>
                </div>
                <footer className="text-sm text-[#404945] pl-9">
                  <span className="font-bold text-[#13241c]">{item.visitorName}</span> · {item.origin} ·{' '}
                  {item.packageName} ({item.visitDate})
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
