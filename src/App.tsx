import { useState } from 'react';
import { ArrowLeft, Compass } from 'lucide-react';
import { LocationCard } from './components/LocationCard';
import { LocationDetail } from './components/LocationDetail';
import { LABUAN_LOCATIONS } from './data/locations';

export default function App() {
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [customImages, setCustomImages] = useState<
    Record<string, (string | undefined)[]>
  >({});

  const selectedLocation = selectedLocationId
    ? LABUAN_LOCATIONS.find((item) => item.id === selectedLocationId) ?? null
    : null;

  const handleSelectLocation = (locationId: string) => {
    setSelectedLocationId(locationId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackHome = () => {
    setSelectedLocationId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageChange = (
    locationId: string,
    slotIndex: number,
    dataUrl: string | undefined
  ) => {
    setCustomImages((prev) => {
      const existing = prev[locationId]
        ? [...prev[locationId]]
        : [undefined, undefined, undefined, undefined, undefined];
      existing[slotIndex] = dataUrl;
      return {
        ...prev,
        [locationId]: existing,
      };
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F7FA] text-[#0B2545]">
      <header className="sticky top-0 z-30 h-14 bg-gradient-to-r from-[#0B2545] via-[#0E4A7B] to-[#087F8C] text-white shadow-sm">
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <button
            type="button"
            onClick={handleBackHome}
            className="flex min-h-[44px] items-center gap-2.5 rounded-lg px-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDE68A]"
          >
            <Compass className="h-5 w-5 shrink-0 text-[#FCD34D]" aria-hidden="true" />
            <span className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap">
              Poket Pemandu Labuan
            </span>
          </button>

          {selectedLocation ? (
            <button
              type="button"
              onClick={handleBackHome}
              className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-bold text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDE68A]"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">Kembali</span>
            </button>
          ) : (
            <span className="shrink-0 whitespace-nowrap text-sm font-semibold text-[#CCFBF1] tabular-nums">
              {LABUAN_LOCATIONS.length} Lokasi
            </span>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-9">
        {selectedLocation ? (
          <LocationDetail
            key={selectedLocation.id}
            location={selectedLocation}
            customImageUrls={customImages[selectedLocation.id]}
            onImageChange={handleImageChange}
            onBack={handleBackHome}
          />
        ) : (
          <div>
            <section className="mb-7 rounded-2xl bg-gradient-to-br from-[#0B2545] via-[#0E4A7B] to-[#0D9488] p-6 text-white shadow-md sm:mb-9 sm:p-8">
              <p className="text-sm font-bold tracking-wide text-[#FDE68A]">
                Panduan Pelancongan Labuan · Sesi 2
              </p>
              <h1 className="mt-1.5 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Rujukan Pantas &amp; Latihan Ingatan Destinasi
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#E0F2FE] sm:text-lg">
                Ketik mana-mana kad lokasi untuk membuka fakta penting, cerita 60 saat
                lima langkah, kata kunci ingatan dan kuiz ringkas.
              </p>
            </section>

            <section aria-label="Senarai destinasi Labuan">
              <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
                {LABUAN_LOCATIONS.map((location) => (
                  <LocationCard
                    key={location.id}
                    location={location}
                    imageUrls={customImages[location.id]}
                    onSelect={handleSelectLocation}
                  />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <footer className="border-t border-[#CBD8E4] bg-white">
        <div className="mx-auto max-w-5xl px-4 py-5 text-sm font-medium text-[#334E68] sm:px-6">
          Poket Pemandu Labuan · Semua nota disimpan terus dalam aplikasi untuk capaian pantas.
        </div>
      </footer>
    </div>
  );
}
