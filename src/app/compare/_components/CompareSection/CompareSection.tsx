import { ErrorState } from '@components'
import { compareUsers, searchPSNUser } from '@services/psn'
import { CompareGames } from './CompareGames'
import { CompareHeader } from './CompareHeader'
import type { CompareSectionProps } from './CompareSection.types'
import { CompareStats } from './CompareStats'

export async function CompareSection({ onlineId }: CompareSectionProps) {
  const user = await searchPSNUser(onlineId)

  if (!user) {
    return (
      <ErrorState
        title="Player not found"
        icon="🔍"
        description={`No PSN account matches "${onlineId}". Check the spelling and try again.`}
      />
    )
  }

  const { me, them, commonGames } = await compareUsers(user.accountId)

  return (
    <div className="space-y-6">
      <CompareHeader me={me} them={them} />
      <CompareStats me={me} them={them} commonGames={commonGames} />
      <CompareGames
        commonGames={commonGames}
        theirOnlineId={them.profile?.onlineId ?? onlineId}
      />
    </div>
  )
}
