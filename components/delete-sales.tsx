import React, { useState } from "react";
import axios from "axios";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DeleteSalesProps = {
  saleId: string;
  onDeleteSuccess: () => void; // Callback after successful deletion
};

const DeleteSales = ({ saleId, onDeleteSuccess }: DeleteSalesProps) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`/api/sales/${saleId}`);

      if (response.status === 200) {
        toast.success("Sale deleted successfully");
        onDeleteSuccess();
        setOpen(false);
      }
    } catch (error) {
      console.error("Error deleting sale:", error);
      toast.error("Failed to delete sale");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Delete">
          <Trash aria-label="Delete Sale" className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this sale?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the sale
            record.
            <br />
            <strong>Note:</strong> Deleting this sale will restore the stock
            quantity for the product size.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSales;
