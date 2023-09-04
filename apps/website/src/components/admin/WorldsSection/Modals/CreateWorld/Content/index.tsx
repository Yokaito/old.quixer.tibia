'use client'

import { Button, Container } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { trpc } from '@/sdk/lib/trpc/client'
import { useI18n } from '@/sdk/locales/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

type CreateWorldContentProps = {
  handleModal: (_value: boolean) => void
}

export const CreateWorldContent = ({
  handleModal,
}: CreateWorldContentProps) => {
  const t = useI18n()
  const utils = trpc.useContext()
  const locations = trpc.worlds.locations.useQuery()
  const pvpTypes = trpc.worlds.pvpTypes.useQuery()
  const { data, isLoading, error, mutate } = trpc.worlds.create.useMutation()
  const schema = z.object({
    name: z.string().nonempty({
      message: t('quixer.errors.required'),
    }),
    location: z.string().nonempty({
      message: t('quixer.errors.required'),
    }),
    pvp_type: z.string().nonempty({
      message: t('quixer.errors.required'),
    }),
    ip: z
      .string()
      .nonempty({
        message: t('quixer.errors.required'),
      })
      .regex(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, {
        message: t('quixer.errors.invalidIP'),
      }),
    port: z
      .string()
      .nonempty({
        message: t('quixer.errors.required'),
      })
      .regex(/^[0-9]{1,5}$/, {
        message: t('quixer.errors.invalidPort'),
      }),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      pvp_type: '1',
      location: '1',
    },
    resolver: zodResolver(schema),
  })

  const handleDataSubmit = useCallback(
    async (data: z.infer<typeof schema>) => {
      mutate({
        ...data,
        port: Number(data.port),
        location: Number(data.location),
        pvpType: Number(data.pvp_type),
      })
    },
    [mutate]
  )

  useEffect(() => {
    if (!data) return

    toast.success(t('quixer.success.worldCreated'))
    utils.worlds.all.invalidate()
    handleModal(false)
  }, [data, utils, handleModal, t])

  useEffect(() => {
    if (!error) return

    toast.error(error?.message)
  }, [error])

  return (
    <Container title={`Create World`} onClose={() => handleModal(false)}>
      <form onSubmit={handleSubmit(handleDataSubmit)}>
        <InnerContainer
          className="flex flex-col gap-2"
          data-qx-world-edit-inputs
        >
          <div data-qx-world-input className="flex flex-col gap-1">
            <label className="label">{t('quixer.geral.name')}</label>
            <input className="input" type="text" {...register('name')} />
          </div>

          <div
            data-qx-world-group-input
            className="flex flex-col items-center gap-2 2xl:gap-1 2xl:flex-row"
          >
            <div data-qx-world-input className="flex flex-col flex-1 gap-1">
              <label className="label">{t('quixer.geral.ip')}</label>
              <input className="input" type="text" {...register('ip')} />
            </div>
            <div data-qx-world-input className="flex flex-col gap-1">
              <label className="label">{t('quixer.geral.port')}</label>
              <input className="input" type="number" {...register('port')} />
            </div>
          </div>
          <div data-qx-world-input className="flex flex-col gap-1">
            <label className="label">{t('quixer.geral.location')}</label>
            <select className="input" {...register('location')}>
              {locations.data?.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          <div data-qx-world-input className="flex flex-col gap-1">
            <label className="label">{t('quixer.geral.pvpType')}</label>
            <select className="input" {...register('pvp_type')}>
              {pvpTypes.data?.map((pvpType) => (
                <option key={pvpType.id} value={pvpType.id}>
                  {pvpType.name}
                </option>
              ))}
            </select>
          </div>
        </InnerContainer>
        {Object.keys(errors).length > 0 && (
          <InnerContainer
            data-qx-form-errors-wrapper
            className="flex flex-col gap-2 p-3"
          >
            <h2
              data-qx-form-errors-title
              className="text-base font-bold text-secondary"
            >
              {t('quixer.geral.attention')}
            </h2>
            <ul>
              {Object.entries(errors).map(([key, value]) => {
                if (!value.message) return null

                let keyName = key

                switch (key) {
                  case 'name':
                    keyName = t('quixer.geral.name')
                    break
                  case 'location':
                    keyName = t('quixer.geral.location')
                    break
                  case 'pvp_type':
                    keyName = t('quixer.geral.pvpType')
                    break
                  case 'ip':
                    keyName = t('quixer.geral.ip')
                    break
                  case 'port':
                    keyName = t('quixer.geral.port')
                    break
                  default:
                    break
                }

                return (
                  <li data-qx-form-error-item key={key}>
                    <span className="flex items-center gap-1 text-sm text-error">
                      <b className="font-bold capitalize text-secondary">
                        {keyName}:
                      </b>
                      {value.message}
                    </span>
                  </li>
                )
              })}
            </ul>
          </InnerContainer>
        )}
        <InnerContainer>
          <footer className="flex justify-between gap-3">
            <Button
              variant="red"
              type="button"
              onClick={() => handleModal(false)}
            >
              {t('quixer.geral.close')}
            </Button>
            <Button disabled={isLoading} variant="green" type="submit">
              {t('quixer.geral.confirm')}
            </Button>
          </footer>
        </InnerContainer>
      </form>
    </Container>
  )
}
