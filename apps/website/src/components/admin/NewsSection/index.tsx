'use client'

import { useMemo, useState } from 'react'
import { Container } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { trpc } from '@/sdk/lib/trpc/client'
import { useI18n } from '@/sdk/locales/client'
import EditButtonImg from '@/assets/images/buttons/button-watch-idle.png'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Image from 'next/image'
import { DeleteNewsModal } from './Modals/DeleteNews'

import type { news } from '@prisma/client'
import Link from 'next/link'
import ButtonLink from '@/components/ui/Button/ButtonAsLink'
import Pagination from '@/components/ui/Table/Pagination'

interface News extends Pick<news, 'id' | 'title' | 'visible'> {
  createdAt: string | null
  accounts: {
    email: string
  } | null
  type_news: {
    name: string
  } | null
}

const ActionsTable = ({ id, title }: { id: number; title: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
      <DeleteNewsModal newsId={id} newsTitle={title} />
      <Link href={`/admin/news/edit/${id}`}>
        <Image src={EditButtonImg} alt="Edit" quality={100} />
      </Link>
    </div>
  )
}

export const NewsListSection = () => {
  const { data: news } = trpc.news.getAllWithCreators.useQuery()
  const [globalFilter, setGlobalFilter] = useState('')
  const t = useI18n()

  const columns = useMemo<ColumnDef<News>[]>(() => {
    return [
      {
        header: t('quixer.geral.id'),
        accessorKey: 'id',
        cell: (info) => info.getValue(),
      },
      {
        header: t('quixer.geral.title'),
        accessorKey: 'title',
        cell: (info) => info.getValue(),
      },
      {
        header: t('quixer.geral.state'),
        accessorKey: 'visible',
        cell: (info) => {
          const visible = info.getValue() as boolean

          return visible
            ? t('quixer.geral.visible')
            : t('quixer.geral.notVisible')
        },
      },
      {
        header: t('quixer.geral.type'),
        accessorKey: 'type_news.name',
        cell: (info) => info.getValue(),
      },
      {
        header: t('quixer.geral.creator'),
        accessorKey: 'accounts.email',
        cell: (info) => info.getValue(),
      },
      {
        header: t('quixer.geral.creation'),
        accessorKey: 'createdAt',
        cell: (info) => {
          try {
            return new Date((info.getValue() as Date) ?? '').toLocaleString()
          } catch {
            return t('quixer.errors.invalidDate')
          }
        },
      },
      {
        header: t('quixer.geral.actions'),
        isPlaceholder: true,
        cell: (info) => {
          const news = info.row.original

          return <ActionsTable id={news.id} title={news.title} />
        },
      },
    ]
  }, [t])

  const table = useReactTable({
    data: news ?? [],
    columns: columns,
    initialState: {
      columnSizing: {
        title: 450,
        visible: 50,
        type_news: 100,
        accounts: 100,
        createdAt: 200,
        actions: 10,
      },
      columnVisibility: {
        id: false,
      },
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <Container title={t('quixer.geral.news')}>
      <InnerContainer className="flex flex-col justify-between gap-3 md:flex-row">
        <Pagination
          activePage={table.getState().pagination.pageIndex + 1}
          globalFilter={globalFilter}
          hasNextPage={!table.getCanNextPage()}
          hasPreviousPage={!table.getCanPreviousPage()}
          nextPage={() => table.nextPage()}
          previousPage={() => table.previousPage()}
          numberOfItems={table.getState().pagination.pageSize}
          numberOfPages={table.getPageCount()}
          setGlobalFilter={(value) => setGlobalFilter(value)}
          setPageSize={(value) => table.setPageSize(value)}
        />
      </InnerContainer>
      <InnerContainer className="flex flex-col gap-3">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="text-base font-bold border text-secondary bg-1000 border-quintenary"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr className="odd:bg-800" key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      width={cell.column.getSize()}
                      className="text-center py-1 px-[2px] border-b border-r border-l border-quintenary text-sm text-secondary md:p-1"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </InnerContainer>
      <InnerContainer className="flex justify-end">
        <ButtonLink
          href="/admin/news/create"
          variant="info"
          text={t('quixer.geral.createNews')}
        />
      </InnerContainer>
    </Container>
  )
}
