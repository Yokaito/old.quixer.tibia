'use client'

import { Button, Case, Container, Switch } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { trpc } from '@/sdk/lib/trpc/client'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import LocationAllImage from '@/assets/images/geral/option_server_location_all.png'
import OptionalPVPImage from '@/assets/images/geral/option_server_pvp_type_optional.gif'
import OpenPVPImage from '@/assets/images/geral/option_server_pvp_type_open.gif'
import HardcorePVPImage from '@/assets/images/geral/option_server_pvp_type_retro.gif'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useI18n } from '@/sdk/locales/client'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export const CreateCharacterSection = () => {
  const router = useRouter()
  const { data, error, mutate, isLoading } = trpc.players.create.useMutation()
  const locations = trpc.worlds.locations.useQuery()
  const pvpTypes = trpc.worlds.pvpTypes.useQuery()
  const [location, setLocation] = useState<number | undefined>(1)
  const [pvpType, setPvpType] = useState<number>(2)
  const t = useI18n()
  const worlds = trpc.worlds.all.useQuery({
    location: location,
    pvpType: pvpType,
  })
  const schema = z.object({
    name: z
      .string()
      .nonempty({
        message: t('quixer.errors.required'),
      })
      .min(3, t('quixer.errors.minLength', { min: 3 }).toString())
      .max(50, t('quixer.errors.maxLength', { max: 10 }).toString()),
    // next item is sex only 1 or 0
    sex: z.string().nonempty({
      message: t('quixer.errors.required'),
    }),
    worldId: z.string().nonempty({
      message: t('quixer.errors.required'),
    }),
  })

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      sex: '1',
    },
    resolver: zodResolver(schema),
  })

  const handleDataSubmit = useCallback(
    async (data: z.infer<typeof schema>) => {
      mutate({
        name: data.name,
        sex: Number(data?.sex),
        worldId: Number(data?.worldId),
      })
    },
    [mutate]
  )

  useEffect(() => {
    if (!data) return

    toast.success(t('quixer.success.createCharacter'))
    router.push('/account')
  }, [data, router, t])

  useEffect(() => {
    if (!error) return

    toast.error(error?.message)
  }, [error])

  useEffect(() => {
    resetField('worldId')
  }, [location, pvpType, resetField])

  return (
    <div className={`flex flex-col gap-5`}>
      <p className="px-3 pt-5 text-base font-medium leading-5 text-center text-secondary">
        {t('quixer.character.create.guide')}
      </p>
      <Container title={t('quixer.account.characters.create')}>
        <form onSubmit={handleSubmit(handleDataSubmit)}>
          <InnerContainer className="flex flex-col gap-2 2xl:flex-row 2xl:gap-5 2xl:items-center">
            <div className="flex items-center flex-1 gap-3 h-max">
              <label className="text-base font-bold text-secondary">
                {t('quixer.geral.name')}:
              </label>
              <input
                type="text"
                {...register('name')}
                className={`w-full input ${
                  !!errors?.name && 'outline outline-1 outline-error'
                }`}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-base font-bold text-secondary">
                {t('quixer.geral.sex')}:
              </label>
              <label className="flex gap-2 text-base text-secondary">
                <input {...register('sex')} type="radio" name="sex" value={1} />
                <span>{t('quixer.geral.male')}</span>
              </label>
              <label className="flex gap-2 text-base text-secondary">
                <input {...register('sex')} type="radio" name="sex" value={0} />
                <span>{t('quixer.geral.female')}</span>
              </label>
            </div>
          </InnerContainer>
          <InnerContainer
            className="flex flex-col"
            style={{
              padding: 0,
            }}
          >
            <div className="px-1 text-base font-bold border-b border-quintenary text-secondary">
              <h1>{t('quixer.character.create.worlds')}</h1>
            </div>
            <div className="flex flex-col gap-4 px-3 py-5 border-b border-quintenary">
              <div>
                <h1 className="text-base font-bold text-secondary">
                  {t('quixer.character.create.filter')}
                </h1>
                <p className="text-sm font-light text-secondary">
                  {t('quixer.character.create.filterDescription')}
                </p>
              </div>
              <div>
                {locations.data?.map((itemLocation) => (
                  <label
                    className="flex flex-col items-center gap-1 text-base font-bold text-secondary"
                    htmlFor={itemLocation.clientValue}
                    key={itemLocation.id}
                  >
                    <button
                      className="p-0 mb-2 bg-transparent border-none cursor-pointer w-max"
                      onClick={() => setLocation(itemLocation.id)}
                    >
                      <Image src={LocationAllImage} alt="location" />
                    </button>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={itemLocation.clientValue}
                        value={itemLocation.id}
                        checked={itemLocation.id === location}
                        onChange={() => setLocation(itemLocation.id)}
                      />
                      <span>{itemLocation.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 px-3 py-5 border-b border-quintenary">
              <div>
                <h1 className="text-base font-bold text-secondary">
                  {t('quixer.character.create.filterPvp')}
                </h1>
                <p className="text-sm font-light text-secondary">
                  {t('quixer.character.create.filterPvpDescription')}
                </p>
              </div>
              <div className="flex flex-wrap items-start justify-center gap-5">
                {pvpTypes.data?.map((itemPvpType) => (
                  <label
                    className="flex flex-col items-center gap-1 text-base font-bold text-secondary"
                    htmlFor={itemPvpType.serverType}
                    key={itemPvpType.id}
                  >
                    <button onClick={() => setPvpType(itemPvpType.id)}>
                      <Switch>
                        <Case condition={itemPvpType.serverType === 'no-pvp'}>
                          <Image
                            src={OptionalPVPImage}
                            alt={itemPvpType.serverType}
                          />
                        </Case>
                        <Case condition={itemPvpType.serverType === 'pvp'}>
                          <Image
                            src={OpenPVPImage}
                            alt={itemPvpType.serverType}
                          />
                        </Case>
                        <Case
                          condition={itemPvpType.serverType === 'pvp-enforced'}
                        >
                          <Image
                            src={HardcorePVPImage}
                            alt={itemPvpType.serverType}
                          />
                        </Case>
                      </Switch>
                    </button>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={itemPvpType.serverType}
                        value={itemPvpType.id}
                        checked={itemPvpType.id === pvpType}
                        onChange={() => setPvpType(itemPvpType.id)}
                      />
                      <span>{itemPvpType.name}</span>
                    </div>
                    <span className="max-w-[200px] text-center text-sm font-light text-secondary">
                      <Switch>
                        <Case condition={itemPvpType.serverType === 'no-pvp'}>
                          <>{t('quixer.character.create.no-pvp')}</>
                        </Case>
                        <Case condition={itemPvpType.serverType === 'pvp'}>
                          <>{t('quixer.character.create.pvp')}</>
                        </Case>
                        <Case
                          condition={itemPvpType.serverType === 'pvp-enforced'}
                        >
                          <>{t('quixer.character.create.pvpEnforced')}</>
                        </Case>
                      </Switch>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {worlds.data?.length !== 0 && (
              <div className="grid grid-cols-2 gap-2 px-3 py-5 2xl:grid-cols-4 bg-1000">
                {worlds.data?.map((world) => (
                  <label
                    className="flex items-center gap-2 cursor-pointer"
                    key={world.id}
                  >
                    <input
                      type="radio"
                      {...register('worldId')}
                      value={world.id}
                    />
                    <span className="text-base text-secondary">
                      {world.name}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </InnerContainer>
          {Object.keys(errors).length > 0 && (
            <InnerContainer className="flex flex-col gap-2 p-3">
              <h2 className="text-base font-bold text-secondary">
                {t('quixer.geral.attention')}
              </h2>
              <ul className="flex flex-col gap-1">
                {Object.entries(errors).map(([key, value]) => {
                  if (!value.message) return null

                  let keyName = key

                  switch (key) {
                    case 'name':
                      keyName = t('quixer.geral.name')
                      break
                    case 'sex':
                      keyName = t('quixer.geral.sex')
                      break
                    case 'worldId':
                      keyName = t('quixer.geral.world')
                      break
                    default:
                      break
                  }

                  return (
                    <li className="flex items-center gap-1" key={key}>
                      <span className="flex items-center gap-1 text-sm text-error">
                        <b className="text-secondary">{keyName}:</b>
                        {value.message}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </InnerContainer>
          )}

          <div className="flex items-center justify-between">
            <Button variant="info" type="submit" onClick={() => router.back()}>
              {t('quixer.geral.back')}
            </Button>
            <Button
              variant="info"
              type="submit"
              disabled={
                isLoading ||
                worlds.isLoading ||
                pvpTypes.isLoading ||
                locations.isLoading ||
                data !== undefined
              }
            >
              {t('quixer.geral.send')}
            </Button>
          </div>
        </form>
      </Container>
    </div>
  )
}

export default CreateCharacterSection
