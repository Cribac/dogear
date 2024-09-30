import { h } from 'vue'
import { ArrowUpDown } from 'lucide-vue-next'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Category } from '@/env'
import { customEventNames } from '@/lib/eventNames'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableDropDown } from '@/components/ui/data-table'

export const columns: ColumnDef<Category>[] = [
  { // select all
    id: 'select',
    header: ({ table }) => h(Checkbox, {
        'checked': table.getIsAllPageRowsSelected(),
        'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
        'ariaLabel': 'Select all',
    }),
    cell: ({ row }) => h(Checkbox, {
        'checked': row.getIsSelected(),
        'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
        'ariaLabel': 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', row.getValue('name')),
  },
  { // display # of bookmarks
    accessorKey: 'bookmark_count',
    header: ({ column }) => {
      return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['# of Bookmarks', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', row.getValue('bookmark_count')),
  },
  { // dropdown component as actions cell
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original

      return h('div', { class: 'relative' }, h(DataTableDropDown, {
        item: { id: category.id, eventName: customEventNames.categoryDelete },
        onExpand: row.toggleExpanded,
      }))
    },
  },
]
