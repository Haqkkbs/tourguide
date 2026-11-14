import { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  KeyRound,
  ListChecks,
  MessageSquareQuote,
  Zap,
} from 'lucide-react';
import type { LocationItem } from '../types/location';
import { ACCENT_PALETTES } from '../utils/accentTheme';
import { ReplaceableImageSlot } from './ReplaceableImageSlot';

interface LocationDetailProps {
  location: LocationItem;
  customImageUrls?: (string | undefined)[];
  onImageChange: (
    locationId: string,
    slotIndex: number,
    dataUrl: string | undefined
  ) => void;
  onBack: () => void;
}

type DetailViewMode = 'full' | 'quick';

const STORY_STEP_LABELS = [
  { key: 'tarikanPembuka', number: '01', title: 'Tarikan pembuka' },
  { key: 'faktaDisahkan', number: '02', title: 'Fakta disahkan' },
  { key: 'maknaTempat', number: '03', title: 'Makna tempat' },
  { key: 'hubunganPelawat', number: '04', title: 'Hubungan dengan pelawat' },
  { key: 'soalanAtauAjakan', number: '05', title: 'Soalan atau ajakan' },
] as const;

export function LocationDetail({
  location,
  customImageUrls = [],
  onImageChange,
  onBack,
}: LocationDetailProps) {
  const [viewMode, setViewMode] = useState<DetailViewMode>('full');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [revealedQuizIds, setRevealedQuizIds] = useState<Record<string, boolean>>({});

  const palette = ACCENT_PALETTES[location.accentTheme];
  const photoSlots = [0, 1, 2, 3, 4].map(
    (index) => customImageUrls[index] || location.suppliedImageUrls?.[index]
  );
  const filledCount = photoSlots.filter(Boolean).length;
  const activeImage = photoSlots[activePhotoIndex];

  const toggleQuizAnswer = (quizId: string) => {
    setRevealedQuizIds((prev) => ({
      ...prev,
      [quizId]: !prev[quizId],
    }));
  };

  return (
    <article className="mx-auto w-full max-w-3xl pb-12">
      <div className="mb-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-[52px] items-center gap-2.5 rounded-xl border border-[#B8C9D9] bg-white px-5 py-3 text-base font-bold text-[#0B2545] shadow-xs transition-colors hover:bg-[#E0F2FE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] sm:text-lg"
        >
          <ArrowLeft className={`h-5 w-5 ${palette.actionText}`} aria-hidden="true" />
          <span className="whitespace-nowrap">Kembali ke Senarai Lokasi</span>
        </button>
      </div>

      <header
        className={`mb-6 rounded-2xl bg-gradient-to-br ${palette.heroGradient} p-6 text-white shadow-md sm:p-7`}
      >
        <div className="flex flex-wrap items-center gap-2 text-base font-semibold">
          {location.verificationState === 'verified' ? (
            <>
              <CheckCircle2
                className="h-5 w-5 shrink-0 text-[#6EE7B7]"
                aria-hidden="true"
              />
              <span className="text-[#D1FAE5]">Status: {location.statusLabel}</span>
            </>
          ) : (
            <>
              <AlertCircle
                className="h-5 w-5 shrink-0 text-[#FDE68A]"
                aria-hidden="true"
              />
              <span className="text-[#FEF3C7]">Status: {location.statusLabel}</span>
            </>
          )}
        </div>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {location.name}
        </h1>
      </header>

      {/* Mod paparan: Nota lengkap vs Rujukan cepat */}
      <div
        role="tablist"
        aria-label="Mod paparan nota lokasi"
        className="mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-[#CBD8E4] bg-white p-1.5 shadow-xs"
      >
        <button
          type="button"
          role="tab"
          aria-selected={viewMode === 'full'}
          onClick={() => setViewMode('full')}
          className={`flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-3 py-3 text-base font-bold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] sm:text-lg ${
            viewMode === 'full'
              ? `bg-gradient-to-r ${palette.buttonGradient} text-white shadow-xs`
              : 'text-[#1E3448] hover:bg-[#F0F7FC]'
          }`}
        >
          <FileText className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>Nota lengkap</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={viewMode === 'quick'}
          onClick={() => setViewMode('quick')}
          className={`flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-3 py-3 text-base font-bold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] sm:text-lg ${
            viewMode === 'quick'
              ? `bg-gradient-to-r ${palette.buttonGradient} text-white shadow-xs`
              : 'text-[#1E3448] hover:bg-[#F0F7FC]'
          }`}
        >
          <Zap className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>Rujukan cepat</span>
        </button>
      </div>

      {viewMode === 'quick' ? (
        /* Mod Rujukan Cepat: Fakta utama + Lima kata kunci dalam satu skrin telefon mudah dibaca */
        <div className="space-y-5">
          <section
            aria-label="Fakta utama rujukan cepat"
            className="rounded-2xl border border-[#CBD8E4] bg-white p-5 shadow-xs sm:p-6"
          >
            <div className="flex items-center gap-2.5 border-b border-[#E8EFF5] pb-3">
              <ListChecks
                className={`h-6 w-6 shrink-0 ${palette.actionText}`}
                aria-hidden="true"
              />
              <h2 className="text-xl font-bold text-[#0B2545] sm:text-2xl">
                Fakta Utama
              </h2>
            </div>

            {location.facts.length > 0 ? (
              <ul className="mt-4 space-y-3.5">
                {location.facts.map((fact, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-lg font-medium leading-relaxed text-[#0B2545] sm:text-xl"
                  >
                    <span
                      className={`mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-base font-bold tabular-nums ${palette.badgeBg} ${palette.badgeText}`}
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-lg font-semibold text-[#B45309] sm:text-xl">
                Maklumat belum dimasukkan.
              </p>
            )}
          </section>

          <section
            aria-label="Lima kata kunci rujukan cepat"
            className="rounded-2xl border border-[#CBD8E4] bg-white p-5 shadow-xs sm:p-6"
          >
            <div className="flex items-center gap-2.5 border-b border-[#E8EFF5] pb-3">
              <KeyRound
                className={`h-6 w-6 shrink-0 ${palette.actionText}`}
                aria-hidden="true"
              />
              <h2 className="text-xl font-bold text-[#0B2545] sm:text-2xl">
                Lima Kata Kunci
              </h2>
            </div>

            {location.keywords.length > 0 ? (
              <ol className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {location.keywords.map((keyword, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-3 rounded-xl border ${palette.slotBorder} bg-gradient-to-br ${palette.slotGradient} px-4 py-3.5 text-lg font-bold text-[#0B2545] sm:text-xl`}
                  >
                    <span className={`text-base font-bold tabular-nums ${palette.actionText}`}>
                      0{index + 1}
                    </span>
                    <span>{keyword}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-4 text-lg font-semibold text-[#B45309] sm:text-xl">
                Maklumat belum dimasukkan.
              </p>
            )}
          </section>

          <section
            aria-label="Sumber ringkas"
            className="rounded-2xl border border-[#CBD8E4] bg-white px-5 py-4 text-base shadow-xs"
          >
            <p className="font-bold text-[#0B2545]">Sumber Rujukan</p>
            {location.sources.length > 0 ? (
              <div className="mt-1.5 space-y-2">
                {location.sources.map((source, index) => (
                  <div key={index}>
                    <p
                      className={`font-semibold ${
                        source.verified ? 'text-[#047857]' : 'text-[#B45309]'
                      }`}
                    >
                      {source.label}
                    </p>
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 break-all text-sm font-medium text-[#0284C7] underline underline-offset-4 hover:text-[#0369A1]"
                      >
                        <span>{source.url}</span>
                        <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-1 font-medium text-[#B45309]">
                Maklumat belum dimasukkan.
              </p>
            )}

            {location.verificationState !== 'verified' && (
              <div className="mt-3 rounded-xl border border-[#FCD34D] bg-[#FFFBEB] p-3.5 text-sm leading-relaxed text-[#78350F] sm:text-base">
                <span className="font-bold text-[#B45309]">Perlu disemak: </span>
                {location.reviewNote}
              </div>
            )}
          </section>
        </div>
      ) : (
        /* Mod Nota Lengkap: mengekalkan semua kandungan dan sumber sedia ada */
        <>
          <section
            aria-label="Galeri 5 gambar lokasi"
            className="mb-8 rounded-2xl border border-[#CBD8E4] bg-white p-4 shadow-xs sm:p-6"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-[#0B2545] sm:text-2xl">
                Gambar Lokasi (5 Keping)
              </h2>
              <span className={`text-base font-bold tabular-nums ${palette.actionText}`}>
                {filledCount} / 5 gambar diisi
              </span>
            </div>

            <ReplaceableImageSlot
              key={`${location.id}-slot-${activePhotoIndex}`}
              label={location.imageLabel}
              slotNumber={activePhotoIndex + 1}
              imageUrl={activeImage}
              accentTheme={location.accentTheme}
              allowReplace
              onImageChange={(dataUrl) =>
                onImageChange(location.id, activePhotoIndex, dataUrl)
              }
            />

            <div className="mt-4 border-t border-[#E8EFF5] pt-4">
              <p className="mb-2.5 text-sm font-semibold text-[#334E68]">
                Pilih ruang gambar (1 hingga 5):
              </p>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {photoSlots.map((slotUrl, index) => {
                  const isActive = index === activePhotoIndex;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActivePhotoIndex(index)}
                      aria-label={`Pilih Gambar ${index + 1}`}
                      aria-pressed={isActive}
                      className={`flex min-h-[68px] flex-col items-center justify-center overflow-hidden rounded-xl border p-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] ${
                        isActive
                          ? `border-2 border-[#0284C7] bg-gradient-to-br ${palette.slotGradient} shadow-xs`
                          : 'border-[#CBD8E4] bg-[#F7FAFC] hover:border-[#7B9BB8]'
                      }`}
                    >
                      {slotUrl ? (
                        <img
                          src={slotUrl}
                          alt={`Miniatur Gambar ${index + 1}`}
                          referrerPolicy="no-referrer"
                          className="h-11 w-full rounded-lg object-cover"
                        />
                      ) : (
                        <ImageIcon
                          className={`h-5 w-5 ${
                            isActive ? palette.slotIconColor : 'text-[#526D85]'
                          }`}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={`mt-1 text-xs font-bold tabular-nums ${
                          isActive ? palette.actionText : 'text-[#334E68]'
                        }`}
                      >
                        #{index + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <div className="space-y-8">
            {/* 1. Fakta penting */}
            <section className="rounded-2xl border border-[#CBD8E4] bg-white p-5 shadow-xs sm:p-7">
              <div className="flex items-center gap-2.5 border-b border-[#E8EFF5] pb-4">
                <ListChecks
                  className={`h-6 w-6 shrink-0 ${palette.actionText}`}
                  aria-hidden="true"
                />
                <h2 className="text-xl font-bold text-[#0B2545] sm:text-2xl">
                  1. Fakta Penting
                </h2>
              </div>

              {location.facts.length > 0 ? (
                <ul className="mt-5 space-y-4">
                  {location.facts.map((fact, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-lg leading-relaxed text-[#1A3147] sm:text-[19px]"
                    >
                      <span
                        className={`mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-base font-bold tabular-nums ${palette.badgeBg} ${palette.badgeText}`}
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-lg font-medium text-[#B45309] sm:text-[19px]">
                  Maklumat belum dimasukkan.
                </p>
              )}
            </section>

            {/* 2. Cerita 60 saat (5 langkah Sesi 2) */}
            <section className="rounded-2xl border border-[#CBD8E4] bg-white p-5 shadow-xs sm:p-7">
              <div className="flex items-center gap-2.5 border-b border-[#E8EFF5] pb-4">
                <MessageSquareQuote
                  className={`h-6 w-6 shrink-0 ${palette.actionText}`}
                  aria-hidden="true"
                />
                <div>
                  <h2 className="text-xl font-bold text-[#0B2545] sm:text-2xl">
                    2. Cerita 60 Saat
                  </h2>
                  <p className="mt-0.5 text-base text-[#4A6378]">
                    Susunan lima langkah Sesi 2 untuk penyampaian pemandu pelancong
                  </p>
                </div>
              </div>

              <div className="mt-2 divide-y divide-[#E8EFF5]">
                {STORY_STEP_LABELS.map((step) => {
                  const stepContent = location.storySteps
                    ? location.storySteps[step.key]
                    : null;

                  return (
                    <div key={step.key} className="py-4 first:pt-4 last:pb-1">
                      <div className="flex items-baseline gap-2.5">
                        <span className={`text-base font-bold tabular-nums ${palette.actionText}`}>
                          {step.number}.
                        </span>
                        <h3 className="text-lg font-bold text-[#0B2545] sm:text-xl">
                          {step.title}
                        </h3>
                      </div>
                      {stepContent ? (
                        <p className="mt-2 text-lg leading-relaxed text-[#1A3147] sm:text-[19px]">
                          {stepContent}
                        </p>
                      ) : (
                        <p className="mt-2 text-lg font-medium text-[#B45309] sm:text-[19px]">
                          Maklumat belum dimasukkan.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 3. Lima kata kunci */}
            <section className="rounded-2xl border border-[#CBD8E4] bg-white p-5 shadow-xs sm:p-7">
              <div className="flex items-center gap-2.5 border-b border-[#E8EFF5] pb-4">
                <KeyRound
                  className={`h-6 w-6 shrink-0 ${palette.actionText}`}
                  aria-hidden="true"
                />
                <h2 className="text-xl font-bold text-[#0B2545] sm:text-2xl">
                  3. Lima Kata Kunci Ingatan
                </h2>
              </div>

              {location.keywords.length > 0 ? (
                <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {location.keywords.map((keyword, index) => (
                    <li
                      key={index}
                      className={`flex items-center gap-3 rounded-xl border ${palette.slotBorder} bg-gradient-to-br ${palette.slotGradient} px-4 py-4 text-lg font-bold text-[#0B2545] sm:text-xl`}
                    >
                      <span className={`text-base font-bold tabular-nums ${palette.actionText}`}>
                        0{index + 1}
                      </span>
                      <span>{keyword}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-5 text-lg font-medium text-[#B45309] sm:text-[19px]">
                  Maklumat belum dimasukkan.
                </p>
              )}
            </section>

            {/* 4. Kuiz ringkas */}
            <section className="rounded-2xl border border-[#CBD8E4] bg-white p-5 shadow-xs sm:p-7">
              <div className="flex items-center gap-2.5 border-b border-[#E8EFF5] pb-4">
                <HelpCircle
                  className={`h-6 w-6 shrink-0 ${palette.actionText}`}
                  aria-hidden="true"
                />
                <div>
                  <h2 className="text-xl font-bold text-[#0B2545] sm:text-2xl">
                    4. Kuiz Ringkas
                  </h2>
                  <p className="mt-0.5 text-base text-[#4A6378]">
                    Cuba jawab sendiri dahulu sebelum menekan butang “Lihat jawapan”
                  </p>
                </div>
              </div>

              {location.quiz.length > 0 ? (
                <div className="mt-5 space-y-5">
                  {location.quiz.map((item, index) => {
                    const isRevealed = Boolean(revealedQuizIds[item.id]);

                    return (
                      <div
                        key={item.id}
                        className="rounded-xl border border-[#D4E2EE] bg-[#F7FBFE] p-4 sm:p-5"
                      >
                        <p className={`text-base font-bold tabular-nums ${palette.actionText}`}>
                          Soalan {index + 1}
                        </p>
                        <p className="mt-1 text-lg font-bold leading-snug text-[#0B2545] sm:text-xl">
                          {item.question}
                        </p>

                        <div className="mt-4">
                          <button
                            type="button"
                            onClick={() => toggleQuizAnswer(item.id)}
                            aria-expanded={isRevealed}
                            className={`inline-flex min-h-[54px] items-center gap-2.5 rounded-xl bg-gradient-to-r px-6 py-3.5 text-lg font-bold text-white shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:ring-offset-2 active:scale-[0.99] ${palette.buttonGradient}`}
                          >
                            {isRevealed ? (
                              <>
                                <EyeOff className="h-5 w-5 shrink-0" aria-hidden="true" />
                                <span>Sembunyikan jawapan</span>
                              </>
                            ) : (
                              <>
                                <Eye className="h-5 w-5 shrink-0" aria-hidden="true" />
                                <span>Lihat jawapan</span>
                              </>
                            )}
                          </button>
                        </div>

                        {isRevealed && (
                          <div className="mt-4 rounded-xl border border-[#6EE7B7] bg-[#ECFDF5] p-4">
                            <p className="text-base font-bold text-[#047857]">Jawapan:</p>
                            <p className="mt-1 text-lg leading-relaxed text-[#0B2545] sm:text-[19px]">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-5 text-lg font-medium text-[#B45309] sm:text-[19px]">
                  Maklumat belum dimasukkan.
                </p>
              )}
            </section>

            {/* 5. Sumber rujukan & catatan semakan */}
            <section className="rounded-2xl border border-[#CBD8E4] bg-white p-5 shadow-xs sm:p-7">
              <div className="flex items-center gap-2.5 border-b border-[#E8EFF5] pb-4">
                <BookOpen
                  className={`h-6 w-6 shrink-0 ${palette.actionText}`}
                  aria-hidden="true"
                />
                <h2 className="text-xl font-bold text-[#0B2545] sm:text-2xl">
                  5. Sumber Rujukan &amp; Semakan
                </h2>
              </div>

              <div className="mt-5 space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-[#0B2545]">Sumber Rujukan</h3>
                  {location.sources.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                      {location.sources.map((source, index) => (
                        <li
                          key={index}
                          className={`rounded-xl border p-4 ${
                            source.verified
                              ? 'border-[#6EE7B7] bg-[#ECFDF5]'
                              : 'border-[#FCD34D] bg-[#FFFBEB]'
                          }`}
                        >
                          <div
                            className={`flex items-center gap-2 text-base font-bold ${
                              source.verified ? 'text-[#047857]' : 'text-[#B45309]'
                            }`}
                          >
                            {source.verified ? (
                              <>
                                <CheckCircle2
                                  className="h-4 w-4 shrink-0"
                                  aria-hidden="true"
                                />
                                <span>Fakta disahkan berdasarkan sumber</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle
                                  className="h-4 w-4 shrink-0"
                                  aria-hidden="true"
                                />
                                <span>Pautan sumber belum dibekalkan — perlu disemak</span>
                              </>
                            )}
                          </div>
                          <p className="mt-1.5 text-lg font-semibold text-[#0B2545]">
                            {source.label}
                          </p>
                          {source.url && (
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1.5 inline-flex items-center gap-1.5 break-all text-base font-medium text-[#0284C7] underline underline-offset-4 hover:text-[#0369A1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
                            >
                              <span>{source.url}</span>
                              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-lg font-medium text-[#B45309]">
                      Maklumat belum dimasukkan.
                    </p>
                  )}
                </div>

                <div className="rounded-xl border border-[#FCD34D] bg-[#FFFBEB] p-4">
                  <div className="flex items-center gap-2 text-base font-bold text-[#B45309]">
                    <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>Catatan yang masih perlu disemak</span>
                  </div>
                  <p className="mt-1.5 text-base leading-relaxed text-[#78350F] sm:text-lg">
                    {location.reviewNote}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </>
      )}

      <div className="mt-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#0B2545] via-[#0E4A7B] to-[#087F8C] px-6 py-4 text-lg font-bold text-white shadow-sm transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:ring-offset-2 active:scale-[0.99]"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          <span>Kembali ke Senarai Lokasi</span>
        </button>
      </div>
    </article>
  );
}
