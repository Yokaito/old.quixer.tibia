'use client'

import { FieldErrors } from 'react-hook-form'
import InnerContainer from '../../Container/Inner'
import { useI18n } from '@/sdk/locales/client'
import { useMemo } from 'react'

type FormErrorsProps = {
  fields: FieldErrors<any>
}

export const FormErrors = ({ fields }: FormErrorsProps) => {
  const t = useI18n()

  const translations = useMemo(() => {
    return {
      title: t('quixer.geral.title'),
      type_news: t('quixer.geral.type'),
      content: t('quixer.geral.content'),
      worldId: t('quixer.geral.world'),
      world: t('quixer.geral.world'),
      sex: t('quixer.geral.sex'),
      name: t('quixer.geral.name'),
      email: t('quixer.geral.email'),
      password: t('quixer.geral.password'),
      confirmPassword: t('quixer.geral.confirmPassword'),
      consent: t('quixer.geral.fieldConsent'),
      terms: t('quixer.geral.fieldTerms'),
      location: t('quixer.geral.location'),
      pvp_type: t('quixer.geral.pvpType'),
      ip: t('quixer.geral.ip'),
      port: t('quixer.geral.port'),
      leader: t('quixer.geral.leader'),
    }
  }, [t])

  if (!fields) return null
  if (Object.keys(fields).length === 0) return null

  return (
    <InnerContainer className="flex flex-col gap-2 p-1">
      <h2 className="text-base font-bold text-secondary">
        {t('quixer.geral.attention')}
      </h2>
      <ul className="flex flex-col gap-1">
        {Object.entries(fields).map(([key, value]) => {
          if (!value?.message) return null
          const message =
            typeof value === 'string'
              ? t('quixer.errors.somethingWentWrong')
              : (value.message as string)

          let keyName = translations[key as keyof typeof translations] || key

          return (
            <li className="flex items-center gap-1" key={key}>
              <span className="flex items-center gap-1 text-sm text-error">
                <b className="capitalize text-secondary">{keyName}:</b>
                {message}
              </span>
            </li>
          )
        })}
      </ul>
    </InnerContainer>
  )
}
