'use client'

import { FieldErrors } from 'react-hook-form'
import InnerContainer from '../../Container/Inner'
import { useI18n } from '@/sdk/locales/client'

type FormErrorsProps = {
  fields: FieldErrors<any>
}

export const FormErrors = ({ fields }: FormErrorsProps) => {
  const t = useI18n()

  if (!fields) return null
  if (Object.keys(fields).length === 0) return null

  return (
    <InnerContainer className="flex flex-col gap-2 p-3">
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

          let keyName = ''

          switch (key) {
            case 'title':
              keyName = t('quixer.geral.title')
              break
            case 'type_news':
              keyName = t('quixer.geral.type')
              break
            case 'content':
              keyName = t('quixer.geral.content')
              break
            case 'worldId':
              keyName = t('quixer.geral.world')
              break
            case 'sex':
              keyName = t('quixer.geral.sex')
              break
            case 'name':
              keyName = t('quixer.geral.name')
              break
            case 'email':
              keyName = t('quixer.geral.email')
              break
            case 'password':
              keyName = t('quixer.geral.password')
              break
            case 'confirmPassword':
              keyName = t('quixer.geral.confirmPassword')
              break
            case 'consent':
              keyName = t('quixer.geral.fieldConsent')
              break
            case 'terms':
              keyName = t('quixer.geral.fieldTerms')
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
              keyName = key
              break
          }

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
