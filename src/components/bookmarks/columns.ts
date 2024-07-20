import { h } from 'vue'
import { ArrowUpDown } from 'lucide-vue-next'
import type { ColumnDef } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import DropdownAction from '@/components/bookmarks/DataTableDropDown.vue'
import UrlItem from '@/components/bookmarks/UrlItem.vue'

export const columns: ColumnDef<Bookmark>[] = [
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
  {
    accessorKey: 'url',
    header: () => h('div', { class: 'text-left' }, 'Url'),
    cell: ({ row }) => {
      const url: string = row.getValue('url')
      return h(UrlItem, { url })
    },
  },
  {
    accessorKey: 'category_name',
    header: () => h('div', { class: 'text-left' }, 'Category'),
    cell: ({ row }) => {
      return h('div', row.getValue('category_name')) 
    },
  },
  { // dropdown component as actions cell
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const bookmark = row.original

      return h('div', { class: 'relative' }, h(DropdownAction, {
        bookmark,
        onExpand: row.toggleExpanded,
      }))
    },
  },
]
