"use client";

import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Session } from "@/lib/auth-types";
import { profileSchema, type ProfileFormValues } from "@/zod-schemas";
import { updateUser } from "@/lib/auth-client";

export const ProfilePageForm = ({ session }: { session: Session }) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session?.user?.name ?? "",
      email: session?.user?.email ?? "",
      role: (session?.user?.role as ProfileFormValues["role"]) ?? "user",
    },
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      setLoading(true);
      const {
        success,
        data,
        error: parsingError,
      } = profileSchema.safeParse(values);
      if (!success) {
        toast.error(
          parsingError?.message ?? "Something went wrong. Please try again."
        );
        return;
      }

      // Only admin can update role
      if (session.user.role === "admin") {
        const { error } = await updateUser({
          name: data.name,
          role: data.role,
        });
        if (error) {
          toast.error(
            error.message ?? "Something went wrong. Please try again."
          );
          return;
        }
      }

      if (session.user.role === "user") {
        const { error } = await updateUser({
          name: data.name,
        });
        if (error) {
          toast.error(
            error.message ?? "Something went wrong. Please try again."
          );
          return;
        }
      }

      toast.success("Profile updated successfully");
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  defaultValue={field.value}
                  disabled={session.user.role !== "admin"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Role" {...field} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading || !form.formState.isDirty}
            className="w-full"
          >
            {loading && (
              <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />
            )}
            Update
          </Button>
        </form>
      </Form>
    </>
  );
};
