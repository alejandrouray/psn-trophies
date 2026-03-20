export class PSNConfigurationError extends Error {
  constructor() {
    super('PSN_NPSSO environment variable is not defined.')
    this.name = 'PSNConfigurationError'
  }
}
