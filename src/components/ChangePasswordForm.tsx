"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";

import {
  changePasswordSchema,
  type ChangePasswordValues,
} from "../zod-schemas";

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

import { changePassword } from "@/lib/auth-client";

export const ChangePasswordForm = () => {
  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: ChangePasswordValues) => {
    try {
      setLoading(true);

      const { error } = await changePassword(values);

      if (error) {
        toast.error(error.message ?? "Something went wrong");
        return;
      }

      toast.success("Password changed successfully");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Current password"
                  aria-required="true"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="New password"
                  aria-required="true"
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading && (
            <Loader2Icon className="animate-spin size-4" aria-hidden="true" />
          )}
          Save Changes
        </Button>
      </form>
    </Form>
  );
};
