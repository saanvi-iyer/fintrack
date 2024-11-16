"use client";

import { Pie, PieChart, Label} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionProps } from "@/components/table/columns";

const possibleTags = [
  { name: "Food & Dining", color: "#FF7043" },
  { name: "Transportation", color: "#42A5F5" },
  { name: "Utilities & Bills", color: "#66BB6A" },
  { name: "Entertainment & Leisure", color: "#FFEB3B" },
  { name: "Health & Personal Care", color: "#AB47BC" },
];
export function ExpenseByTagChart({
  transactions,
}: {
  transactions: TransactionProps[];
}) {
  const expenseData = possibleTags.map((tag) => {
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.tag === tag.name
    );

    const actualExpense = filteredTransactions
      .filter((transaction) => transaction.transaction < 0)
      .reduce((sum, transaction) => sum + transaction.transaction, 0);

    return {
      name: tag.name,
      expense: -1 * actualExpense,
      fill: tag.color,
    };
  });

  const totalExpense = expenseData.reduce(
    (sum, data) => sum + data.expense,
    0
  );

  const chartConfig = possibleTags.reduce((acc, tag) => {
    acc[tag.name] = {
      label: tag.name,
      color: tag.color,
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense by Tag</CardTitle>
        <CardDescription>Total expenses for each tag</CardDescription>
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
              data={expenseData}
              dataKey="expense"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                position="center"
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
                          {totalExpense.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Total Expense
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
            
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
      
      </CardFooter>
    </Card>
  );
}
