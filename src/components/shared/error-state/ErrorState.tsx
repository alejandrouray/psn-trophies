import type { ErrorStateProps } from '@components'

export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error has occurred. Please try again later.',
  icon = '⚠️',
  className,
  ...props
}: ErrorStateProps) {
  const hasStringDescription = typeof description === 'string'

  return (
    <section
      className={`min-h-[400px] w-full flex items-center justify-center p-6 ${className ?? ''}`}
      aria-labelledby="error-title"
      {...props}
    >
      <div className="text-center space-y-4 border border-zinc-800 p-10 rounded-[2.5rem] bg-zinc-950/50 backdrop-blur-xl max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-700 ease-out">
        <span
          className="text-4xl mb-2 block animate-in fade-in slide-in-from-top-4 duration-1000 delay-150"
          aria-hidden="true"
        >
          {icon}
        </span>

        <h2
          id="error-title"
          className="text-2xl font-bold text-white tracking-tight"
        >
          {title}
        </h2>

        {hasStringDescription ? (
          <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
        ) : (
          <div className="text-zinc-400 text-sm leading-relaxed flex flex-col gap-2">
            {description}
          </div>
        )}
      </div>
    </section>
  )
}
