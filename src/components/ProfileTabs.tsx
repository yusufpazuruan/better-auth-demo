"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfilePageForm } from "./ProfilePageForm";
import { Session } from "@/lib/auth-types";
import { TwoFactorModal } from "./TwoFactorModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTwoFactorModalStore } from "@/store/two-factor-store";
import { cn } from "@/lib/utils";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { DeleteAccountModal } from "@/components/DeleteAccountModal";

export const ProfilePageTabs = ({ session }: { session: Session }) => {
  const { onModalOpen } = useTwoFactorModalStore();

  return (
    <>
      <TwoFactorModal session={session} />
      <div className="w-full py-8">
        <Tabs
          defaultValue="profile"
          className="w-full sm:max-w-[400px] mx-auto"
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Hello, {session.user.name}</CardTitle>
                <CardDescription>
                  Here&apos;s you profile informations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfilePageForm session={session} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <TwoFactorStatus session={session} onModalOpen={onModalOpen} />
                <div className="h-px bg-input" />
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">Change Password</h2>
                  <ChangePasswordForm />
                </div>
                <div className="h-px bg-input" />
                <DeleteAccountModal />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

function TwoFactorStatus({
  session,
  onModalOpen,
}: {
  session: Session;
  onModalOpen: () => void;
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <Label>Two Factor Authentication</Label>
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "text-xs font-medium w-fit p-1 px-2 rounded-md",
            session.user.twoFactorEnabled
              ? "text-green-500 bg-green-500/20 "
              : "text-red-500 bg-red-500/20"
          )}
        >
          {session.user.twoFactorEnabled ? "Enabled" : "Disabled"}
        </div>
        <Button onClick={onModalOpen}>
          {session.user.twoFactorEnabled ? "Manage 2FA" : "Enable 2FA"}
        </Button>
      </div>
    </div>
  );
}
