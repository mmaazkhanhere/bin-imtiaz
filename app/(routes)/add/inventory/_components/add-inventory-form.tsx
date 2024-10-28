"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

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
import { useToast } from "@/hooks/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  productName: z.string().min(4, {
    message: "Product name must be at least 4 characters.",
  }),
  category: z.string(),
  totalStock: z.coerce.number(),
  price: z.coerce.number(),
  color: z.string(),
});

const AddInventoryForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      category: "",
      totalStock: 0,
      price: 0,
      color: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("/api/inventory", {
        ...values, // Spread the form values directly
      });

      if (response.status === 200) {
        form.reset(); // Reset the entire form
        toast({
          title: "Inventory Added",
        });
        router.refresh();
      } else {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding inventory:", error);
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
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
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the product you want to add to your
                    inventory.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Bukram">Bukram</SelectItem>
                      <SelectItem value="Fleese">Fleese</SelectItem>
                      <SelectItem value="2 in 1">2 in 1</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the category to which your product belongs
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" step="1" min={1} {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the total stock of the product
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
                  <FormLabel>Unit Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="1" min={400} {...field} />
                  </FormControl>
                  <FormDescription>
                    What is the price of one product
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
        </section>

        <Button disabled={isSubmitting || !isValid} type="submit">
          Add Invetory
        </Button>
      </form>
    </Form>
  );
};

export default AddInventoryForm;
