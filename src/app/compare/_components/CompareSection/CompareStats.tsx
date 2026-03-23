import type { ComparedGame, ComparedUser } from '@types'

interface StatCellProps {
  label: string
  myValue: number | string
  theirValue: number | string
}

function StatCell({ label, myValue, theirValue }: StatCellProps) {
  const myNum = typeof myValue === 'string' ? Number(myValue) : myValue
  const theirNum = typeof theirValue === 'string' ? Number(theirValue) : theirValue
  const myLeads = myNum > theirNum
  const theyLead = theirNum > myNum

  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card px-4 py-5 text-center">
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-3 tabular-nums">
        <span
          className={`text-2xl font-black ${myLeads ? 'text-primary' : 'text-foreground'}`}
        >
          {myNum.toLocaleString()}
        </span>
        <span className="text-muted-foreground/40 text-sm font-bold">–</span>
        <span
          className={`text-2xl font-black ${theyLead ? 'text-rose-400' : 'text-foreground'}`}
        >
          {theirNum.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

interface CompareStatsProps {
  me: ComparedUser
  them: ComparedUser
  commonGames: ComparedGame[]
}

export function CompareStats({ me, them, commonGames }: CompareStatsProps) {
  const myEarned = me.trophySummary.earnedTrophies
  const theirEarned = them.trophySummary.earnedTrophies

  const myTotal = myEarned.bronze + myEarned.silver + myEarned.gold + myEarned.platinum
  const theirTotal =
    theirEarned.bronze + theirEarned.silver + theirEarned.gold + theirEarned.platinum

  const myCompleted = me.titles.filter((t) => t.progress === 100).length
  const theirCompleted = them.titles.filter((t) => t.progress === 100).length

  return (
    <section aria-label="Trophy comparison stats">
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 list-none">
        <li>
          <StatCell
            label="Level"
            myValue={me.trophySummary.trophyLevel}
            theirValue={them.trophySummary.trophyLevel}
          />
        </li>
        <li>
          <StatCell
            label="Platinums"
            myValue={myEarned.platinum}
            theirValue={theirEarned.platinum}
          />
        </li>
        <li>
          <StatCell
            label="Trophies"
            myValue={myTotal}
            theirValue={theirTotal}
          />
        </li>
        <li>
          <StatCell
            label="Completed"
            myValue={myCompleted}
            theirValue={theirCompleted}
          />
        </li>
      </ul>
      <p className="mt-3 text-center text-xs text-muted-foreground font-mono">
        <span className="text-primary font-semibold">You</span>
        {' '}
        vs
        {' '}
        <span className="text-rose-400 font-semibold">
          {them.profile?.onlineId ?? 'Opponent'}
        </span>
        {' · '}
        <span className="text-foreground font-semibold">{commonGames.length}</span>
        {' games in common'}
      </p>
    </section>
  )
}
