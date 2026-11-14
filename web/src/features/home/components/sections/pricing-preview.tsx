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
import { ArrowRight } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'
import { QUOTA_TYPE_VALUES } from '@/features/pricing/constants'
import { usePricingData } from '@/features/pricing/hooks/use-pricing-data'
import { formatPrice, formatRequestPrice } from '@/features/pricing/lib/price'
import type { PricingModel } from '@/features/pricing/types'

const FEATURED = [
  /gpt-4o-mini/i,
  /gpt-4o/i,
  /claude/i,
  /gemini/i,
  /deepseek/i,
  /qwen/i,
]

function pickModels(models: PricingModel[]): PricingModel[] {
  const picked: PricingModel[] = []
  for (const pattern of FEATURED) {
    const match = models.find(
      (model) =>
        pattern.test(model.model_name) &&
        !picked.some((item) => item.model_name === model.model_name)
    )
    if (match) picked.push(match)
    if (picked.length === 6) break
  }
  if (picked.length < 6) {
    for (const model of models) {
      if (picked.length === 6) break
      if (!picked.some((item) => item.model_name === model.model_name)) {
        picked.push(model)
      }
    }
  }
  return picked
}

export function PricingPreview() {
  const { t } = useTranslation()
  const { models, isLoading } = usePricingData()

  const featured = useMemo(() => pickModels(models).slice(0, 6), [models])

  return (
    <section className='border-border/40 relative border-t px-5 py-20 sm:px-8 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
          <div className='max-w-xl'>
            <p className='text-muted-foreground/60 text-xs font-semibold tracking-[0.18em] uppercase'>
              {t('Model pricing')}
            </p>
            <h2 className='mt-3 text-3xl leading-tight font-semibold tracking-tight md:text-4xl'>
              {t('Same models, one price list')}
            </h2>
            <p className='text-muted-foreground mt-3 text-sm leading-relaxed'>
              {t(
                'Prices below are per million tokens and update with the model square. No seats, no minimum spend.'
              )}
            </p>
          </div>
          <Link
            to='/pricing'
            className='text-primary group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium'
          >
            {t('View all models')}
            <ArrowRight className='size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
          </Link>
        </AnimateInView>

        {isLoading ? (
          <div className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className='border-border/50 bg-card/40 h-[148px] animate-pulse rounded-2xl border'
              />
            ))}
          </div>
        ) : featured.length === 0 ? (
          <div className='border-border/60 bg-card/40 mt-10 flex flex-col items-start gap-3 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-muted-foreground text-sm'>
              {t('The model price list is available in the model square.')}
            </p>
            <Link
              to='/pricing'
              className='text-primary inline-flex items-center gap-1.5 text-sm font-medium'
            >
              {t('Open the model square')}
              <ArrowRight className='size-4' />
            </Link>
          </div>
        ) : (
          <div className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {featured.map((model, index) => {
              const perRequest =
                model.quota_type === QUOTA_TYPE_VALUES.REQUEST
              const input = formatPrice(model, 'input', 'M', false, 1, 1)
              const output = formatPrice(model, 'output', 'M', false, 1, 1)
              const requestPrice = formatRequestPrice(model, false, 1, 1)
              return (
                <AnimateInView
                  key={model.model_name}
                  delay={index * 60}
                  animation='fade-up'
                  className='border-border/60 bg-card/40 hover:border-primary/30 group relative overflow-hidden rounded-2xl border p-5 transition-colors'
                >
                  <div className='flex items-start justify-between gap-3'>
                    <div className='min-w-0'>
                      <p className='truncate font-mono text-sm font-medium'>
                        {model.model_name}
                      </p>
                      <p className='text-muted-foreground/70 mt-1 text-xs'>
                        {model.vendor_name || t('Model provider')}
                      </p>
                    </div>
                    <span className='border-border/50 text-muted-foreground/70 rounded-full border px-2 py-0.5 text-[10px] font-medium'>
                      {perRequest ? t('Per request') : '1M tokens'}
                    </span>
                  </div>

                  {perRequest ? (
                    <p className='mt-6 font-mono text-2xl font-semibold tabular-nums'>
                      {requestPrice}
                      <span className='text-muted-foreground/60 ml-1 text-xs font-normal'>
                        / {t('request')}
                      </span>
                    </p>
                  ) : (
                    <div className='mt-5 grid grid-cols-2 gap-3'>
                      <div>
                        <p className='text-muted-foreground/60 text-[11px]'>
                          {t('Input')}
                        </p>
                        <p className='mt-1 font-mono text-lg font-semibold tabular-nums'>
                          {input}
                        </p>
                      </div>
                      <div>
                        <p className='text-muted-foreground/60 text-[11px]'>
                          {t('Output')}
                        </p>
                        <p className='mt-1 font-mono text-lg font-semibold tabular-nums'>
                          {output}
                        </p>
                      </div>
                    </div>
                  )}

                  <Link
                    to='/pricing'
                    className='text-muted-foreground group-hover:text-primary mt-5 inline-flex items-center gap-1 text-xs font-medium transition-colors'
                  >
                    {t('Details')}
                    <ArrowRight className='size-3' />
                  </Link>
                </AnimateInView>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
