<script setup lang="ts" generic="TData extends Bookmark, TValue">
import { ref } from 'vue'
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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import EditBookmark from '@/components/forms/EditBookmark.vue'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const table = useVueTable({
  get data() { return props.data },
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
  <div class="flex items-center py-4">
    <Input
      :model-value="table.getColumn('name')?.getFilterValue() as string"
      class="max-w-sm"
      placeholder="Filter by name..."
      @update:model-value="table.getColumn('name')?.setFilterValue($event)" 
    />
  </div>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()" 
          :key="headerGroup.id"
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
                  <EditBookmark
                    :bookmark="row.original"
                    @cancel="row.toggleExpanded()" 
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
    <!-- Pagination controls; "x of foo rows selected" -->
    <div class="flex-1 text-sm text-muted-foreground">
      {{ table.getFilteredSelectedRowModel().rows.length }} of
      {{ table.getFilteredRowModel().rows.length }} row(s) selected.
    </div>
    <!-- Pagination controls; next and previous buttons -->
    <div class="flex items-center justify-end py-4 space-x-2">
      <Button
        id="prev-page"
        variant="outline"
        size="sm"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        Previous
      </Button>
      <Button
        id="next-page"
        variant="outline"
        size="sm"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        Next
      </Button>
    </div>
  </div>
</template>
