'use client'
import React, { useMemo } from 'react'
import { Button, Container } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { trpc } from '@/sdk/lib/trpc/client'
import styles from './styles.module.scss'
import { EditWorldModal } from './Modals/EditWorld'
import { DeleteWorldModal } from './Modals/DeleteWorld'
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
            <div data-qx-actions-world>
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
    <Container
      title={t('quixer.geral.worlds')}
      className={styles.qxWorldsSection}
    >
      <InnerContainer data-qx-world-header-table>
        <div data-qx-world-filter>
          <label htmlFor="globalFilter">{t('quixer.geral.filter')}: </label>
          <DebouncedInput
            name="globalFilter"
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 font-lg shadow border border-block"
            placeholder={t('quixer.geral.searchAllColumns')}
          />
        </div>
        <div data-qx-world-pagination>
          <div>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              data-qx-world-table-pagination-button="previous"
            >
              <Image src={CaretTop} alt="Caret Top" quality={100} />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              data-qx-world-table-pagination-button="next"
            >
              <Image src={CaretTop} alt="Caret Top" quality={100} />
            </button>
          </div>
          <select
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
          <span data-qx-worlds-page-count>
            {table.getState().pagination.pageIndex + 1} {t('quixer.geral.of')}{' '}
            {table.getPageCount()}
          </span>
        </div>
      </InnerContainer>
      <InnerContainer data-qx-world-section-container>
        <table data-qx-table-worlds>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
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
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
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
      <InnerContainer data-qx-world-table-actions>
        <Button variant="info">{t('quixer.geral.createWorld')}</Button>
      </InnerContainer>
    </Container>
  )
}
