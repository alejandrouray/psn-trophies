export function isDemoMode() {
  const v = process.env.DEMO_MODE?.toLowerCase()

  return v === '1' || v === 'true' || v === 'yes'
}

export function hasPsnOrDemo() {
  return Boolean(process.env.PSN_NPSSO?.trim()) || isDemoMode()
}

export function normalizeCompareOnlineId(onlineId: string) {
  return onlineId.trim().toLowerCase()
}
