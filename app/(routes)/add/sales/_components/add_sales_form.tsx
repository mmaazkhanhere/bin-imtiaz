"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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

import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { IInventoryItem } from "@/types/interface";
import { InventorySize } from "@prisma/client";

const formSchema = z.object({
  inventoryId: z.string().min(1, "Please select an inventory item."),
  sizeId: z.string().min(1, "Please select a size."),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
  price: z.coerce.number().min(0, "Price must be a positive number."),
  seller: z.string().min(1, "Seller is required."),
  color: z.string().min(1, "Color is required."),
});

const AddSalesForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inventoryId: "",
      sizeId: "",
      quantity: 0,
      price: 0,
      seller: "",
      color: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const [inventories, setInventories] = useState<IInventoryItem[]>([]);
  const [sizes, setSizes] = useState<InventorySize[]>([]);
  const [, setSelectedInventoryId] = useState<string | null>(null);

  const { isSubmitting, isValid } = form.formState;

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get("/api/inventory");
        setInventories(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching inventories:", err);
        setLoading(false);
      }
    };

    fetchInventories();
  }, []);

  const fetchSizes = async (inventoryId: string) => {
    try {
      const response = await axios.get(`/api/inventory/${inventoryId}/size`);
      setSizes(response.data);
    } catch (err) {
      console.error("Error fetching sizes:", err);
      setSizes([]);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("/api/sales", values);

      if (response.status === 200) {
        form.reset(); // Reset form fields
        toast({
          title: "Sale added successfully",
        });
      } else {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding sale:", error);
      toast({
        title: "Internal Server Error",
        variant: "destructive",
      });
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center space-y-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-[450px]" />
          <Skeleton className="h-3 w-[400px]" />
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5 max-w-2xl w-full mx-auto "
      >
        <section className="flex flex-col md:flex-row gap-x-5 ">
          <div className="flex flex-col space-y-8 w-full">
            <FormField
              control={form.control}
              name="inventoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedInventoryId(value); // Set selected inventory ID
                        fetchSizes(value); // Fetch sizes for selected inventory
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {inventories.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.productName} - {item.category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select the product you sold.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!sizes.length} // Disable if no sizes available
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.size} (Available: {size.stockAvailable})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select the size of the product you sold.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color of Product</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Black" {...field} />
                  </FormControl>
                  <FormDescription>
                    What is the color of product
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col space-y-8 w-full pt-8 md:pt-0">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Sold</FormLabel>
                  <FormControl>
                    <Input type="number" step="1" min={0} {...field} />
                  </FormControl>
                  <FormDescription>
                    For what price did you sold it
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" step="1" min={1} {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the quantity of the product you sold
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      <SelectItem value="Muhammed Ai">Muhammed Ali</SelectItem>
                      <SelectItem value="Noman Khan">Noman Khan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Who sold the product</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <Button disabled={isSubmitting || !isValid} type="submit">
          Add Sales
        </Button>
      </form>
    </Form>
  );
};

export default AddSalesForm;
