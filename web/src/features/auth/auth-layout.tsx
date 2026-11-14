/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { Link } from '@tanstack/react-router'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Skeleton } from '@/components/ui/skeleton'
import { useSystemConfig } from '@/hooks/use-system-config'

type AuthLayoutProps = {
  children: React.ReactNode
}

const PROOF_POINTS = [
  'Works with the official OpenAI and Anthropic SDKs',
  'Keys scoped per project',
  'Usage and cost in real time',
]

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()

  const brand = (
    <>
      <div className='flex size-9 items-center justify-center overflow-hidden rounded-xl ring-1 ring-white/10'>
        {loading ? (
          <Skeleton className='size-9 rounded-xl' />
        ) : (
          <img src={logo} alt={t('Logo')} className='size-9 object-cover' />
        )}
      </div>
      {loading ? (
        <Skeleton className='h-5 w-24' />
      ) : (
        <span className='text-lg font-semibold tracking-tight'>
          {systemName}
        </span>
      )}
    </>
  )

  return (
    <div className='bg-background relative min-h-svh lg:grid lg:grid-cols-[1.05fr_1fr]'>
      {/* Brand panel, desktop only */}
      <aside className='border-border/60 relative hidden flex-col justify-between overflow-hidden border-r p-12 lg:flex xl:p-16'>
        <div aria-hidden className='brand-glow' />
        <div
          aria-hidden
          className='absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,black_10%,transparent_100%)] bg-[size:3.5rem_3.5rem] opacity-30'
        />

        <Link to='/' className='relative z-10 flex items-center gap-3'>
          {brand}
        </Link>

        <div className='relative z-10 max-w-md'>
          <p className='text-muted-foreground/60 text-xs font-semibold tracking-[0.18em] uppercase'>
            {t('Model gateway')}
          </p>
          <h2 className='mt-4 text-3xl leading-[1.15] font-semibold tracking-tight xl:text-4xl'>
            {t('One endpoint,')}
            <br />
            <span className='brand-gradient-text'>
              {t('every frontier model')}
            </span>
          </h2>
          <p className='text-muted-foreground mt-4 text-sm leading-relaxed'>
            {t(
              'Keep the OpenAI or Anthropic SDK you already use. Change base_url and reach every model you enable, with keys, usage and billing in one console.'
            )}
          </p>
          <ul className='mt-8 space-y-3'>
            {PROOF_POINTS.map((point) => (
              <li
                key={point}
                className='text-muted-foreground flex items-center gap-2.5 text-sm'
              >
                <span className='border-primary/30 bg-primary/10 flex size-5 items-center justify-center rounded-full border'>
                  <Check className='text-primary size-3' />
                </span>
                {t(point)}
              </li>
            ))}
          </ul>
        </div>

        <p className='text-muted-foreground/40 relative z-10 text-xs'>
          superai.day
        </p>
      </aside>

      {/* Form panel */}
      <main className='relative flex min-h-svh flex-col px-5 py-8 sm:px-8'>
        <Link
          to='/'
          className='flex items-center gap-2.5 transition-opacity hover:opacity-80 lg:hidden'
        >
          {brand}
        </Link>
        <div className='flex flex-1 items-center justify-center py-10'>
          <div className='w-full max-w-[420px]'>{children}</div>
        </div>
        <p className='text-muted-foreground/35 text-center text-xs lg:hidden'>
          superai.day
        </p>
      </main>
    </div>
  )
}
