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
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FAQ_ITEMS = [
  {
    q: 'Do I have to rewrite my code?',
    a: 'No. SuperAI follows the OpenAI API, so the official SDKs work as they are. Set base_url to https://superai.day/v1 and keep your existing request code.',
  },
  {
    q: 'How is billing calculated?',
    a: 'You pay per token, priced at the moment of the call and recorded in the usage log. There is no monthly seat fee, and unused balance stays in your account.',
  },
  {
    q: 'Which models can I call?',
    a: 'Everything listed in the model square: chat, reasoning, embeddings and image models from the providers we have enabled. The list updates as providers come online.',
  },
  {
    q: 'What happens when a provider goes down?',
    a: 'Requests are retried on another healthy upstream of the same model when one is available, and the failure is reflected in the channel status.',
  },
  {
    q: 'Can I limit what a key spends?',
    a: 'Yes. Each key carries its own quota and rate limit, and users belong to groups with their own multipliers. You can revoke a key at any time.',
  },
  {
    q: 'Is my prompt data stored?',
    a: 'Prompts are forwarded to the upstream provider to answer the request. Usage logs keep token counts and metadata, and administrators decide the retention window.',
  },
]

export function FAQ() {
  const { t } = useTranslation()

  return (
    <section className='border-border/40 relative border-t px-5 py-20 sm:px-8 md:py-28'>
      <div className='mx-auto grid max-w-6xl gap-10 md:grid-cols-12 md:gap-16'>
        <AnimateInView className='md:col-span-4'>
          <p className='text-muted-foreground/60 text-xs font-semibold tracking-[0.18em] uppercase'>
            {t('FAQ')}
          </p>
          <h2 className='mt-3 text-3xl leading-tight font-semibold tracking-tight'>
            {t('Questions before you switch')}
          </h2>
          <p className='text-muted-foreground mt-3 text-sm leading-relaxed'>
            {t('Still unsure? The docs cover the request format end to end.')}
          </p>
          <Link
            to='/docs'
            className='text-primary mt-4 inline-block text-sm font-medium hover:underline'
          >
            {t('Read the docs')}
          </Link>
        </AnimateInView>

        <AnimateInView className='md:col-span-8' delay={80}>
          <Accordion className='border-border/60 rounded-2xl border px-5 sm:px-6'>
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={item.q} value={`home-faq-${index}`}>
                <AccordionTrigger className='py-4 text-left text-sm font-medium sm:text-base'>
                  {t(item.q)}
                </AccordionTrigger>
                <AccordionContent className='text-muted-foreground pb-4 text-sm leading-relaxed'>
                  {t(item.a)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimateInView>
      </div>
    </section>
  )
}
