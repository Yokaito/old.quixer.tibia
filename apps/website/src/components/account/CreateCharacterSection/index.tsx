'use client'

import { Button, Case, Container, Switch } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { trpc } from '@/sdk/lib/trpc/client'
import { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.scss'
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
    <div className={styles.qxCreateCharacterSection}>
      <p data-qx-create-info-guide>{t('quixer.character.create.guide')}</p>
      <Container title={t('quixer.account.characters.create')}>
        <form onSubmit={handleSubmit(handleDataSubmit)}>
          <InnerContainer data-qx-create-info-character>
            <div
              data-qx-create-info-name
              data-qx-form-input-error={!!errors?.name}
            >
              <label data-qx-create-info-title>{t('quixer.geral.name')}:</label>
              <input type="text" {...register('name')} />
            </div>
            <div data-qx-create-info-sex>
              <label data-qx-create-info-title>{t('quixer.geral.sex')}:</label>
              <label data-qx-create-info-radio>
                <input {...register('sex')} type="radio" name="sex" value={1} />
                <span>{t('quixer.geral.male')}</span>
              </label>
              <label data-qx-create-info-radio>
                <input {...register('sex')} type="radio" name="sex" value={0} />
                <span>{t('quixer.geral.female')}</span>
              </label>
            </div>
          </InnerContainer>
          <InnerContainer data-qx-create-character-worlds>
            <div data-qx-worlds-title>
              <h1>{t('quixer.character.create.worlds')}</h1>
            </div>
            <div data-qx-worlds-location>
              <div>
                <h1 data-qx-worlds-subtitle>
                  {t('quixer.character.create.filter')}
                </h1>
                <p data-qx-worlds-paragraph>
                  {t('quixer.character.create.filterDescription')}
                </p>
              </div>
              <div data-qx-worlds-items>
                {locations.data?.map((itemLocation, idx) => (
                  <label
                    data-qx-worlds-input-label
                    htmlFor={itemLocation.clientValue}
                    key={idx}
                  >
                    <button
                      data-qx-worlds-button
                      onClick={() => setLocation(itemLocation.id)}
                    >
                      <Image src={LocationAllImage} alt="location" />
                    </button>
                    <div data-qx-worlds-input-wrapper>
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
            <div data-qx-worlds-pvp-type>
              <div>
                <h1 data-qx-worlds-subtitle>
                  {t('quixer.character.create.filterPvp')}
                </h1>
                <p data-qx-worlds-paragraph>
                  {t('quixer.character.create.filterPvpDescription')}
                </p>
              </div>
              <div data-qx-worlds-items>
                {pvpTypes.data?.map((itemPvpType, idx) => (
                  <label
                    data-qx-worlds-input-label
                    htmlFor={itemPvpType.serverType}
                    key={idx}
                  >
                    <button
                      data-qx-worlds-button
                      onClick={() => setPvpType(itemPvpType.id)}
                    >
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
                    <div data-qx-worlds-input-wrapper>
                      <input
                        type="radio"
                        name={itemPvpType.serverType}
                        value={itemPvpType.id}
                        checked={itemPvpType.id === pvpType}
                        onChange={() => setPvpType(itemPvpType.id)}
                      />
                      <span>{itemPvpType.name}</span>
                    </div>
                    <span data-qx-worlds-input-span>
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
              <div data-qx-worlds-world-items>
                {worlds.data?.map((world) => (
                  <label data-qx-worlds-world-item key={world.id}>
                    <input
                      type="radio"
                      {...register('worldId')}
                      value={world.id}
                    />
                    <span data-qx-worlds-world-item-title>{world.name}</span>
                  </label>
                ))}
              </div>
            )}
          </InnerContainer>
          {Object.keys(errors).length > 0 && (
            <InnerContainer data-qx-form-errors-wrapper>
              <h2 data-qx-form-errors-title>{t('quixer.geral.attention')}</h2>
              {Object.entries(errors).map(([key, value]) => {
                if (!value.message) return null

                let keyName = key

                switch (key) {
                  case 'name':
                    keyName = t('quixer.geral.name')
                    break
                  case 'sex':
                    keyName = t('quixer.geral.sex')
                  case 'worldId':
                    keyName = t('quixer.geral.world')
                    break
                  default:
                    break
                }

                return (
                  <li data-qx-form-error-item key={key}>
                    <span>
                      <b>{keyName}:</b>
                      {value.message}
                    </span>
                  </li>
                )
              })}
            </InnerContainer>
          )}

          <div data-qx-create-form-actions>
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
