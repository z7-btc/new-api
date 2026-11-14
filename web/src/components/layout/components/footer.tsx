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
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { useStatus } from '@/hooks/use-status'
import { useSystemConfig } from '@/hooks/use-system-config'
import { cn } from '@/lib/utils'

interface FooterLink {
  text: string
  href: string
}

interface FooterColumnProps {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  logo?: string
  name?: string
  columns?: FooterColumnProps[]
  copyright?: string
  className?: string
}

function FooterLinkItem(props: { link: FooterLink }) {
  const { t } = useTranslation()
  const isExternal = props.link.href.startsWith('http')
  const label = t(props.link.text)
  const className =
    'text-muted-foreground hover:text-foreground text-sm transition-colors duration-200'

  if (isExternal) {
    return (
      <a
        href={props.link.href}
        target='_blank'
        rel='noopener noreferrer'
        className={className}
      >
        {label}
      </a>
    )
  }

  return (
    <Link to={props.link.href} className={className}>
      {label}
    </Link>
  )
}

// Renders User Agreement / Privacy Policy links inline with the parent's
// copyright row when either is configured in System Settings → Site. Emits
// fragmented siblings so the parent flex container's gap controls spacing.
function LegalLinks(props: { leadingSeparator?: boolean }) {
  const { t } = useTranslation()
  const { status } = useStatus()
  const items: { key: string; label: string; href: string }[] = []
  if (status?.user_agreement_enabled) {
    items.push({
      key: 'user-agreement',
      label: t('User Agreement'),
      href: '/user-agreement',
    })
  }
  if (status?.privacy_policy_enabled) {
    items.push({
      key: 'privacy-policy',
      label: t('Privacy Policy'),
      href: '/privacy-policy',
    })
  }
  if (items.length === 0) {
    return null
  }
  return (
    <>
      {items.map((item, index) => (
        <Fragment key={item.key}>
          {(props.leadingSeparator || index > 0) && (
            <span aria-hidden='true' className='text-muted-foreground/30'>
              ·
            </span>
          )}
          <Link
            to={item.href}
            className='hover:text-foreground transition-colors duration-200'
          >
            {item.label}
          </Link>
        </Fragment>
      ))}
    </>
  )
}

const FALLBACK_COLUMNS: FooterColumnProps[] = [
  {
    title: 'Product',
    links: [
      { text: 'Model Square', href: '/pricing' },
      { text: 'Console', href: '/dashboard' },
      { text: 'About', href: '/about' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { text: 'Docs', href: '/docs' },
      { text: 'Quick Start', href: '/docs#quickstart' },
      { text: 'API Docs', href: '/docs#api' },
    ],
  },
  {
    title: 'Support',
    links: [
      { text: 'FAQ', href: '/docs#faq' },
      { text: 'Pricing', href: '/pricing' },
      { text: 'Documentation', href: '/docs' },
    ],
  },
]

export function Footer(props: FooterProps) {
  const { t } = useTranslation()
  const { systemName, logo: systemLogo, footerHtml } = useSystemConfig()

  const displayLogo = systemLogo || props.logo || '/logo.svg'
  const displayName = systemName || props.name || 'SuperAI'
  const currentYear = new Date().getFullYear()
  const displayColumns = props.columns ?? FALLBACK_COLUMNS

  if (footerHtml) {
    return (
      <footer
        className={cn(
          'border-border/40 relative z-10 border-t',
          props.className
        )}
      >
        <div className='mx-auto w-full max-w-6xl px-6 py-5'>
          <div className='bg-muted/20 border-border/50 flex flex-col items-center justify-between gap-4 rounded-2xl border px-4 py-4 backdrop-blur-sm sm:flex-row sm:px-5'>
            <div
              className='custom-footer text-muted-foreground min-w-0 text-center text-sm sm:text-left'
              dangerouslySetInnerHTML={{ __html: footerHtml }}
            />
            <div className='border-border/60 text-muted-foreground/45 flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t pt-4 text-xs sm:w-auto sm:justify-end sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5'>
              <span>
                &copy; {currentYear} {displayName}.
              </span>
              <LegalLinks leadingSeparator />
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer
      className={cn('border-border/40 relative z-10 border-t', props.className)}
    >
      <div className='mx-auto max-w-6xl px-6 py-12 md:py-16'>
        <div className='flex flex-col justify-between gap-10 md:flex-row md:gap-16'>
          {/* Brand column */}
          <div className='max-w-xs shrink-0'>
            <Link to='/' className='group flex items-center gap-2.5'>
              <img
                src={displayLogo}
                alt={displayName}
                className='size-8 rounded-xl object-contain ring-1 ring-white/10'
              />
              <span className='text-base font-semibold tracking-tight'>
                {displayName}
              </span>
            </Link>
            <p className='text-muted-foreground/70 mt-4 text-sm leading-relaxed'>
              {t('One endpoint for every frontier model.')}
            </p>
            <p className='text-muted-foreground/40 mt-2 text-xs'>
              superai.day
            </p>
          </div>

          {/* Links columns */}
          <div className='grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-14'>
            {displayColumns.map((column) => (
              <div key={column.title}>
                <p className='text-muted-foreground/50 mb-3 text-xs font-medium tracking-wider uppercase'>
                  {t(column.title)}
                </p>
                <ul className='space-y-2.5'>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright + legal links; wraps on narrow screens. */}
        <div className='border-border/30 mt-12 flex flex-col items-center justify-between gap-x-3 gap-y-2 border-t pt-6 sm:flex-row'>
          <div className='text-muted-foreground/40 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:justify-start'>
            <span>
              &copy; {currentYear} {displayName}.{' '}
              {props.copyright ?? t('footer.defaultCopyright')}
            </span>
            <LegalLinks leadingSeparator />
          </div>
          <span className='text-muted-foreground/35 text-xs'>
            {t('Claude & OpenAI compatible API')}
          </span>
        </div>
      </div>
    </footer>
  )
}
