const isDev = process.env.NODE_ENV === 'development'

export const logger = {
  info: (message: string, data?: unknown) => {
    if (!isDev) return
    console.info(`[info] ${message}`, ...(data !== undefined ? [data] : []))
  },

  warn: (message: string, data?: unknown) => {
    if (!isDev) return
    console.warn(`[warn] ${message}`, ...(data !== undefined ? [data] : []))
  },

  error: (message: string, error?: unknown) => {
    console.error(`[error] ${message}`, ...(error !== undefined ? [error] : []))
  },
}
