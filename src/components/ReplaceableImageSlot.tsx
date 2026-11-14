import { useState, type ChangeEvent } from 'react';
import { Image as ImageIcon, RotateCcw, Upload } from 'lucide-react';
import type { AccentTheme } from '../types/location';
import { ACCENT_PALETTES } from '../utils/accentTheme';

interface ReplaceableImageSlotProps {
  label: string;
  slotNumber?: number;
  imageUrl?: string;
  accentTheme?: AccentTheme;
  allowReplace?: boolean;
  onImageChange?: (dataUrl: string | undefined) => void;
}

export function ReplaceableImageSlot({
  label,
  slotNumber,
  imageUrl,
  accentTheme = 'teal',
  allowReplace = false,
  onImageChange,
}: ReplaceableImageSlotProps) {
  const [hasError, setHasError] = useState(false);
  const palette = ACCENT_PALETTES[accentTheme];

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onImageChange) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setHasError(false);
        onImageChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const showImage = Boolean(imageUrl) && !hasError;
  const slotPrefix = slotNumber ? `Gambar ${slotNumber}` : 'Gambar';

  return (
    <div className="w-full">
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border ${palette.slotBorder} bg-gradient-to-br ${palette.slotGradient}`}
      >
        {showImage ? (
          <img
            src={imageUrl}
            alt={`${slotPrefix} lokasi ${label}`}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-5 text-center">
            <div
              className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl border shadow-xs ${palette.slotIconBg} ${palette.slotIconColor}`}
            >
              <ImageIcon className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="text-base font-bold text-[#0B2545] sm:text-lg">
              Ruang {slotPrefix}: {label}
            </p>
            <p className="mt-1 text-sm font-medium text-[#334E68] sm:text-base">
              Gambar belum dibekalkan — ruang ini boleh diganti
            </p>
          </div>
        )}
      </div>

      {allowReplace && onImageChange && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label
            className={`inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r px-4 py-3 text-base font-bold text-white shadow-xs transition-all focus-within:ring-2 focus-within:ring-[#0284C7] focus-within:ring-offset-2 ${palette.buttonGradient}`}
          >
            <Upload className="h-5 w-5" aria-hidden="true" />
            <span>
              {showImage
                ? `Tukar ${slotPrefix.toLowerCase()}`
                : `Ganti ${slotPrefix.toLowerCase()} dari peranti`}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>

          {showImage && (
            <button
              type="button"
              onClick={() => {
                setHasError(false);
                onImageChange(undefined);
              }}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-[#CBD8E4] bg-white px-4 py-3 text-base font-semibold text-[#334E68] transition-colors hover:bg-[#F2F7FA] hover:text-[#0B2545] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
            >
              <RotateCcw className="h-5 w-5" aria-hidden="true" />
              <span>Guna ruang berlabel asal</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
