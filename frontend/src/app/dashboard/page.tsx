"use client";

import Image from "next/image";
import { UserNav } from "@/components/table/user-nav";
import { DataTable } from "@/components/table/data-table";
import { columns, TransactionProps } from "@/components/table/columns";
import apiClient from "../api";
import { useEffect, useState } from "react";

// Async function to fetch transactions
const getTransactions = async (email: string) => {
  try {
    const response = await apiClient.get<TransactionProps[]>(
      `/api/transaction-log/user/${email}`
    );
    return response.data; // Make sure to return only the data part of the response
  } catch (e) {
    console.error(e);
    return []; // Return an empty array in case of an error
  }
};

export default function TaskPage() {
  const [tasks, setTasks] = useState<TransactionProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const transactionData = await getTransactions(
        localStorage.getItem("email") || ""
      );
      setTasks(transactionData);
    };

    fetchData();
  }, []); // Empty dependency array to run only once when the component is mounted

  // Calculate analytics
  const totalBalance = tasks.reduce(
    (acc, transaction) => acc + transaction.transaction,
    0
  );
  const totalCredit = tasks
    .filter((transaction) => transaction.transaction > 0)
    .reduce((acc, transaction) => acc + transaction.transaction, 0);
  const totalDebit = tasks
    .filter((transaction) => transaction.transaction < 0)
    .reduce((acc, transaction) => acc + transaction.transaction, 0);

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your transactions for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">Total Balance</h3>
            <p className="text-xl">₹{totalBalance.toFixed(2)}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">Total Credit</h3>
            <p className="text-xl">₹{totalCredit.toFixed(2)}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">Total Debit</h3>
            <p className="text-xl">₹{Math.abs(totalDebit).toFixed(2)}</p>
          </div>
        </div>

        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
