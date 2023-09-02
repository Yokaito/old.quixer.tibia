'use client'

import { Container } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { trpc } from '@/sdk/lib/trpc/client'
import styles from './styles.module.scss'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

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

const columnHelper = createColumnHelper<World>()

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('world_location.name', {
    header: 'Location',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('world_pvptype.name', {
    header: 'PvP Type',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('ip', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('creation', {
    cell: (info) => new Date(info.getValue() ?? '').toLocaleDateString(),
  }),
]

export default function WorldsSection() {
  const { data: worlds } = trpc.worlds.all.useQuery()

  const table = useReactTable({
    data: worlds ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Container title="Worlds" className={styles.qxWorldsSection}>
      <InnerContainer>
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
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </InnerContainer>
    </Container>
  )
}
