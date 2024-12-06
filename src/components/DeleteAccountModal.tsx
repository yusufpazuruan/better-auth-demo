"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2Icon, Trash2Icon } from "lucide-react";

import { deleteUser } from "@/lib/auth-client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAccountDeletionModalStore } from "@/store/account-deletion-modal.store";
import { useRouter } from "next/navigation";

export const DeleteAccountModal = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isModalOpen, onModalOpen, onModalClose } =
    useAccountDeletionModalStore();
  const router = useRouter();

  const onDelete = async () => {
    try {
      setLoading(true);
      if (password.trim() === "") return;

      const { error } = await deleteUser({ password });
      if (error) {
        toast.error(error.message || "Failed to delete account");
        return;
      }

      router.push("/sign-in");
      onModalClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPassword("");
    onModalClose();
  };

  return (
    <>
      <Button variant="destructive" onClick={onModalOpen}>
        <Trash2Icon className="size-4" /> Delete Account
      </Button>

      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Enter your password to confirm account deletion
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" disabled={loading} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="destructive" disabled={loading} onClick={onDelete}>
              {loading && (
                <Loader2Icon
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
