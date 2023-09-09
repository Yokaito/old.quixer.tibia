import { Section } from '@/components/ui'
import Icon from '@/components/ui/Icon'
import { SectionHeader } from '@/components/ui/Section/Header'
import Link from 'next/link'
import { getI18n } from '@/sdk/locales/server'
import { serverClient } from '@/sdk/lib/trpc/server'

export const InfoSection = async () => {
  const t = await getI18n()
  const onlines = await serverClient.worlds.online()

  const online = onlines.reduce((acc, curr) => {
    acc += curr.players
    return acc
  }, 0)

  const onlineWorlds = onlines.reduce((acc, curr) => {
    if (curr.isOnline) {
      acc++
    }

    return acc
  }, 0)

  return (
    <Section>
      <SectionHeader>
        <div className="flex justify-between w-full h-full">
          <div className="flex items-center gap-3">
            <Link
              className="flex items-center text-white text-[10px] no-underline gap-1 hover:underline"
              href="/"
            >
              <Icon name="Twitch" width={20} height={20} />
              <Icon name="Broadcast" width={12} height={12} />
              <span>194</span>
              <Icon name="Eye" width={12} height={12} />
              <span>4417</span>
            </Link>
            <Link
              className="hidden md:flex items-center text-white text-[10px] no-underline gap-1 hover:underline"
              href="/"
            >
              <Icon name="Youtube" width={20} height={20} />
              <Icon name="Broadcast" width={12} height={12} />
              <span>194</span>
              <Icon name="Eye" width={12} height={12} />
              <span>4417</span>
            </Link>
            <Link
              className="hidden md:flex items-center text-white text-[10px] no-underline gap-1 hover:underline"
              href="/"
            >
              <Icon name="Download" width={20} height={20} />
              <span>{t('quixer.info.bar.fankit')}</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              className="flex items-center text-white text-[10px] no-underline gap-1 hover:underline"
              href="/"
            >
              <Icon name="UsersThree" width={20} height={20} />
              <span>
                {onlineWorlds > 0 ? (
                  <>
                    {online} {t('quixer.info.bar.online')}
                  </>
                ) : (
                  'Server Offline'
                )}
              </span>
            </Link>
          </div>
        </div>
      </SectionHeader>
    </Section>
  )
}

export default InfoSection
