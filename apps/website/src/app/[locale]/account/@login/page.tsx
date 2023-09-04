import { AccountLoginSection } from '@/components/sections'
import { Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import { authOptions } from '@/sdk/lib/nextauth'
import { getI18n } from '@/sdk/locales/server'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Login() {
  const session = await getServerSession(authOptions)
  const t = await getI18n()

  if (session) {
    redirect('/account')
  }

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="section-title">{t('quixer.account.management')}</h1>
      </SectionHeader>
      <InnerSection>
        <AccountLoginSection />
      </InnerSection>
    </Section>
  )
}
