"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import apiClient from "@/app/api";
import { toast } from "@/hooks/use-toast";

export function AddTransactionModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [name, setName] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [tag, setTag] = useState("Food & Dining");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name || !transactionType || !amount) {
      alert("Please fill in all fields");
      return;
    }

    const adjustedAmount =
      transactionType === "debit"
        ? -Math.abs(parseFloat(amount))
        : parseFloat(amount);

    setLoading(true);

    try {
      await apiClient.post("/api/transaction-log/create", {
        name: name,
        email: localStorage.getItem("email"),
        transaction: adjustedAmount,
        tag,
      });
      toast({ description: "Transaction added successfully" });
      setOpen(false);
    } catch (error) {
      console.error("Failed to add transaction", error);
      toast({
        description: "Something went wrong while adding the transaction",
      });
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new transaction
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Grocery Shopping"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 150.75"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="transactionType" className="text-right">
              Type
            </Label>
            <Select
              onValueChange={(value) => setTransactionType(value)}
              defaultValue=""
            >
              <SelectTrigger className="w-full col-span-3">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Transaction Type</SelectLabel>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="debit">Debit</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tag" className="text-right">
              Tag
            </Label>
            <Select
              onValueChange={(value) => setTag(value)}
              defaultValue="Food & Dining"
            >
              <SelectTrigger className="w-full col-span-3">
                <SelectValue placeholder="Select Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Transaction Tag</SelectLabel>
                  <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Utilities & Bills">
                    Utilities & Bills
                  </SelectItem>
                  <SelectItem value="Entertainment & Leisure">
                    Entertainment & Leisure
                  </SelectItem>
                  <SelectItem value="Health & Personal Care">
                    Health & Personal Care
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
