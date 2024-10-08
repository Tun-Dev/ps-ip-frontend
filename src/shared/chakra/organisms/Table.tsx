import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';

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
                >
                  <Box display="flex" alignItems="center">
                    {header.column.getCanSort() && (
                      <Box ml={2}>
                        {{
                          asc: <TriangleUpIcon />,
                          desc: <TriangleDownIcon />,
                        }[header.column.getIsSorted() as string] ?? (
                          <Text fontSize="xs" opacity={0.5}>
                            ⇅
                          </Text>
                        )}
                      </Box>
                    )}
                    <Text as="span" variant="Body3Semibold" color="grey.500">
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
                <Td key={cell.id}>
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
