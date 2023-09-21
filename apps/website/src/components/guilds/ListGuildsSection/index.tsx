/* eslint-disable @next/next/no-img-element */
'use client'

import { Container, LogoGuild } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { trpc } from '@/sdk/lib/trpc/client'
import { worlds } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import ButtonLink from '@/components/ui/Button/ButtonAsLink'
import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import { useI18n } from '@/sdk/locales/client'

interface ExtendedWorlds extends worlds {
  world_location: {
    name: string
  }
  world_pvptype: {
    name: string
  }
}

type Props = {
  worlds: ExtendedWorlds[]
}

export const ListGuildsSection = ({ worlds }: Props) => {
  const t = useI18n()
  const searchParams = useSearchParams()
  const worldName = searchParams.get('world')?.toLowerCase() ?? ''
  const [selectedWorld, setSelectedWorld] = useState(worldName)
  const { data } = trpc.guilds.all.useQuery(
    {
      worldName: selectedWorld,
    },
    {
      enabled: !!selectedWorld,
    }
  )

  return (
    <>
      <div className="flex flex-col items-baseline gap-3 md:flex-row">
        <Container title={t('quixer.geral.worlds')} className="flex-1 w-full">
          <InnerContainer>
            <div className="flex items-center gap-2 md:gap-8">
              <label className="label">{t('quixer.geral.worldName')}:</label>
              <select
                className="flex-1 input"
                onChange={(event) => {
                  setSelectedWorld(event.target.value)
                }}
              >
                <option value="">{t('quixer.geral.selectWorld')}</option>
                {worlds.map((world) => (
                  <option key={world.id} value={world.name.toLowerCase()}>
                    {world.name}
                  </option>
                ))}
              </select>
            </div>
          </InnerContainer>
        </Container>
        <Container
          title={t('quixer.geral.actions')}
          className="w-full md:w-max"
        >
          <InnerContainer className="flex justify-center">
            <ButtonLink
              href="/guilds/create"
              text={t('quixer.geral.createGuild')}
              variant="info"
            />
          </InnerContainer>
        </Container>
      </div>
      {data && data?.length !== 0 && (
        <Container title={`Active Guild on ${selectedWorld}`}>
          <InnerContainer>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-2 text-sm font-bold border md:text-base text-secondary bg-1000 border-quintenary">
                    {t('quixer.geral.logo')}
                  </th>
                  <th className="px-2 text-sm font-bold border md:text-base text-start text-secondary bg-1000 border-quintenary">
                    {t('quixer.geral.description')}
                  </th>
                  <th className="px-2 text-sm font-bold border md:text-base text-secondary bg-1000 border-quintenary" />
                </tr>
              </thead>
              <tbody>
                {data.map((guild) => (
                  <tr className="odd:bg-800" key={guild.id}>
                    <td className="py-1 px-2 text-sm text-center border-b border-l border-r border-quintenary text-secondary w-[42px] md:w-[84px]">
                      <LogoGuild logo={guild.logo ?? ''} name={guild.name} />
                    </td>
                    <td className="px-2 py-1 text-sm border-b border-l border-r border-quintenary text-secondary">
                      <h1 className="text-sm font-bold md:text-base ">
                        {guild.name}
                      </h1>
                      <p className="text-xs md:text-sm line-clamp-3 md:line-clamp-5">
                        {guild.motd}
                      </p>
                    </td>
                    <td className="py-1 px-2 text-sm text-center border-b border-l border-r border-quintenary text-secondary w-[15%]">
                      <ButtonLink
                        className="hidden md:flex "
                        text={t('quixer.geral.view')}
                        href={`/guilds/${guild.name}`}
                        variant="info"
                      />
                      <Link
                        href={`/guilds/${guild.name}`}
                        className="flex items-center justify-center p-2 md:p-0"
                      >
                        <Icon
                          name="Link"
                          className="md:hidden"
                          width={22}
                          height={22}
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </InnerContainer>
        </Container>
      )}
    </>
  )
}
