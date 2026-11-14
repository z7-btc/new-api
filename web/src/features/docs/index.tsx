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
import { ArrowRight, KeyRound, Terminal, Wallet } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PublicLayout } from '@/components/layout'
import { Footer } from '@/components/layout/components/footer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useSystemConfig } from '@/hooks/use-system-config'

type Copy = {
  eyebrow: string
  title: string
  lead: string
  quickTitle: string
  steps: { title: string; body: string }[]
  apiTitle: string
  apiLead: string
  sdkTitle: string
  sdkLead: string
  faqTitle: string
  faqs: { q: string; a: string }[]
  supportTitle: string
  supportLead: string
  supportCta: string
  ctaTitle: string
  ctaBody: string
  ctaButton: string
}

const ZH: Copy = {
  eyebrow: '接入文档',
  title: '十分钟接入 SuperAI',
  lead: 'SuperAI 提供 OpenAI 兼容接口。把 base_url 换成我们的地址，原有的 SDK 和代码基本不用改。',
  quickTitle: '快速开始',
  steps: [
    {
      title: '创建账号并生成密钥',
      body: '注册后进入控制台，在「密钥」里新建一个 API Key。密钥只在创建时完整显示一次，请立刻保存。',
    },
    {
      title: '替换 base_url',
      body: '把请求地址指向 https://superai.day/v1，Authorization 使用 Bearer 加上你的密钥。模型名填控制台「模型广场」里的名称。',
    },
    {
      title: '发一次请求',
      body: '用下面的命令验证连通性。返回 200 与正常的 JSON，就说明已经接好了。',
    },
  ],
  apiTitle: '接口示例',
  apiLead:
    '所有接口遵循 OpenAI 规范，聊天补全走 /v1/chat/completions，流式响应传 stream: true。',
  sdkTitle: 'SDK 配置',
  sdkLead:
    'OpenAI 官方 SDK、LangChain、LlamaIndex、Cherry Studio 等客户端都可以直接指向 SuperAI。',
  faqTitle: '常见问题',
  faqs: [
    {
      q: '和直接用官方 API 有什么区别？',
      a: '接口协议一致，区别在于计费与路由。你在一个账户里管理多个模型供应商，按实际用量付费，不用分别开户和充值。',
    },
    {
      q: '支持流式输出吗？',
      a: '支持。请求体里带 stream: true 即可，返回标准的 SSE 数据流。',
    },
    {
      q: '密钥泄露了怎么办？',
      a: '在控制台「密钥」页面立即删除该密钥并新建一个。删除即时生效，旧密钥的请求会被拒绝。',
    },
    {
      q: '怎么查看用量和账单？',
      a: '控制台的用量日志按模型、密钥和时间段记录每次调用，账单按 token 数量结算，充值余额实时扣减。',
    },
    {
      q: '调用返回 429 是什么原因？',
      a: '通常是触发了速率限制或余额不足。先看控制台的用量与余额，再确认当前分组是否有并发限制。',
    },
    {
      q: '可以开团队子账号吗？',
      a: '可以。管理员可以在用户管理里创建成员、分配分组与额度，每个成员使用自己的密钥。',
    },
  ],
  supportTitle: '需要帮助',
  supportLead:
    '接入过程中遇到问题，请带上请求时间、模型名和返回的错误码联系我们，排查会快很多。',
  supportCta: '查看模型广场',
  ctaTitle: '准备好接入了吗',
  ctaBody: '注册后即可获得密钥，按量付费，随时可以停用。',
  ctaButton: '免费注册',
}

const EN: Copy = {
  eyebrow: 'Documentation',
  title: 'Ship on SuperAI in ten minutes',
  lead: 'SuperAI speaks the OpenAI API. Point base_url at our endpoint and your existing SDK code keeps working.',
  quickTitle: 'Quick start',
  steps: [
    {
      title: 'Create an account and a key',
      body: 'Sign up, open the console, and create an API key under Keys. The full key is shown once, so store it right away.',
    },
    {
      title: 'Point base_url at SuperAI',
      body: 'Send requests to https://superai.day/v1 with a Bearer token. Use any model name listed in the Model Square.',
    },
    {
      title: 'Send a request',
      body: 'Run the command below. A 200 response with normal JSON means you are connected.',
    },
  ],
  apiTitle: 'API examples',
  apiLead:
    'Every endpoint follows the OpenAI spec. Chat completions live at /v1/chat/completions, and streaming uses stream: true.',
  sdkTitle: 'SDK configuration',
  sdkLead:
    'The official OpenAI SDKs, LangChain, LlamaIndex and desktop clients such as Cherry Studio can all target SuperAI.',
  faqTitle: 'Frequently asked',
  faqs: [
    {
      q: 'How is this different from calling providers directly?',
      a: 'The protocol is the same. The difference is billing and routing: one account, one balance, and usage based pricing across providers.',
    },
    {
      q: 'Does it support streaming?',
      a: 'Yes. Send stream: true and the response is a standard SSE stream.',
    },
    {
      q: 'What if a key leaks?',
      a: 'Delete it in the console under Keys and create a new one. Revocation applies immediately.',
    },
    {
      q: 'Where do I see usage and invoices?',
      a: 'Usage logs record every call by model, key and time range. Billing settles per token and deducts from your balance.',
    },
    {
      q: 'Why do I get a 429?',
      a: 'Usually a rate limit or a low balance. Check usage and balance first, then the concurrency limit for your group.',
    },
    {
      q: 'Can I add teammates?',
      a: 'Yes. Admins can create members, assign groups and quotas, and each member uses their own key.',
    },
  ],
  supportTitle: 'Need help',
  supportLead:
    'Include the request time, model name and error code when you contact us, and we can trace it quickly.',
  supportCta: 'Browse models',
  ctaTitle: 'Ready to connect',
  ctaBody: 'Create an account, get a key, and pay only for what you use.',
  ctaButton: 'Create account',
}

const CURL = `curl https://superai.day/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $SUPERAI_API_KEY" \\
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "你好"}],
    "stream": false
  }'`

const PYTHON = `from openai import OpenAI

client = OpenAI(
    api_key="sk-...",
    base_url="https://superai.day/v1",
)

resp = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "你好"}],
)
print(resp.choices[0].message.content)`

const NODE = `import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.SUPERAI_API_KEY,
  baseURL: 'https://superai.day/v1',
})

const resp = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: '你好' }],
})
console.log(resp.choices[0].message.content)`

function CodeBlock(props: { title: string; code: string }) {
  return (
    <div className='border-border/60 bg-card/70 overflow-hidden rounded-2xl border'>
      <div className='border-border/50 text-muted-foreground flex items-center gap-2 border-b px-4 py-2.5 text-xs font-medium'>
        <Terminal className='size-3.5' />
        {props.title}
      </div>
      <pre className='overflow-x-auto p-4 text-xs leading-relaxed sm:text-[13px]'>
        <code className='font-mono'>{props.code}</code>
      </pre>
    </div>
  )
}

function SectionTitle(props: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={props.id}
      className='scroll-mt-24 text-2xl font-semibold tracking-tight md:text-3xl'
    >
      {props.children}
    </h2>
  )
}

export function Docs() {
  const { i18n } = useTranslation()
  const { systemName } = useSystemConfig()
  const isZh = i18n.resolvedLanguage?.toLowerCase().startsWith('zh')
  const copy = isZh ? ZH : EN
  const brand = systemName || 'SuperAI'

  return (
    <PublicLayout showMainContainer={false}>
      <div className='relative overflow-hidden'>
        <div aria-hidden className='brand-glow -z-10 opacity-70' />
        <div className='mx-auto max-w-5xl px-5 pt-28 pb-16 sm:px-8 sm:pt-32'>
          <p className='text-muted-foreground/60 text-xs font-semibold tracking-[0.18em] uppercase'>
            {copy.eyebrow}
          </p>
          <h1 className='mt-3 max-w-2xl text-4xl leading-tight font-semibold tracking-tight md:text-5xl'>
            {copy.title}
          </h1>
          <p className='text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed'>
            {copy.lead}
          </p>

          <div className='brand-rule mt-10' />

          <div className='mt-10 grid gap-6 sm:grid-cols-3'>
            {[
              { icon: KeyRound, label: isZh ? '密钥' : 'Keys' },
              { icon: Terminal, label: 'OpenAI SDK' },
              { icon: Wallet, label: isZh ? '按量计费' : 'Pay as you go' },
            ].map((item) => (
              <div
                key={item.label}
                className='border-border/60 bg-card/60 flex items-center gap-3 rounded-xl border px-4 py-3'
              >
                <item.icon className='text-primary size-4' />
                <span className='text-sm font-medium'>{item.label}</span>
              </div>
            ))}
          </div>

          <section className='mt-20 space-y-8'>
            <SectionTitle id='quickstart'>{copy.quickTitle}</SectionTitle>
            <ol className='space-y-6'>
              {copy.steps.map((step, index) => (
                <li key={step.title} className='flex gap-4'>
                  <span className='border-primary/30 bg-primary/10 text-primary mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold tabular-nums'>
                    {index + 1}
                  </span>
                  <div className='min-w-0'>
                    <h3 className='text-base font-semibold'>{step.title}</h3>
                    <p className='text-muted-foreground mt-1.5 text-sm leading-relaxed'>
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <CodeBlock title='curl' code={CURL} />
          </section>

          <section className='mt-20 space-y-6'>
            <SectionTitle id='api'>{copy.apiTitle}</SectionTitle>
            <p className='text-muted-foreground max-w-2xl text-sm leading-relaxed'>
              {copy.apiLead}
            </p>
            <div className='grid gap-4 lg:grid-cols-2'>
              <CodeBlock title='Python' code={PYTHON} />
              <CodeBlock title='Node.js' code={NODE} />
            </div>
            <div className='border-border/60 bg-card/50 overflow-hidden rounded-2xl border'>
              <table className='w-full text-left text-sm'>
                <thead className='text-muted-foreground border-border/60 border-b text-xs uppercase'>
                  <tr>
                    <th className='px-4 py-3 font-medium'>Method</th>
                    <th className='px-4 py-3 font-medium'>Path</th>
                    <th className='px-4 py-3 font-medium'>
                      {isZh ? '说明' : 'Purpose'}
                    </th>
                  </tr>
                </thead>
                <tbody className='text-muted-foreground'>
                  {[
                    ['POST', '/v1/chat/completions', isZh ? '对话补全' : 'Chat'],
                    ['POST', '/v1/embeddings', isZh ? '向量化' : 'Embeddings'],
                    ['GET', '/v1/models', isZh ? '模型列表' : 'Model list'],
                  ].map(([method, path, purpose]) => (
                    <tr key={path} className='border-border/40 border-b last:border-0'>
                      <td className='text-primary px-4 py-3 font-mono text-xs'>
                        {method}
                      </td>
                      <td className='px-4 py-3 font-mono text-xs'>{path}</td>
                      <td className='px-4 py-3'>{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className='mt-20 space-y-4'>
            <SectionTitle id='sdk'>{copy.sdkTitle}</SectionTitle>
            <p className='text-muted-foreground max-w-2xl text-sm leading-relaxed'>
              {copy.sdkLead}
            </p>
          </section>

          <section className='mt-20'>
            <SectionTitle id='faq'>{copy.faqTitle}</SectionTitle>
            <Accordion className='border-border/60 mt-6 rounded-2xl border px-5'>
              {copy.faqs.map((item, index) => (
                <AccordionItem key={item.q} value={`faq-${index}`}>
                  <AccordionTrigger className='py-4 text-sm font-medium'>
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className='text-muted-foreground pb-4 leading-relaxed'>
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section
            id='support'
            className='border-border/60 bg-card/60 mt-20 scroll-mt-24 rounded-2xl border p-6 sm:p-8'
          >
            <h2 className='text-xl font-semibold tracking-tight'>
              {copy.supportTitle}
            </h2>
            <p className='text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed'>
              {copy.supportLead}
            </p>
            <Link
              to='/pricing'
              className='text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:underline'
            >
              {copy.supportCta}
              <ArrowRight className='size-3.5' />
            </Link>
          </section>

          <section className='relative mt-20 overflow-hidden rounded-2xl border border-border/60 px-6 py-10 text-center sm:px-10'>
            <div aria-hidden className='brand-glow -z-10 opacity-60' />
            <h2 className='text-2xl font-semibold tracking-tight md:text-3xl'>
              {copy.ctaTitle}
            </h2>
            <p className='text-muted-foreground mx-auto mt-2 max-w-md text-sm'>
              {copy.ctaBody}
            </p>
            <Link
              to='/sign-up'
              className='bg-primary text-primary-foreground mt-6 inline-flex h-10 items-center gap-1.5 rounded-xl px-5 text-sm font-semibold transition-opacity hover:opacity-90'
            >
              {copy.ctaButton}
              <ArrowRight className='size-4' />
            </Link>
          </section>

          <p className='text-muted-foreground/50 mt-10 text-xs'>
            {brand} · superai.day
          </p>
        </div>
      </div>
      <Footer />
    </PublicLayout>
  )
}
