'use client'

import Image from 'next/image'
import { Button } from '../..'
import { DebouncedInput } from '../../Input/Debounced'
import { useI18n } from '@/sdk/locales/client'
import CaretTop from '@/assets/images/buttons/caret_top.gif'

type Props = {
  globalFilter: string | undefined
  setGlobalFilter: (_value: string) => void
  nextPage: () => void
  previousPage: () => void
  hasNextPage: boolean
  hasPreviousPage: boolean
  numberOfPages: number
  activePage: number
  numberOfItems: number
  setPageSize: (_value: number) => void
}

export const Pagination = ({
  setGlobalFilter,
  globalFilter,
  nextPage,
  previousPage,
  hasNextPage,
  hasPreviousPage,
  activePage,
  numberOfPages,
  numberOfItems,
  setPageSize,
}: Props) => {
  const t = useI18n()

  return (
    <>
      <div className="flex items-center gap-2">
        <label className="label" htmlFor="globalFilter">
          {t('quixer.geral.filter')}:{' '}
        </label>
        <DebouncedInput
          name="globalFilter"
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className="flex-1 input"
          placeholder={t('quixer.geral.searchAllColumns')}
        />
      </div>
      <div className="flex items-center justify-end gap-2">
        <div className="flex gap-2">
          <Button
            onClick={previousPage}
            disabled={hasPreviousPage}
            className="rotate-[-90deg] scale-x-[-1] disabled:opacity-50"
          >
            <Image src={CaretTop} alt="Caret Top" quality={100} />
          </Button>
          <Button
            onClick={nextPage}
            disabled={hasNextPage}
            className="rotate-90 disabled:opacity-50"
          >
            <Image src={CaretTop} alt="Caret Top" quality={100} />
          </Button>
        </div>
        <select
          className="input"
          value={numberOfItems}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {t('quixer.geral.show')} {pageSize}
            </option>
          ))}
        </select>
        <span className="text-sm font-medium text-secondary">
          {activePage} {t('quixer.geral.of')} {numberOfPages}
        </span>
      </div>
    </>
  )
}

export default Pagination
