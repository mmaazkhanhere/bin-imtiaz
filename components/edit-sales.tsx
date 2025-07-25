"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { IInventoryItem } from "@/types/interface";
import { InventorySize, Sales } from "@prisma/client";

interface EditSalesProps {
  saleId: string;
  sale: Sales & { sizes: InventorySize };
  onEditSuccess: () => void;
}

const EditSales = ({ saleId, sale, onEditSuccess }: EditSalesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inventories, setInventories] = useState<IInventoryItem[]>([]);
  const [sizes, setSizes] = useState<InventorySize[]>([]);

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          // Fetch inventories
          const invResponse = await axios.get("/api/inventory");
          setInventories(invResponse.data);

          // Fetch sizes for the current inventory
          const sizeResponse = await axios.get(
            `/api/inventory/${sale.inventoryId}/size`
          );
          setSizes(sizeResponse.data);

          setLoading(false);
        } catch (err) {
          console.error("Error fetching data:", err);
          toast("Error loading data");
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isOpen, sale.inventoryId]);

  const formSchema = z.object({
    size: z.coerce.number().min(1, "Size must be at least 1."),
    quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
    price: z.coerce.number().min(0, "Price must be a positive number."),
    color: z.string().min(1, "Color is required."),
    seller: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size: sale.size,
      quantity: sale.quantity,
      price: sale.price,
      color: sale.color,
      seller: sale.seller,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/sales/${sale.id}`, {
        ...values,
        originalSize: sale.size,
        originalQuantity: sale.quantity,
      });

      toast("Sale updated successfully");
      onEditSuccess();
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating sale:", error);
      toast("Error updating sale");
    }
  };

  const currentInventory = inventories.find(
    (inv) => inv.id === sale.inventoryId
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Edit">
          <Pencil aria-label="Edit Sale" className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Sale Entry</DialogTitle>
          <DialogDescription>
            Update price, size, quantity, and color for this sale.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Product (read-only) */}
              <div className="grid gap-2">
                <label className="text-sm font-medium">Product</label>
                <div className="p-2 border rounded-md bg-gray-50">
                  {currentInventory
                    ? `${currentInventory.productName} - ${currentInventory.category}`
                    : "Product not found"}
                </div>
              </div>

              {/* Size */}
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={String(field.value)}
                        defaultValue={String(field.value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizes.map((size) => (
                            <SelectItem key={size.id} value={String(size.size)}>
                              {size.size} (Available: {size.stockAvailable})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Color */}
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Sold</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min={0}
                        placeholder="Enter price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quantity */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={sizes[0].stockAvailable}
                        placeholder="Enter quantity"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Seller */}
              <FormField
                control={form.control}
                name="seller"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seller</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Who sold the product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Muhammed Ai">
                          Muhammed Ali
                        </SelectItem>
                        <SelectItem value="Noman Khan">Noman Khan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || !isValid}>
                  Update Sale
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditSales;
