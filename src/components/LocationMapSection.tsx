import { useState } from 'react';
import { Car, ExternalLink, Footprints, MapPin, MessageCircle, Mountain, Navigation } from 'lucide-react';
import { MAP_LANDMARKS, VILLAGE_CONTACT, type MapLandmark } from '../data/villageData';
import { buildWhatsAppUrl } from '../utils/tourismLogic';

export function LocationMapSection() {
  const [activePinId, setActivePinId] = useState<string>(MAP_LANDMARKS[0].id);
  const activeLandmark: MapLandmark =
    MAP_LANDMARKS.find((pin) => pin.id === activePinId) ?? MAP_LANDMARKS[0];

  const waRouteUrl = buildWhatsAppUrl(
    VILLAGE_CONTACT.whatsappNumber,
    'Halo Admin Desa Wisata Lereng Asri, mohon kirimkan share-loc dan panduan rute menuju lokasi desa.'
  );

  return (
    <section id="lokasi" className="py-10 md:py-14 bg-[#f6f3ee] border-t border-[#e8e0d2]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="max-w-2xl mb-8">
          <p className="text-sm font-bold text-[#3b6847] mb-1">Denah Kawasan & Petunjuk Arah</p>
          <h2 className="text-2xl sm:text-[32px] font-bold text-[#13241c] leading-tight tracking-tight text-balance">
            Peta Lokasi Desa Wisata
          </h2>
          <p className="text-base text-[#404945] mt-2 leading-relaxed">
            Ketuk titik lokasi di peta untuk melihat jarak jalan kaki, ketinggian, dan fasilitas yang tersedia di setiap area.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Interactive Topographic Village Map */}
          <div className="lg:col-span-7 bg-white border border-[#e8e0d2] rounded-2xl p-4 sm:p-5 botanical-shadow flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-sm font-bold text-[#1b4d3e]">Denah Jalan Setapak & Spot Wisata</span>
              <span className="text-xs font-semibold text-[#404945]">Ketuk pin untuk detail titik</span>
            </div>

            <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-[#e7efe6] border border-[#d6e3d5]">
              {/* Illustrated Topographic Background SVG */}
              <svg
                viewBox="0 0 800 500"
                className="w-full h-full block"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid slice"
              >
                <rect width="800" height="500" fill="#e7efe6" />
                {/* Mountain & contour ridges */}
                <path
                  d="M0,180 Q220,90 420,150 T800,120 L800,0 L0,0 Z"
                  fill="#d2e4d3"
                />
                <path
                  d="M0,250 Q260,160 480,210 T800,180 L800,0 L0,0 Z"
                  fill="#dcebd9"
                  opacity="0.7"
                />
                {/* Tea plantation terraces */}
                <path
                  d="M420,110 Q540,95 660,135"
                  fill="none"
                  stroke="#9fc2a1"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M440,135 Q555,120 680,160"
                  fill="none"
                  stroke="#9fc2a1"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Mountain river / stream */}
                <path
                  d="M720,40 C690,140 650,210 660,260 C675,330 610,410 580,500"
                  fill="none"
                  stroke="#82bdd6"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                {/* Main stone village walking trail */}
                <path
                  d="M144,360 C230,335 260,305 304,290 C360,272 395,335 432,340 C485,345 480,220 512,160 C550,145 610,185 656,220"
                  fill="none"
                  stroke="#d97736"
                  strokeWidth="5"
                  strokeDasharray="10 8"
                  strokeLinecap="round"
                />
                {/* Compass North label */}
                <g transform="translate(740, 45)">
                  <circle cx="0" cy="0" r="18" fill="#ffffff" fillOpacity="0.9" />
                  <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    fill="#1b4d3e"
                    fontSize="13"
                    fontWeight="800"
                  >
                    U
                  </text>
                </g>
              </svg>

              {/* Interactive Accessible Landmark Pin Buttons */}
              {MAP_LANDMARKS.map((pin, index) => {
                const isActive = pin.id === activePinId;
                return (
                  <button
                    key={pin.id}
                    type="button"
                    onClick={() => setActivePinId(pin.id)}
                    aria-pressed={isActive}
                    aria-label={`Pilih lokasi ${pin.name}`}
                    style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 min-h-[48px] min-w-[48px] px-2.5 py-1.5 rounded-full font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-md transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13241c] ${
                      isActive
                        ? 'bg-[#d97736] text-white scale-105 z-20 ring-4 ring-white'
                        : 'bg-[#1b4d3e] text-white hover:bg-[#003629] z-10'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs tabular-nums">
                      {index + 1}
                    </span>
                    <span className="hidden sm:inline whitespace-nowrap">
                      {pin.name.split(' ')[0]} {pin.name.split(' ')[1] ?? ''}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Pin Selector List for Easy Mobile Tapping */}
            <div className="mt-4 flex flex-wrap gap-2">
              {MAP_LANDMARKS.map((pin, index) => {
                const isActive = pin.id === activePinId;
                return (
                  <button
                    key={pin.id}
                    type="button"
                    onClick={() => setActivePinId(pin.id)}
                    aria-pressed={isActive}
                    className={`min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-semibold cursor-pointer ${
                      isActive
                        ? 'bg-[#1b4d3e] text-white'
                        : 'bg-[#f4ebd9] text-[#1b4d3e] hover:bg-[#e8dcc4]'
                    }`}
                  >
                    {index + 1}. {pin.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Pin Detail + Directions Card */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div
              data-testid="active-landmark-card"
              className="bg-white border border-[#e8e0d2] rounded-2xl p-5 sm:p-6 botanical-shadow flex-1"
            >
              <p className="text-sm font-bold text-[#3b6847] mb-1">
                {activeLandmark.type} · {activeLandmark.elevation}
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#13241c] mb-2">
                {activeLandmark.name}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-[#1b4d3e] mb-4">
                <span className="inline-flex items-center gap-1.5">
                  <Footprints className="w-4 h-4" aria-hidden="true" />
                  <span>{activeLandmark.walkTime}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mountain className="w-4 h-4" aria-hidden="true" />
                  <span className="tabular-nums">{activeLandmark.elevation}</span>
                </span>
              </div>

              <p className="text-base text-[#404945] leading-relaxed mb-4">{activeLandmark.description}</p>

              <div className="pt-3 border-t border-[#f0ede9]">
                <p className="text-sm font-bold text-[#13241c] mb-1.5">Fasilitas di titik ini:</p>
                <p className="text-sm sm:text-base text-[#404945]">{activeLandmark.facilities.join(' · ')}</p>
              </div>
            </div>

            <div className="bg-white border border-[#e8e0d2] rounded-2xl p-5 sm:p-6 botanical-shadow">
              <div className="flex items-start gap-3 mb-4">
                <Car className="w-6 h-6 text-[#1b4d3e] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="text-lg font-bold text-[#13241c]">Akses Jalan & Alamat</h4>
                  <p className="text-sm sm:text-base text-[#404945] mt-1 leading-relaxed">
                    {VILLAGE_CONTACT.address}. Jalan beraspal baik, dapat dilalui sepeda motor, mobil keluarga,
                    hingga minibus elf dengan area parkir luas.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={VILLAGE_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[52px] px-5 py-3 bg-[#1b4d3e] hover:bg-[#003629] text-white rounded-xl font-bold text-base inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation className="w-5 h-5" aria-hidden="true" />
                  <span>Buka Lokasi di Google Maps</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={waRouteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[52px] px-5 py-3 bg-[#f4ebd9] hover:bg-[#e8dcc4] text-[#1b4d3e] rounded-xl font-bold text-base inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>Minta Share-Loc via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
