'use client'

import { Button, Container } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { FormErrors } from '@/components/ui/Errors/FormErrors'
import { trpc } from '@/sdk/lib/trpc/client'
import { useI18n } from '@/sdk/locales/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

export const CreateGuildSection = () => {
  const router = useRouter()
  const { mutateAsync, isLoading } = trpc.guilds.create.useMutation()
  const worlds = trpc.worlds.all.useQuery()
  const myCharactersAllowToCreateGuild =
    trpc.players.getMyCharactersAllowToCreateGuild.useQuery()
  const t = useI18n()
  const schema = z.object({
    name: z
      .string()
      .nonempty({
        message: t('quixer.errors.required'),
      })
      .min(4, {
        message: t('quixer.errors.minLength', { min: 4 }),
      })
      .max(20, {
        message: t('quixer.errors.maxLength', { max: 20 }),
      })
      // letter and numbers and spaces
      .regex(/^[a-zA-Z0-9 ]*$/, {
        message: t('quixer.errors.onlyLettersAndNumbers'),
      }),
    world: z
      .string()
      .nonempty({
        message: t('quixer.errors.required'),
      })
      .regex(/^[0-9]*$/, {
        message: t('quixer.errors.onlyNumbers'),
      }),
    leader: z
      .string()
      .nonempty({
        message: t('quixer.errors.required'),
      })
      .regex(/^[0-9]*$/, {
        message: t('quixer.errors.onlyNumbers'),
      }),
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const handleCreateGuild = useCallback(
    (fields: z.infer<typeof schema>) => {
      mutateAsync(
        {
          name: fields.name,
          worldId: Number(fields.world),
          ownerId: Number(fields.leader),
          logo: '/guild/default_logo.gif',
        },
        {
          onSuccess: () => {
            toast.success('Guild created successfully')
            reset()
            router.push(`/guilds/${fields.name}`)
          },
          onError: (error) => {
            toast.error(error?.message)
            reset()
          },
        }
      )
    },
    [mutateAsync, reset, router]
  )

  return (
    <div className="flex flex-col gap-2">
      <Container title="Found Guild">
        <form onSubmit={handleSubmit(handleCreateGuild)}>
          <InnerContainer className="flex flex-col gap-2">
            <div className="flex gap-2">
              <label htmlFor="name" className="w-16 label">
                {t('quixer.geral.name')}:
              </label>
              <input className="flex-1 input" {...register('name')} />
            </div>
            <div className="flex flex-1 gap-2">
              <label htmlFor="world" className="w-16 label">
                {t('quixer.geral.world')}:
              </label>
              <select className="flex-1 input" {...register('world')}>
                <option value="">{t('quixer.geral.selectWorld')}</option>
                {worlds.data?.map((world) => (
                  <option key={world.id} value={world.id}>
                    {world.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-1 gap-2">
              <label htmlFor="world" className="w-16 label">
                {t('quixer.geral.leader')}:
              </label>
              <select className="flex-1 input" {...register('leader')}>
                <option value="">{t('quixer.geral.selectCharacter')}</option>
                {myCharactersAllowToCreateGuild.data?.map((character) => (
                  <option key={character.id} value={character.id}>
                    {character.name}
                  </option>
                ))}
              </select>
            </div>
          </InnerContainer>
          <FormErrors fields={errors} />
          <InnerContainer className="flex justify-end">
            <Button
              disabled={
                isLoading ||
                worlds.isLoading ||
                myCharactersAllowToCreateGuild.isLoading
              }
              type="submit"
              variant="info"
            >
              {t('quixer.geral.createGuild')}
            </Button>
          </InnerContainer>
        </form>
      </Container>
      <Container title="Information">
        <InnerContainer>
          <p className="text-sm text-justify text-secondary">
            Do you want to found a new guild? In order to do that, you need a
            premium account and none of your characters may hold one of the two
            highest ranks in any other guild. Note that you need four other
            players with premium accounts that also meet these requirements,
            before the guild is active in the game.
          </p>
          <p className="text-sm text-justify text-secondary">
            Now enter the name of the new guild, select the world it should
            exist on, specify the name of your character that should become the
            first leader and confirm with your account password. Then click on
            Submit. Note that the first two data cannot be changed later.
          </p>
        </InnerContainer>
      </Container>
    </div>
  )
}

export default CreateGuildSection
