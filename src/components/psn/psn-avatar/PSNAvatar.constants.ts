export const SIZE = {
  sm: {
    wrapper: 'size-16 md:size-20',
    padding: 'p-[2px]',
    shadow: { blur: 24, opacity: 15, gradientOpacity: 19 },
    imgSize: 80,
    fallbackText: 'text-2xl',
  },
  lg: {
    wrapper: 'size-28 md:size-36',
    padding: 'p-[3px]',
    shadow: { blur: 40, opacity: 20, gradientOpacity: 25 },
    imgSize: 144,
    fallbackText: 'text-4xl',
  },
} as const
