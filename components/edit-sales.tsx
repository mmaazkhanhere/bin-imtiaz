import React from "react";
import axios from "axios";
import { Pencil } from "lucide-react";
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

type Props = {};

const EditSales = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Delete">
          <Pencil aria-label="Delete Inventory" className="w-4 h-4" />
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
              // onClick={() => setOpen(false)}
              // disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
            // onClick={handleDelete}
            // disabled={isDeleting}
            >
              Edit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSales;
