import type { AccentTheme } from '../types/location';

export interface ThemePalette {
  topBarGradient: string;
  heroGradient: string;
  slotGradient: string;
  slotBorder: string;
  slotIconBg: string;
  slotIconColor: string;
  actionText: string;
  hoverBorder: string;
  badgeBg: string;
  badgeText: string;
  buttonGradient: string;
}

export const ACCENT_PALETTES: Record<AccentTheme, ThemePalette> = {
  cobalt: {
    topBarGradient: 'from-[#0284C7] to-[#2563EB]',
    heroGradient: 'from-[#0B2545] via-[#1E40AF] to-[#0284C7]',
    slotGradient: 'from-[#E0F2FE] via-[#EFF6FF] to-[#DBEAFE]',
    slotBorder: 'border-[#93C5FD]',
    slotIconBg: 'bg-white border-[#BFDBFE]',
    slotIconColor: 'text-[#1D4ED8]',
    actionText: 'text-[#1D4ED8]',
    hoverBorder: 'hover:border-[#2563EB]',
    badgeBg: 'bg-[#DBEAFE]',
    badgeText: 'text-[#1E40AF]',
    buttonGradient:
      'from-[#1D4ED8] to-[#0284C7] hover:from-[#1E40AF] hover:to-[#0369A1]',
  },
  teal: {
    topBarGradient: 'from-[#0891B2] to-[#0D9488]',
    heroGradient: 'from-[#0B2545] via-[#0E7490] to-[#0D9488]',
    slotGradient: 'from-[#ECFEFF] via-[#F0FDFA] to-[#CCFBF1]',
    slotBorder: 'border-[#5EEAD4]',
    slotIconBg: 'bg-white border-[#99F6E4]',
    slotIconColor: 'text-[#0E7490]',
    actionText: 'text-[#0E7490]',
    hoverBorder: 'hover:border-[#0891B2]',
    badgeBg: 'bg-[#CCFBF1]',
    badgeText: 'text-[#0F766E]',
    buttonGradient:
      'from-[#0891B2] to-[#0D9488] hover:from-[#0E7490] hover:to-[#0F766E]',
  },
  emerald: {
    topBarGradient: 'from-[#059669] to-[#0D9488]',
    heroGradient: 'from-[#064E3B] via-[#047857] to-[#0D9488]',
    slotGradient: 'from-[#ECFDF5] via-[#F0FDFA] to-[#D1FAE5]',
    slotBorder: 'border-[#6EE7B7]',
    slotIconBg: 'bg-white border-[#A7F3D0]',
    slotIconColor: 'text-[#047857]',
    actionText: 'text-[#047857]',
    hoverBorder: 'hover:border-[#059669]',
    badgeBg: 'bg-[#D1FAE5]',
    badgeText: 'text-[#065F46]',
    buttonGradient:
      'from-[#059669] to-[#0D9488] hover:from-[#047857] hover:to-[#0F766E]',
  },
  amber: {
    topBarGradient: 'from-[#D97706] to-[#EA580C]',
    heroGradient: 'from-[#451A03] via-[#B45309] to-[#EA580C]',
    slotGradient: 'from-[#FFFBEB] via-[#FEF3C7] to-[#FFEDD5]',
    slotBorder: 'border-[#FCD34D]',
    slotIconBg: 'bg-white border-[#FDE68A]',
    slotIconColor: 'text-[#B45309]',
    actionText: 'text-[#B45309]',
    hoverBorder: 'hover:border-[#D97706]',
    badgeBg: 'bg-[#FEF3C7]',
    badgeText: 'text-[#92400E]',
    buttonGradient:
      'from-[#D97706] to-[#EA580C] hover:from-[#B45309] hover:to-[#C2410C]',
  },
};
