'use client'
import React, { useMemo } from 'react'
import { Button, Container } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { trpc } from '@/sdk/lib/trpc/client'
import { EditWorldModal } from './Modals/EditWorld'
import { DeleteWorldModal } from './Modals/DeleteWorld'
import { CreateWorldModal } from './Modals/CreateWorld'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
} from '@tanstack/react-table'
import CaretTop from '@/assets/images/buttons/caret_top.gif'
import Image from 'next/image'
import { DebouncedInput } from '@/components/ui/Input/Debounced'
import { useI18n } from '@/sdk/locales/client'

type World = {
  name: string
  id: number
  creation: string | null
  location: number
  pvp_type: number
  premium_type: number
  transfer_type: number
  battle_eye: boolean
  world_type: number
  ip: string
  port: number
  world_location: {
    name: string
  }
  world_pvptype: {
    name: string
  }
}

export default function WorldsSection() {
  const { data: worlds } = trpc.worlds.all.useQuery()
  const [globalFilter, setGlobalFilter] = React.useState('')
  const t = useI18n()

  const columns = useMemo<ColumnDef<World>[]>(() => {
    return [
      {
        header: t('quixer.geral.id'),
        accessorKey: 'id',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'name',
        header: t('quixer.geral.name'),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'world_location.name',
        header: t('quixer.geral.location'),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'world_pvptype.name',
        header: t('quixer.geral.pvpType'),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'ip',
        header: t('quixer.geral.ip'),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'port',
        header: t('quixer.geral.port'),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'creation',
        header: t('quixer.geral.creation'),
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
          const world = info.row.original

          return (
            <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
              <DeleteWorldModal worldId={world.id} worldName={world.name} />
              <EditWorldModal worldId={world.id} worldName={world.name} />
            </div>
          )
        },
      },
    ]
  }, [t])

  const table = useReactTable({
    data: worlds ?? [],
    columns: columns,
    initialState: {
      columnVisibility: {
        id: false,
        creation: false,
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
    <Container title={t('quixer.geral.worlds')}>
      <InnerContainer className="flex flex-col justify-between gap-3 md:flex-row">
        <div className="flex items-center gap-2">
          <label className="label" htmlFor="globalFilter">
            {t('quixer.geral.filter')}:{' '}
          </label>
          <DebouncedInput
            name="globalFilter"
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            className="input"
            placeholder={t('quixer.geral.searchAllColumns')}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rotate-[-90deg] scale-x-[-1] disabled:opacity-50"
            >
              <Image src={CaretTop} alt="Caret Top" quality={100} />
            </Button>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rotate-90 disabled:opacity-50"
            >
              <Image src={CaretTop} alt="Caret Top" quality={100} />
            </Button>
          </div>
          <select
            className="input"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {t('quixer.geral.show')} {pageSize}
              </option>
            ))}
          </select>
          <span className="text-sm font-medium text-secondary">
            {table.getState().pagination.pageIndex + 1} {t('quixer.geral.of')}{' '}
            {table.getPageCount()}
          </span>
        </div>
      </InnerContainer>
      <InnerContainer className="flex flex-col gap-3">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="text-base font-bold border-b border-r text-secondary bg-1000 border-quintenary last:border-r-0"
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
                      className="text-center py-1 px-[2px] border-b border-r border-quintenary text-sm text-secondary md:p-1 last:border-b-0 last:border-r-0"
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
        <CreateWorldModal />
      </InnerContainer>
    </Container>
  )
}
