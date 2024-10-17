import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Icon } from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { MdSortByAlpha } from 'react-icons/md';

interface ReusableTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  onClick?: (row: T) => void;
}

function ReusableTable<T extends object>({ data, columns, onClick }: ReusableTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <TableContainer width="100%">
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                  bg="grey.100"
                  border="none"
                  borderLeftRadius={index === 0 ? '6px' : ''}
                  borderRightRadius={index === headerGroup.headers.length - 1 ? '6px' : ''}
                  p="0.375rem 0.75rem"
                  textTransform="capitalize"
                >
                  <Box display="flex" alignItems="center" gap="1">
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
                    <Text as="span" variant="Body3Semibold" color="grey.500" flex="1">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
              onClick={onClick ? () => onClick(row.original) : undefined}
              cursor={onClick ? 'pointer' : undefined}
              _hover={onClick ? { bgColor: 'primary.50' } : undefined}
            >
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id} p="0.5rem 0.75rem">
                  <Text as="span" variant="Body2Semibold" color="text">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Text>
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export { ReusableTable };
