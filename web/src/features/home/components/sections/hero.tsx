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
import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { useStatus } from '@/hooks/use-status'

import { HeroTerminalDemo } from '../hero-terminal-demo'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

const PROOF_POINTS = [
  'Works with the official OpenAI SDK',
  'Keys scoped per project',
  'Usage and cost in real time',
]

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { status } = useStatus()
  const docsUrl = (status?.docs_link as string | undefined) || '/docs'

  const docsButton = () => {
    const className =
      'group border-border/70 hover:border-border hover:bg-muted/40 inline-flex h-11 items-center gap-1.5 rounded-xl px-5 text-sm font-medium'
    const label = (
      <>
        <ShieldCheck className='text-muted-foreground/80 group-hover:text-foreground size-4 transition-colors duration-200' />
        <span>{t('Docs')}</span>
      </>
    )
    if (docsUrl.startsWith('http')) {
      return (
        <Button
          variant='outline'
          className={className}
          render={
            <a href={docsUrl} target='_blank' rel='noopener noreferrer' />
          }
        >
          {label}
        </Button>
      )
    }
    return (
      <Button
        variant='outline'
        className={className}
        render={<Link to={docsUrl} />}
      >
        {label}
      </Button>
    )
  }

  return (
    <section className='relative overflow-hidden px-5 pt-28 pb-16 sm:px-8 md:pt-36 md:pb-24'>
      <div aria-hidden className='brand-glow -z-10' />
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_55%_45%_at_50%_20%,black_10%,transparent_100%)] bg-[size:4rem_4rem] opacity-40'
      />

      <div className='mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10'>
        <div className='flex flex-col items-start text-left lg:col-span-6'>
          <div className='border-primary/25 bg-primary/5 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium'>
            <span className='relative flex size-1.5'>
              <span className='bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75' />
              <span className='bg-primary relative inline-flex size-1.5 rounded-full' />
            </span>
            <span>{t('Claude & OpenAI compatible · Pay as you go')}</span>
          </div>

          <h1 className='max-w-[680px] text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-6xl'>
            {t('One endpoint,')}
            <br />
            <span className='brand-gradient-text'>
              {t('every frontier model')}
            </span>
          </h1>

          <p className='text-muted-foreground mt-6 max-w-[560px] text-base leading-relaxed sm:text-lg'>
            {t(
              'Keep the OpenAI SDK you already use. Change base_url and reach every model you enable, with keys, usage and billing in one console.'
            )}
          </p>

          <div className='mt-8 flex flex-wrap items-center gap-3'>
            {props.isAuthenticated ? (
              <Button
                size='lg'
                className='group h-11 rounded-xl px-5 text-sm font-semibold'
                render={<Link to='/dashboard' />}
              >
                {t('Go to Dashboard')}
                <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
            ) : (
              <Button
                size='lg'
                className='group h-11 rounded-xl px-5 text-sm font-semibold'
                render={<Link to='/sign-up' />}
              >
                {t('Start free')}
                <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
            )}
            <Button
              variant='outline'
              size='lg'
              className='border-border/70 hover:border-border hover:bg-muted/40 h-11 rounded-xl px-5 text-sm font-medium'
              render={<Link to='/pricing' />}
            >
              {t('View model pricing')}
            </Button>
            {docsButton()}
          </div>

          <ul className='text-muted-foreground mt-8 flex flex-col gap-2.5 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6'>
            {PROOF_POINTS.map((point) => (
              <li key={point} className='flex items-center gap-2'>
                <Check className='text-primary size-3.5 shrink-0' />
                <span>{t(point)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex w-full justify-center lg:col-span-6 lg:justify-end'>
          <div className='border-border/60 bg-card/40 relative w-full max-w-xl rounded-2xl border p-1.5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)] backdrop-blur-sm'>
            <div className='brand-rule absolute inset-x-8 top-0' />
            <HeroTerminalDemo className='w-full' />
          </div>
        </div>
      </div>
    </section>
  )
}
