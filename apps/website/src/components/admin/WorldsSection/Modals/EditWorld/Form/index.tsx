'use client'

import { Button, Container } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { FormErrors } from '@/components/ui/Errors/FormErrors'
import { trpc } from '@/sdk/lib/trpc/client'
import { useI18n } from '@/sdk/locales/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

type EditWorldModalProps = {
  worldId: number
  worldName: string
  handleClose: (_value: boolean) => void
}

export const FormEditWorld = ({
  worldId,
  worldName,
  handleClose,
}: EditWorldModalProps) => {
  const t = useI18n()
  const utils = trpc.useContext()
  const world = trpc.worlds.world.useQuery(worldId)
  const locations = trpc.worlds.locations.useQuery()
  const pvpTypes = trpc.worlds.pvpTypes.useQuery()
  const { data, error, mutate, isLoading } = trpc.worlds.edit.useMutation()
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
    values: {
      name: world.data?.name ?? '',
      location: String(world.data?.location),
      pvp_type: String(world.data?.pvp_type),
      ip: world.data?.ip ?? '',
      port: String(world.data?.port),
    },
    resetOptions: {
      keepDefaultValues: true,
    },
    defaultValues: useMemo(() => {
      return {
        name: world.data?.name,
        location: String(world.data?.location),
        pvp_type: String(world.data?.pvp_type),
        ip: world.data?.ip,
        port: String(world.data?.port),
      }
    }, [world.data]),
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
  })

  const handleDataSubmit = useCallback(
    async (data: z.infer<typeof schema>) => {
      mutate({
        id: worldId,
        ip: data.ip,
        location: Number(data.location),
        pvpType: Number(data.pvp_type),
        name: data.name,
        port: Number(data.port),
      })
    },
    [mutate, worldId]
  )

  useEffect(() => {
    if (!data) return

    toast.success(t('quixer.success.worldEdit'))
    utils.worlds.world.invalidate(worldId)
    utils.worlds.all.invalidate()
    handleClose(false)
  }, [data, utils, worldId, handleClose, t])

  useEffect(() => {
    if (!error) return

    toast.error(error?.message)
  }, [error])

  return (
    <Container
      title={`${t('quixer.geral.editing')}, ${worldName}`}
      onClose={() => handleClose(false)}
    >
      <form onSubmit={handleSubmit(handleDataSubmit)}>
        <InnerContainer className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 ">
            <label className="label">{t('quixer.geral.id')}</label>
            <input
              className="input"
              type="number"
              disabled
              defaultValue={world.data?.id}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="label">{t('quixer.geral.name')}</label>
            <input className="input" type="text" {...register('name')} />
          </div>

          <div className="flex flex-col gap-2 2xl:flex-row 2xl:gap-1">
            <div className="flex flex-col gap-1 2xl:flex-1">
              <label className="label">{t('quixer.geral.ip')}</label>
              <input className="input" type="text" {...register('ip')} />
            </div>
            <div className="flex flex-col gap-1 ">
              <label className="label">{t('quixer.geral.port')}</label>
              <input className="input" type="number" {...register('port')} />
            </div>
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="label">{t('quixer.geral.location')}</label>
            <select className="input" {...register('location')}>
              {locations.data?.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 ">
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
        <FormErrors fields={errors} />
        <InnerContainer>
          <footer className="flex flex-row justify-between gap-3">
            <Button
              variant="red"
              type="button"
              onClick={() => handleClose(false)}
            >
              {t('quixer.geral.close')}
            </Button>
            <Button
              variant="green"
              type="submit"
              disabled={
                isLoading ||
                pvpTypes.isLoading ||
                locations.isLoading ||
                world.isLoading
              }
            >
              {t('quixer.geral.confirm')}
            </Button>
          </footer>
        </InnerContainer>
      </form>
    </Container>
  )
}
