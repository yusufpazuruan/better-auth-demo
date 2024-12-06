"use client";

import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { twoFactor } from "@/lib/auth-client";
import { useTwoFactorModalStore } from "@/store/two-factor-store";
import { Session } from "@/lib/auth-types";

export const TwoFactorModal = ({ session }: { session: Session }) => {
  const [password, setPassword] = useState("");
  const [qr, setQr] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"password" | "verify">("password");
  const { isModalOpen, onModalClose } = useTwoFactorModalStore();
  const router = useRouter();

  const handleTwoFactor = async () => {
    try {
      setLoading(true);
      if (step === "password") {
        // First enable 2FA
        const { data: enableData, error: enableError } = await twoFactor.enable(
          {
            password,
          }
        );

        if (enableError) {
          toast.error(
            enableError.message ?? "Failed to enable 2FA. Please try again."
          );
          return;
        }

        if (enableData) {
          setQr(enableData.totpURI);
          setPassword("");
          setStep("verify");
          return;
        }
      } else if (step === "verify") {
        if (code.trim() === "") {
          return;
        }
        // Verify the OTP code
        const { error: verifyError } = await twoFactor.verifyTotp({
          code,
        });

        if (verifyError) {
          toast.error(
            verifyError.message ??
              "Invalid verification code. Please try again."
          );
          return;
        }
        toast.success("2FA enabled successfully");
        onModalClose();
        setQr("");
        setStep("password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  const handleClose = () => {
    setPassword("");
    setQr("");
    setCode("");
    setStep("password");
    onModalClose();
  };

  const disableTwoFactor = async () => {
    try {
      setLoading(true);

      const { error, data } = await twoFactor.disable({
        password,
      });

      if (error) {
        toast.error(error.message ?? "Something went wrong. Please try again.");
        return;
      }

      if (data.status) {
        toast.success("2FA disabled successfully");

        onModalClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onModalClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {session.user.twoFactorEnabled
              ? "Manage Two-Factor"
              : "Set up Two-Factor Authentication"}
          </DialogTitle>
          <DialogDescription>
            {session.user.twoFactorEnabled
              ? "Enter your password to disable 2FA."
              : step === "verify"
              ? "Scan the QR code below with your authenticator app and then enter the code provided by the app to enable 2FA."
              : "Enter your password to enable 2FA."}
          </DialogDescription>
        </DialogHeader>

        {qr && (
          <div className="py-4">
            <div className="size-40 bg-gray-200 mx-auto flex items-center justify-center p-2 rounded-md">
              <QRCodeSVG value={qr} className="w-full h-full" />
            </div>
          </div>
        )}

        <div className="space-y-4">
          {step === "verify" ? (
            <div className="space-y-2">
              <Label>Verification Code</Label>
              <Input
                placeholder="Enter the 6-digit code"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" disabled={loading} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={
              session.user.twoFactorEnabled ? disableTwoFactor : handleTwoFactor
            }
            disabled={
              loading ||
              (step === "password" && !password) ||
              (step === "verify" && (!code || code.trim().length !== 6))
            }
          >
            {loading && (
              <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />
            )}
            {session.user.twoFactorEnabled
              ? "Disable 2FA"
              : step === "password"
              ? "Enable 2FA"
              : "Verify"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
