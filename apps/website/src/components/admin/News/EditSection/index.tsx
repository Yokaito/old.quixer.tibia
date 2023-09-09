'use client'

import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import JoditEditor from 'jodit-react'
import { Button, Container } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { trpc } from '@/sdk/lib/trpc/client'
import type { news, type_news } from '@prisma/client'
import { ItemNews } from '@/components/sections/news/Item'
import { useCurrentLocale, useI18n } from '@/sdk/locales/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import classNames from 'classnames'
import { FormErrors } from '@/components/ui/Errors/FormErrors'

type Props = news & {
  type_news: {
    name: type_news['name']
  }
}

export const NewsEditSection = (props: Props) => {
  const t = useI18n()
  const schema = z.object({
    visible: z.boolean(),
    title: z
      .string()
      .nonempty({
        message: t('quixer.errors.required'),
      })
      .min(3, t('quixer.errors.minLength', { min: 3 }).toString())
      .max(50, t('quixer.errors.maxLength', { max: 50 }).toString()),
    type_news: z.string().nonempty({
      message: t('quixer.errors.required'),
    }),
    content: z.string().nonempty({
      message: t('quixer.errors.required'),
    }),
  })

  const utils = trpc.useContext()
  const { mutate, error, data, reset } = trpc.news.editById.useMutation()
  const news = trpc.news.getById.useQuery(props.id, {
    initialData: {
      ...props,
      updatedAt: props.updatedAt?.toString() ?? '',
      createdAt: props.createdAt?.toString() ?? '',
    },
  })
  const typesNews = trpc.news.getTypes.useQuery()
  const editor = useRef(null)
  const [content, setContent] = useState(news.data.content)
  const currentLocale = useCurrentLocale()
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      title: news.data.title,
      content: news.data.content,
      type_news: String(news.data.type_news_id),
    },
    resolver: zodResolver(schema),
  })

  const config = useMemo(() => {
    return {
      readonly: false,
    }
  }, [])

  const handleDataSubmit = useCallback(
    async (data: z.infer<typeof schema>) => {
      mutate({
        id: props.id,
        title: data.title,
        visible: data.visible,
        content: data.content,
      })
    },
    [mutate, props.id]
  )

  useEffect(() => {
    if (!data) return

    toast.success(t('quixer.success.newsEdited'))
    utils.news.getById.invalidate()
    reset()
  }, [data, utils, t, reset])

  useEffect(() => {
    if (!error) return

    toast.error(error?.message)
  }, [error])

  return (
    <>
      <Container title={t('quixer.geral.preview')}>
        <ItemNews
          title={watch('title')}
          content={watch('content')}
          createdAt={props.createdAt}
          locale={currentLocale}
          id={props.id}
          type_news={
            typesNews.data?.find(
              (types) => types.id === Number(watch('type_news'))
            )?.name ?? 'community'
          }
          showEdit={false}
        />
      </Container>
      <Container title={t('quixer.geral.editor')}>
        <form onSubmit={handleSubmit(handleDataSubmit)}>
          <InnerContainer className="flex flex-col gap-3">
            <div className={classNames('flex flex-col gap-1')}>
              <label
                className={classNames('label', {
                  'text-error': errors.title,
                })}
                htmlFor="title"
              >
                {t('quixer.geral.title')}:
              </label>
              <input
                {...register('title')}
                type="text"
                className={classNames('input', {
                  'border-error': errors.title,
                })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className={classNames('label', {
                  'text-error': errors.type_news,
                })}
                htmlFor="type"
              >
                {t('quixer.geral.type')}:
              </label>
              <select
                {...register('type_news')}
                className={classNames('input', {
                  'border-error': errors.type_news,
                })}
              >
                {typesNews.data?.map((type) => (
                  <option value={type.id} key={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-1">
              <span className="label">{t('quixer.geral.visible')}: </span>
              <label className="flex items-center gap-1 text-sm label">
                <input
                  {...register('visible')}
                  defaultChecked={news.data.visible}
                  type="checkbox"
                  className="input"
                />
                {t('quixer.geral.showNews')}
              </label>
            </div>
          </InnerContainer>
          <InnerContainer>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onBlur={(newContent) => {
                setValue('content', newContent)
                setContent(newContent)
              }}
              onChange={(newContent) => {
                setValue('content', newContent)
                setContent(newContent)
              }}
            />
            <input hidden {...register('content')}></input>
          </InnerContainer>
          <FormErrors fields={errors} />
          <InnerContainer className="flex justify-end">
            <Button variant="info" className="button">
              {t('quixer.geral.confirm')}
            </Button>
          </InnerContainer>
        </form>
      </Container>
    </>
  )
}
