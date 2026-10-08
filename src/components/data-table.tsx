"use client";

import {
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHead,
  TableHeader,
  TableHeaderGroup,
  TableProvider,
  TableRow,
  type ColumnDef,
} from "@/components/kibo-ui/table";

/** Sortable shadcn/kibo data table. Column defs are built client-side from simple specs. */
export type Col<T> = {
  key: string;
  title: string;
  value: (r: T) => string | number | null;
  render?: (r: T) => React.ReactNode;
  className?: string;
};

export function DataTable<T>({ rows, cols }: { rows: T[]; cols: Col<T>[] }) {
  const columns: ColumnDef<T, unknown>[] = cols.map((c) => ({
    id: c.key,
    accessorFn: (r) => c.value(r) ?? "",
    header: ({ column }) => <TableColumnHeader column={column} title={c.title} className={c.className} />,
    cell: ({ row }) => <div className={c.className}>{c.render ? c.render(row.original) : (c.value(row.original) ?? "—")}</div>,
  }));
  return (
    <TableProvider columns={columns} data={rows}>
      <TableHeader>
        {({ headerGroup }) => (
          <TableHeaderGroup key={headerGroup.id} headerGroup={headerGroup}>
            {({ header }) => <TableHead key={header.id} header={header} />}
          </TableHeaderGroup>
        )}
      </TableHeader>
      <TableBody>
        {({ row }) => (
          <TableRow key={row.id} row={row}>
            {({ cell }) => <TableCell key={cell.id} cell={cell} />}
          </TableRow>
        )}
      </TableBody>
    </TableProvider>
  );
}
