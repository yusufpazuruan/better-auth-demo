"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { twoFactor } from "@/lib/auth-client";

export const QrCode = () => {
  const [password, setPassword] = useState("");
  const [qr, setQr] = useState("");
  const [code, setCode] = useState("");

  const enableTwoFactor = async () => {
    const { data } = await twoFactor.enable({
      password,
    });

    if (data) {
      setQr(data.totpURI);
    }
  };
  const generateQrCode = async () => {
    const { data } = await twoFactor.getTotpUri({
      password,
    });

    setQr(data?.totpURI ?? "");
  };

  const verifyOtp = async () => {
    await twoFactor.verifyTotp({
      code,
    });
  };

  return (
    <div>
      <Input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
      />
      <Input
        onChange={(e) => setCode(e.target.value)}
        value={code}
        placeholder="Code"
        className="mt-5"
      />
      <div className="flex flex-col gap-2 w-fit mt-5">
        <Button onClick={enableTwoFactor}>Enable 2FA</Button>
        <Button onClick={generateQrCode}>Generate QR Code</Button>
        <Button onClick={verifyOtp}>Verify OTP</Button>
      </div>

      {qr && <QRCodeSVG value={qr} className="mt-10 w-48 h-48" />}
    </div>
  );
};
