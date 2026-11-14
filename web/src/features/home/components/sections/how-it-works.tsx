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
import { KeyRound, LineChart, Terminal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'

export function HowItWorks() {
  const { t } = useTranslation()

  const steps = [
    {
      num: '1',
      title: t('Create an account and a key'),
      desc: t(
        'Sign up with an email, then generate an API key in the console. Keep one key per project so you can revoke it on its own.'
      ),
      icon: <KeyRound className='size-5' strokeWidth={1.6} />,
    },
    {
      num: '2',
      title: t('Point your SDK at SuperAI'),
      desc: t(
        'Change base_url to https://superai.day/v1 and pick a model name from the model square. The rest of your request stays the same.'
      ),
      icon: <Terminal className='size-5' strokeWidth={1.6} />,
    },
    {
      num: '3',
      title: t('Ship and watch usage'),
      desc: t(
        'Every call is logged with tokens and cost. Balance, quota and rate limits are visible while you run, not a month later.'
      ),
      icon: <LineChart className='size-5' strokeWidth={1.6} />,
    },
  ]

  return (
    <section className='border-border/40 relative border-t px-5 py-20 sm:px-8 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-12 max-w-xl md:mb-16'>
          <p className='text-muted-foreground/60 text-xs font-semibold tracking-[0.18em] uppercase'>
            {t('How it works')}
          </p>
          <h2 className='mt-3 text-3xl leading-tight font-semibold tracking-tight md:text-4xl'>
            {t('Three steps to your first request')}
          </h2>
        </AnimateInView>

        <div className='relative grid gap-6 md:grid-cols-3 md:gap-8'>
          <div
            aria-hidden
            className='border-border/50 absolute top-6 right-12 left-12 hidden border-t border-dashed md:block'
          />
          {steps.map((step, index) => (
            <AnimateInView
              key={step.num}
              delay={index * 110}
              animation='fade-up'
              className='relative'
            >
              <div className='bg-background border-border/60 text-primary flex size-12 items-center justify-center rounded-2xl border'>
                {step.icon}
              </div>
              <div className='mt-5 flex items-baseline gap-2'>
                <span className='text-muted-foreground/40 font-mono text-xs tabular-nums'>
                  0{step.num}
                </span>
                <h3 className='text-base font-semibold'>{step.title}</h3>
              </div>
              <p className='text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed'>
                {step.desc}
              </p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
