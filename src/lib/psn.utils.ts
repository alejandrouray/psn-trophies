import type { AvatarSource } from '@types'

export function resolveAvatarUrl(profile: AvatarSource): string | undefined {
  const pictures = profile.personalDetail?.profilePictures
  const avatars = profile.avatars

  return (
    pictures?.find((p) => p.size === 'xl')?.url ??
    pictures?.find((p) => p.size === 'l')?.url ??
    avatars.find((a) => a.size === 'xl')?.url ??
    avatars.find((a) => a.size === 'l')?.url ??
    avatars[avatars.length - 1]?.url
  )
}
