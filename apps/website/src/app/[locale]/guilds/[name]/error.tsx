'use client'

import { Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import { useI18n } from '@/sdk/locales/client'

export default function ErrorPage({ error }: { error: Error }) {
  const t = useI18n()

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="section-title">{t('quixer.geral.guild')}</h1>
      </SectionHeader>
      <InnerSection className="flex items-center justify-center p-6">
        <h2 className="text-3xl text-error font-martel">
          {t('quixer.errors.somethingWentWrong')}
        </h2>
        <p className="font-martel text-secondary">{error.message}</p>
      </InnerSection>
    </Section>
  )
}
