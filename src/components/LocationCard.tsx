import { AlertCircle, CheckCircle2, ChevronRight, Image as ImageIcon } from 'lucide-react';
import type { LocationItem } from '../types/location';
import { ACCENT_PALETTES } from '../utils/accentTheme';
import { ReplaceableImageSlot } from './ReplaceableImageSlot';

interface LocationCardProps {
  location: LocationItem;
  imageUrls?: (string | undefined)[];
  onSelect: (locationId: string) => void;
}

export function LocationCard({ location, imageUrls = [], onSelect }: LocationCardProps) {
  const slots = [0, 1, 2, 3, 4].map(
    (index) => imageUrls[index] || location.suppliedImageUrls?.[index]
  );
  const filledCount = slots.filter(Boolean).length;
  const palette = ACCENT_PALETTES[location.accentTheme];

  return (
    <button
      type="button"
      onClick={() => onSelect(location.id)}
      className={`group flex w-full flex-col overflow-hidden rounded-2xl border border-[#CBD8E4] bg-white text-left shadow-sm transition-all duration-150 ${palette.hoverBorder} hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:ring-offset-2 active:scale-[0.99]`}
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${palette.topBarGradient}`} />

      <div className="p-3 pb-0">
        <ReplaceableImageSlot
          label={location.imageLabel}
          slotNumber={1}
          imageUrl={slots[0]}
          accentTheme={location.accentTheme}
        />

        <div
          aria-label="Pratonton ruang gambar 2 hingga 5"
          className="mt-2 grid grid-cols-4 gap-2"
        >
          {[1, 2, 3, 4].map((slotIdx) => {
            const thumb = slots[slotIdx];
            return (
              <div
                key={slotIdx}
                className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border ${palette.slotBorder} bg-gradient-to-br ${palette.slotGradient}`}
              >
                {thumb ? (
                  <img
                    src={thumb}
                    alt={`Gambar ${slotIdx + 1} ${location.name}`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className={`flex flex-col items-center justify-center gap-0.5 ${palette.slotIconColor}`}
                  >
                    <ImageIcon className="h-4 w-4" aria-hidden="true" />
                    <span className="text-xs font-bold tabular-nums">
                      #{slotIdx + 1}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          {location.verificationState === 'verified' ? (
            <>
              <CheckCircle2
                className="h-4 w-4 shrink-0 text-[#059669]"
                aria-hidden="true"
              />
              <span className="text-[#047857]">{location.statusLabel}</span>
              <span className="text-[#94A8BA]" aria-hidden="true">
                ·
              </span>
              <span className="tabular-nums text-[#334E68]">
                {location.facts.length} fakta
              </span>
            </>
          ) : location.verificationState === 'partial' ? (
            <>
              <AlertCircle
                className="h-4 w-4 shrink-0 text-[#D97706]"
                aria-hidden="true"
              />
              <span className="text-[#B45309]">{location.statusLabel}</span>
              <span className="text-[#94A8BA]" aria-hidden="true">
                ·
              </span>
              <span className="tabular-nums text-[#334E68]">
                {location.facts.length} fakta
              </span>
            </>
          ) : (
            <>
              <AlertCircle
                className="h-4 w-4 shrink-0 text-[#D97706]"
                aria-hidden="true"
              />
              <span className="text-[#B45309]">{location.statusLabel}</span>
            </>
          )}
          <span className="text-[#94A8BA]" aria-hidden="true">
            ·
          </span>
          <span className="tabular-nums text-[#334E68]">
            {filledCount}/5 gambar
          </span>
        </div>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0B2545] sm:text-[26px]">
          {location.name}
        </h2>

        <p className="mt-2 flex-1 text-base leading-relaxed text-[#334E68] sm:text-lg">
          {location.cardSummary}
        </p>

        <div
          className={`mt-5 flex min-h-[48px] items-center justify-between border-t border-[#E8EFF5] pt-4 text-lg font-bold ${palette.actionText}`}
        >
          <span className="whitespace-nowrap">Buka nota lokasi</span>
          <ChevronRight
            className="h-6 w-6 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      </div>
    </button>
  );
}
