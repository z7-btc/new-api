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
import { Gauge, ShieldCheck, Wallet } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'

interface FeaturesProps {
  className?: string
}

export function Features(_props: FeaturesProps) {
  const { t } = useTranslation()

  const points = [
    {
      num: '01',
      icon: Gauge,
      title: t('Fast by default'),
      desc: t(
        'Requests land on the fastest healthy upstream and fail over automatically when a provider slows down.'
      ),
      detail: t('Health checks every few seconds'),
    },
    {
      num: '02',
      icon: Wallet,
      title: t('Billing you can read'),
      desc: t(
        'Each call is metered by token and priced at the moment it runs. What you see in usage logs is what you pay.'
      ),
      detail: t('Token level usage logs'),
    },
    {
      num: '03',
      icon: ShieldCheck,
      title: t('Governed from day one'),
      desc: t(
        'Per key quotas, group limits and audit trails are on from the first member you invite, not bolted on later.'
      ),
      detail: t('Keys, quotas and audit logs'),
    },
  ]

  return (
    <section className='relative px-5 py-20 sm:px-8 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-12 max-w-xl md:mb-16'>
          <p className='text-muted-foreground/60 text-xs font-semibold tracking-[0.18em] uppercase'>
            {t('Why SuperAI')}
          </p>
          <h2 className='mt-3 text-3xl leading-tight font-semibold tracking-tight md:text-4xl'>
            {t('One gateway between your app and every model')}
          </h2>
        </AnimateInView>

        <div className='grid gap-4 md:grid-cols-3 md:gap-5'>
          {points.map((point, index) => (
            <AnimateInView
              key={point.num}
              delay={index * 90}
              animation='fade-up'
              className='group border-border/60 bg-card/40 hover:border-primary/30 relative overflow-hidden rounded-2xl border p-6 transition-colors duration-300 md:p-7'
            >
              <div
                aria-hidden
                className='from-primary/10 absolute inset-x-0 top-0 h-px bg-gradient-to-r via-transparent to-transparent'
              />
              <div className='flex items-center justify-between'>
                <span className='border-border/60 bg-muted/40 text-muted-foreground flex size-9 items-center justify-center rounded-xl border'>
                  <point.icon className='text-primary size-4' strokeWidth={1.7} />
                </span>
                <span className='text-muted-foreground/30 font-mono text-xs tabular-nums'>
                  {point.num}
                </span>
              </div>
              <h3 className='mt-6 text-lg font-semibold tracking-tight'>
                {point.title}
              </h3>
              <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>
                {point.desc}
              </p>
              <p className='text-muted-foreground/50 border-border/50 mt-6 border-t pt-4 text-xs'>
                {point.detail}
              </p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
