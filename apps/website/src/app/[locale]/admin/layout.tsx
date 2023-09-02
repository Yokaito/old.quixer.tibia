import { Section } from '@/components/ui'
import { SectionHeader } from '@/components/ui/Section/Header'
import InnerSection from '@/components/ui/Section/Inner'
import authOptions from '@/sdk/lib/nextauth'
import { getI18n } from '@/sdk/locales/server'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

interface AdminPageProps {
  worlds: React.ReactNode
}

export default async function AdminPage({ worlds }: AdminPageProps) {
  const t = await getI18n()
  const session = await getServerSession(authOptions)

  if (!session || (session?.user && session?.user.type <= 2)) {
    redirect(`/account`)
  }

  return (
    <Section>
      <SectionHeader backgroundColor="green">
        <h1 className="sectionTitle">{t('quixer.account.management')}</h1>
      </SectionHeader>
      <InnerSection>{worlds}</InnerSection>
    </Section>
  )
}
