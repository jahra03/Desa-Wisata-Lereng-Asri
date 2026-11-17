import { useEffect, useState } from 'react';
import { DestinationSection } from './components/DestinationSection';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { HeroSection } from './components/HeroSection';
import { LocationMapSection } from './components/LocationMapSection';
import { Navbar, type NavSectionId } from './components/Navbar';
import { PackageSection } from './components/PackageSection';

const SECTION_IDS: NavSectionId[] = ['beranda', 'destinasi', 'paket', 'galeri', 'lokasi'];

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSectionId>('beranda');

  const handleNavigate = (sectionId: NavSectionId) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as NavSectionId;
            if (SECTION_IDS.includes(id)) {
              setActiveSection(id);
            }
          }
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0.05 }
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f4] text-[#13241c]">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="flex-1">
        <HeroSection
          onExplorePackages={() => handleNavigate('paket')}
          onExploreDestinations={() => handleNavigate('destinasi')}
        />
        <DestinationSection />
        <PackageSection />
        <GallerySection />
        <LocationMapSection />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
