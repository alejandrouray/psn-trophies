import { tierCssVar, tierMix } from '@lib'
import Image from 'next/image'
import { SIZE } from './PSNAvatar.constants'
import type { PSNAvatarProps } from './PSNAvatar.types'

export function PSNAvatar({
  avatarUrl,
  onlineId,
  grade,
  size = 'sm',
}: PSNAvatarProps) {
  const color = tierCssVar(grade)
  const s = SIZE[size]

  return (
    <div
      className={`rounded-full ${s.padding} shrink-0`}
      style={{
        background: `linear-gradient(135deg, ${color}, ${tierMix(grade, s.shadow.gradientOpacity)})`,
        boxShadow: `0 0 ${s.shadow.blur}px ${tierMix(grade, s.shadow.opacity)}`,
      }}
    >
      <div className={`rounded-full overflow-hidden ${s.wrapper} bg-muted`}>
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`${onlineId}'s avatar`}
            width={s.imgSize}
            height={s.imgSize}
            className="object-cover size-full"
            priority
          />
        ) : (
          <div
            className={`size-full flex items-center justify-center ${s.fallbackText}`}
            aria-hidden="true"
          >
            🎮
          </div>
        )}
      </div>
    </div>
  )
}
