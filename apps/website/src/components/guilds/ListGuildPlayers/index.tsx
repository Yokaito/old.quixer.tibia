'use client'

import InnerContainer from '@/components/ui/Container/Inner'
import Pagination from '@/components/ui/Table/Pagination'
import { useMediaQuery } from '@/sdk/hooks/useMediaQuery'
import { useI18n } from '@/sdk/locales/client'
import { defaultFormat } from '@/sdk/utils/date-format'
import { getVocationName } from '@/sdk/utils/get-vocation'
import { cn } from '@/sdk/utils/tailwind'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type Player = {
  name: string
  vocation: number
  level: number
  rank: string
  online: boolean
  surname?: string
  createdAt: Date | null
}

type Props = {
  players: Player[]
}

export const ListGuildPlayers = ({ players = [] }: Props) => {
  const t = useI18n()
  const [globalFilter, setGlobalFilter] = useState('')
  const matches = useMediaQuery('(min-width: 768px)')
  const [columnVisibility, setColumnVisibility] = useState<any>({
    createdAt: false,
  })

  const columns = useMemo<ColumnDef<Player>[]>(() => {
    return [
      {
        header: t('quixer.geral.ranking'),
        accessorKey: 'rank',
        cell: (info) => info.getValue(),
      },
      {
        header: t('quixer.geral.name'),
        accessorKey: 'name',
        cell: (info) => {
          const surname = info.row.original.surname
          const value = info.getValue() as string

          return (
            <Link className="text-info" href={`/characters/${value}`}>
              <span className="mr-2 underline">{value}</span>
              {surname && (
                <span className="text-xs no-underline text-secondary">
                  ({surname})
                </span>
              )}
            </Link>
          )
        },
      },
      {
        header: t('quixer.geral.vocation'),
        accessorKey: 'vocation',
        cell: (info) => getVocationName(info.getValue() as number),
      },
      {
        header: t('quixer.geral.level'),
        accessorKey: 'level',
        cell: (info) => info.getValue(),
      },
      {
        header: t('quixer.geral.joined'),
        accessorKey: 'createdAt',
        cell: (info) => {
          const value = info.getValue() as Date

          return defaultFormat(value, 'en')
        },
      },
      {
        header: t('quixer.account.characters.table.status'),
        accessorKey: 'online',
        cell: (info) => {
          const value = info.getValue()
            ? t('quixer.geral.online')
            : t('quixer.geral.offline')

          return (
            <span
              className={cn({
                'text-green-500': info.getValue(),
                'text-red-500': !info.getValue(),
              })}
            >
              {value}
            </span>
          )
        },
      },
    ]
  }, [t])

  const table = useReactTable({
    data: players,
    columns: columns,
    state: {
      globalFilter,
      columnVisibility,
    },
    initialState: {
      columnVisibility: {
        createdAt: false,
      },
    },
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // how to show more then 10 items per page
  })

  useEffect(() => {
    setColumnVisibility((prev: any) => ({
      ...prev,
      createdAt: matches,
    }))
  }, [table, matches])

  return (
    <>
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
      <InnerContainer className="flex flex-col gap-3 p-0 border-none">
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
    </>
  )
}
