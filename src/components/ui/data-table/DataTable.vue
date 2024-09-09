<script setup lang="ts" generic="TData, TValue">
import { ref, toRef } from 'vue'
import type { 
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  ExpandedState,
} from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { valueUpdater } from '@/lib/utils'
import {
  ControlsContainer,
  SelectionIndicator,
  PaginationButtons
} from '@/components/ui/data-table/pagination-controls'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const table = useVueTable({
  data: toRef(props, 'data'), // enables reactivity; @see https://github.com/radix-vue/shadcn-vue/issues/700#issuecomment-2304498666
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(), // default core table
  getPaginationRowModel: getPaginationRowModel(), // enable pagination
  getSortedRowModel: getSortedRowModel(), // enable sorting
  getFilteredRowModel: getFilteredRowModel(), // enable filtering
  getExpandedRowModel: getExpandedRowModel(), // enable expanded rows
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting), // listen to sorting changes
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters), // listen to column filter changes
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection), // listen to row selection changes
  onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded), // listen to expanded rows changes
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get rowSelection() { return rowSelection.value },
    get expanded() { return expanded.value },
  },
})

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})
</script>

<template>
  <!-- Filter controls -->
  <slot 
    name="filters"
    :table="table"
  />
  <!-- Table -->
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()" 
          :key="headerGroup.id"
          class="hover:bg-transparent"
        >
          <TableHead
            v-for="header in headerGroup.headers" 
            :key="header.id"
          >
            <FlexRender
              v-if="!header.isPlaceholder" 
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <template 
            v-for="row in table.getRowModel().rows" 
            :key="row.id"
          >
            <!-- Default row; hidden when expanded -->
            <TableRow
              v-if="!row.getIsExpanded()"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
              class="data-[state=selected]:bg-muted/50"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()" 
                :key="cell.id"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
            <!-- Expanded row -->
            <TableRow v-if="row.getIsExpanded()">
              <TableCell :colspan="row.getAllCells().length">
                <Suspense>
                  <slot
                    name="edit"
                    :row="row"
                  />
                </Suspense>
              </TableCell>
            </TableRow>
          </template>
        </template>
        <template v-else>
          <TableRow>
            <TableCell
              :colspan="columns.length" 
              class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
    <!-- Pagination controls -->
    <ControlsContainer class="px-4">
      <SelectionIndicator
        :selected-rows="table.getFilteredSelectedRowModel().rows.length"
        :total-rows="table.getFilteredRowModel().rows.length"
        class="flex-1 text-sm text-muted-foreground"
      />
      <PaginationButtons
        :prev-button-disabled="!table.getCanPreviousPage()"
        :next-button-disabled="!table.getCanNextPage()"
        @on-prev-click="table.previousPage()"
        @on-next-click="table.nextPage()"
      />
    </ControlsContainer> 
  </div>
</template>
