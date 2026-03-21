export function LandingBackground() {
  return (
    <div className="absolute inset-0" aria-hidden="true" role="presentation">
      <div className="absolute inset-0 bg-landing-glow" />
      <div className="absolute inset-0 bg-landing-grid" />
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" role="presentation">
        <span aria-hidden="true" className="absolute top-[5%] left-[8%] text-[18vw] font-bold text-primary/4 rotate-12">△</span>
        <span aria-hidden="true" className="absolute bottom-[8%] right-[6%] text-[14vw] font-bold text-primary/4 -rotate-6">○</span>
        <span aria-hidden="true" className="absolute top-[18%] right-[10%] text-[10vw] font-bold text-primary/4 rotate-3">✕</span>
        <span aria-hidden="true" className="absolute bottom-[4%] left-[6%] text-[16vw] font-bold text-primary/4 -rotate-12">□</span>
      </div>
    </div>
  )
}
