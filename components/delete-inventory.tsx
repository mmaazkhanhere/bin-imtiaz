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

type Props = {
  inventoryId: string;
  onDeleteSuccess: () => void;
};

const DeleteInventory = ({ inventoryId, onDeleteSuccess }: Props) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(`/api/inventory/${inventoryId}`);
      if (response.status === 200) {
        toast.success("Inventory Deleted");
        onDeleteSuccess(); // Refresh the table data
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("ERROR DELETING INVENTORY: ", error);
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Delete">
          <Trash aria-label="Delete Inventory" className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this inventory?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            inventory item.
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

export default DeleteInventory;
