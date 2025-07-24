"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
  productName: z
    .string()
    .min(4, { message: "Product name must be at least 4 characters." }),
  category: z.string(),
  color: z.string(),
  price: z.coerce.number(),
  sizes: z.array(
    z.object({
      size: z.coerce.number(),
      stock: z.coerce.number().nonnegative(),
    })
  ),
});

const AddInventoryForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      category: "",
      color: "",
      price: 0,
      sizes: [{ size: 53, stock: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sizes",
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("/api/inventory", {
        ...values,
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
        className="flex flex-col gap-y-5 max-w-2xl w-full mx-auto pb-5"
      >
        <section className="flex flex-col md:flex-row gap-x-5 ">
          <div className="flex flex-col space-y-8 w-full">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cap Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the cap you want to add to your inventory.
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
                      <SelectItem value="Half Fleese">Half Fleese</SelectItem>
                      <SelectItem value="Full Fleese">Full Fleese</SelectItem>
                      <SelectItem value="2 in 1">2 in 1</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the category to which your cap belongs
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
                  <FormLabel>Color of Cap</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Black" {...field} />
                  </FormControl>
                  <FormDescription>What is the color of cap</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col space-y-8 w-full pt-8 md:pt-0">
            <div className="space-y-4">
              <FormLabel>Sizes</FormLabel>
              {fields.map((item, index) => (
                <div key={item.id} className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name={`sizes.${index}.size`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" placeholder="Size" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`sizes.${index}.stock`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" placeholder="Stock" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => append({ size: 0, stock: 0 })}
              >
                Add Size
              </Button>
            </div>

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="1" min={0} {...field} />
                  </FormControl>
                  <FormDescription>
                    What is the price of one cap
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
