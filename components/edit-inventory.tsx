import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { Inventory, InventorySize } from "@prisma/client";

type SizeForm = {
  id?: string; // Include ID for existing sizes
  size: number;
  stock: number;
  stockAvailable: number;
};

type FormValues = {
  productName: string;
  category: string;
  color: string;
  price: number;
  sizes: SizeForm[];
};

type EditInventoryProps = {
  inventoryId: string;
  onEditSuccess: () => void;
  initialData: Inventory & { sizes: InventorySize[] };
};

const EditInventory = ({
  inventoryId,
  onEditSuccess,
  initialData,
}: EditInventoryProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      productName: initialData.productName,
      category: initialData.category,
      color: initialData.color,
      price: initialData.price,
      sizes: initialData.sizes.map((size) => ({
        id: size.id, // Include existing ID
        size: size.size,
        stock: size.stock, // Use current stock instead of stockAvailable
        stockAvailable: size.stockAvailable,
      })),
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(`/api/inventory/${inventoryId}`, {
        ...values,
        sizes: values.sizes.map((size) => ({
          id: size.id,
          size: Number(size.size),
          stock: Number(size.stock),
          stockAvailable: Number(size.stockAvailable),
        })),
      });

      if (response.status === 200) {
        toast.success("Inventory updated successfully");
        onEditSuccess();
        setOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("ERROR UPDATING INVENTORY: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addSizeField = () => {
    const sizes = form.getValues("sizes") || [];
    form.setValue("sizes", [
      ...sizes,
      { size: 0, stock: 0, stockAvailable: 0 },
    ]);
  };

  const removeSizeField = (index: number) => {
    const sizes = form.getValues("sizes") || [];
    const newSizes = sizes.filter((_, i) => i !== index);
    form.setValue("sizes", newSizes);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Edit">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Inventory</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Bukram">Bukram</SelectItem>
                      <SelectItem value="Half Fleese">Half Fleese</SelectItem>
                      <SelectItem value="Full Fleese">Full Fleese</SelectItem>
                      <SelectItem value="2 in 1">2 in 1</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <div className="flex justify-between items-center">
                <FormLabel>Sizes</FormLabel>
                <Button type="button" size="sm" onClick={addSizeField}>
                  Add Size
                </Button>
              </div>

              {form.watch("sizes")?.map((_, index) => (
                <div key={index} className="flex items-end gap-2 mt-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`sizes.${index}.stock`} // Changed to stock
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={index > 0 ? "sr-only" : ""}>
                            Current Stock
                          </FormLabel>{" "}
                          {/* Updated label */}
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Current Stock"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Size input remains same */}
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`sizes.${index}.stockAvailable`} // Changed to stockAvailable
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={index > 0 ? "sr-only" : ""}>
                            Stock Available
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Stock Available"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeSizeField(index)}
                    className="mb-1"
                  >
                    <span className="sr-only">Remove</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInventory;
