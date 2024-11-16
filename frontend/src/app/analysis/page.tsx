"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Image from "next/image";
import { UserNav } from "@/components/table/user-nav";
import { DataTable } from "@/components/table/data-table";
import { columns, TransactionProps } from "@/components/table/columns";
import apiClient from "../api";
import { useEffect, useState } from "react";
import { ExpenseByTagChart } from "./ExpenseByTagChart";

// Chart Data for Transaction Breakdown
const getChartData = (tasks: TransactionProps[]) => {
  const chartData = [
    { transactionType: "Credit", value: 0, fill: "var(--color-credit)" },
    { transactionType: "Debit", value: 0, fill: "var(--color-debit)" },
    { transactionType: "Balance", value: 0, fill: "var(--color-balance)" },
  ];

  tasks.forEach((transaction: TransactionProps) => {
    if (transaction.transaction > 0) {
      chartData[0].value += transaction.transaction;
    } else if (transaction.transaction < 0) {
      chartData[1].value += Math.abs(transaction.transaction);
    }
    chartData[2].value += transaction.transaction; // Total balance (can be positive or negative)
  });

  return chartData;
};

// Transaction API Call
const getTransactions = async (email: string) => {
  try {
    const response = await apiClient.get<TransactionProps[]>(
      `/api/transaction-log/user/${email}`
    );
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const chartConfig = {
  credit: {
    label: "Credit",
    color: "hsl(var(--chart-1))",
  },
  debit: {
    label: "Debit",
    color: "hsl(var(--chart-2))",
  },
  balance: {
    label: "Balance",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

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

  // Analytics Calculation
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

  const chartData = getChartData(tasks);

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

        {/* Pie Charts for Transactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Existing Transaction Breakdown Chart */}
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Transaction Breakdown</CardTitle>
              <CardDescription>
                Credit, Debit, and Balance Overview
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="transactionType"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalBalance.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Balance
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <ExpenseByTagChart transactions={tasks} />
        </div>

        {/* Data Table for Transactions */}
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
