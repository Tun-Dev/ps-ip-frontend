/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormStatus } from '@/utils';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  SkeletonText,
  Spinner,
  Stack,
  StackProps,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { MdSortByAlpha } from 'react-icons/md';

type MetaType = {
  isCentered?: boolean;
};

interface ReusableTableProps<T extends object> extends Omit<StackProps, 'onClick'> {
  data: T[];
  columns: ColumnDef<T>[];
  onClick?: (row: T) => void;
  headerBgColor?: string;
  onSelectionChange?: (selectedRows: T[]) => void;
  selectable?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  onRefresh?: () => void;
  selectedChildren?: React.ReactNode;
}

function ReusableTable<T extends object>({
  data,
  columns,
  onClick,
  headerBgColor,
  onSelectionChange,
  selectable = false,
  isLoading,
  isError,
  onRefresh,
  selectedChildren,
  ...props
}: ReusableTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  // Update columns to include checkbox selection
  const selectionColumn: ColumnDef<T> = React.useMemo(
    () => ({
      id: 'select',
      header: ({ table }) => {
        const rows = table.getRowModel().rows;
        // const eligible = rows.filter(
        //   (row) => row.original.status !== FormStatus.APPROVED && row.original.status !== FormStatus.DISAPPROVED
        // );
        // if row.original has no status field, treat it as “not approved/disapproved”
        const eligible = rows.filter((row) => {
          const st = (row.original as any).status as FormStatus | undefined;
          return st !== FormStatus.APPROVED && st !== FormStatus.DISAPPROVED;
        });

        const allSelected = eligible.length > 0 && eligible.every((r) => r.getIsSelected());
        const someSelected = eligible.some((r) => r.getIsSelected()) && !allSelected;

        return (
          <Checkbox
            isChecked={allSelected}
            isIndeterminate={someSelected}
            onChange={(e) => {
              const checked = e.target.checked;
              const newSelection: RowSelectionState = {};
              if (checked) {
                eligible.forEach((r) => {
                  newSelection[r.id] = true;
                });
              }
              table.setRowSelection(newSelection);
            }}
          />
        );
      },
      cell: ({ row }) => (
        <Flex onClick={(e) => e.stopPropagation()}>
          <Checkbox
            isChecked={row.getIsSelected()}
            isIndeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </Flex>
      ),
      size: 20,
    }),
    []
  );

  const tableData = React.useMemo(() => (isLoading ? Array(10).fill({}) : data), [isLoading, data]);

  const tableColumns = React.useMemo(() => {
    if (isLoading) return columns.map((column) => ({ ...column, cell: () => <SkeletonText noOfLines={1} /> }));
    if (selectable) return [selectionColumn, ...columns];
    return columns;
  }, [columns, isLoading, selectable, selectionColumn]);

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: (updater) => {
      // Type-safe row selection update
      const newSelection = typeof updater === 'function' ? updater(rowSelection) : updater;

      setRowSelection(newSelection);

      // Convert selected row indices to original data
      const selectedRows = Object.keys(newSelection).map((key) => data[parseInt(key, 10)]);

      // Call selection change callback
      onSelectionChange?.(selectedRows);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      {isLoading ? (
        <Flex flex="1 1 0%" alignItems="center" justifyContent="center">
          <Spinner size="md" />
        </Flex>
      ) : data.length === 0 || isError ? (
        <Flex flex="1 1 0%" flexDir="column" alignItems="center" justifyContent="center" gap="4" p="6">
          <Text variant="Body2Semibold" color="grey.500">
            {isError ? 'An error occurred' : 'No data available'}
          </Text>
          {!!onRefresh && (
            <Button variant="tertiary" border="1px solid" borderColor="secondary.500" onClick={onRefresh} size="medium">
              {isError ? 'Retry' : 'Refresh'}
            </Button>
          )}
        </Flex>
      ) : (
        <Stack
          gap="4"
          padding="8px 10px 10px"
          boxShadow="banner"
          borderRadius="12px"
          border="1px solid"
          borderColor="grey.100"
          {...props}
        >
          {Object.keys(rowSelection).length > 0 && selectedChildren && (
            <Flex justifyContent="flex-end" gap="16px">
              {selectedChildren}
            </Flex>
          )}
          <TableContainer width="100%">
            <Table>
              <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id} h="8">
                    {headerGroup.headers.map((header, index) => (
                      <Th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                        bg={headerBgColor ?? 'primary.50'}
                        border="none"
                        borderLeftRadius={index === 0 ? '6px' : ''}
                        borderRightRadius={index === headerGroup.headers.length - 1 ? '6px' : ''}
                        p="0.375rem 0.75rem"
                        textTransform="capitalize"
                        w={`${header.column.getSize()}px`}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent={(header.column.columnDef.meta as MetaType)?.isCentered ? 'center' : 'normal'}
                          gap="1"
                        >
                          {header.column.getCanSort() && (
                            <>
                              {{
                                asc: <TriangleUpIcon color="primary.600" boxSize="3" />,
                                desc: <TriangleDownIcon color="primary.600" boxSize="3" />,
                              }[header.column.getIsSorted() as string] ?? (
                                <Icon as={MdSortByAlpha} color="primary.600" boxSize="3" />
                              )}
                            </>
                          )}
                          <Text
                            as="span"
                            variant="Body3Semibold"
                            color="grey.500"
                            flex={(header.column.columnDef.meta as MetaType)?.isCentered ? 'none' : '1'}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </Text>
                        </Box>
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.map((row) => (
                  <Tr
                    key={row.id}
                    borderBottomColor="grey.500"
                    bgColor={row.getIsSelected() ? 'secondary.50' : undefined}
                    onClick={onClick ? () => onClick(row.original) : undefined}
                    cursor={onClick ? 'pointer' : undefined}
                    _hover={onClick ? { bgColor: 'primary.50' } : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <Td key={cell.id} p="0.5rem 0.75rem" w={`${cell.column.getSize()}px`}>
                        <Text
                          as="div"
                          variant="Body2Semibold"
                          color="text"
                          textAlign={(cell.column.columnDef.meta as MetaType)?.isCentered ? 'center' : 'left'}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Text>
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </>
  );
}

export { ReusableTable };
