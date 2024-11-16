"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { DeleteModal } from "../modal/DeleteModal";
// import { DataTableRowActions } from "./data-table-row-actions";

export interface TransactionProps {
  id: number;
  email: string;
  transaction: number;
  tag: string;
  name: string;
  timestamp: string;
  userTransactionId: number;
}

export const columns: ColumnDef<TransactionProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userTransactionId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{row.original.userTransactionId}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  // {
  //   accessorKey: "email",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Email" />
  //   ),
  //   cell: ({ row }) => <div>{row.original.email}</div>,
  //   enableSorting: true,
  //   enableHiding: false,
  // },
  {
    accessorKey: "transaction",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction" />
    ),
    cell: ({ row }) => {
      const transactionValue = row.original.transaction;
      const colorClass =
        transactionValue < 0 ? "text-red-500" : "text-green-500";
      const formattedValue = `₹${Math.abs(transactionValue).toFixed(2)}`;

      return <div className={colorClass}>{formattedValue}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "tag",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tag" />
    ),
    cell: ({ row }) => <div>{row.original.tag}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.original.name}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Timestamp" />
    ),
    cell: ({ row }) => (
      <div>{new Date(row.original.timestamp).toLocaleString()}</div>
    ),
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DeleteModal id={row.original.id}>
        <Button variant="ghost" size="icon" className="text-red-500">
          <Trash2 />
        </Button>
      </DeleteModal>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
