"use client";

import LabelInput from "@/components/label-input";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authLogin, authMe } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AdminPage = () => {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        await authMe();
        router.push("/admin/dashboard/orders/new");
      } catch (error) {
        setShowForm(true);
      }
    };

    fetchMe();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      await authLogin(data.login, data.password);
      router.push("/admin/dashboard/orders/new");
    } catch (error) {
      toast.error("Błąd logowania. Sprawdź dane i spróbuj ponownie.");
    }
  };

  if (!showForm) {
    return <PageLoader />;
  }

  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <Label className="pb-4 text-2xl font-semibold text-muted-foreground">
        Panel administratora
      </Label>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col gap-4 p-4 rounded-lg shadow-md bg-primary-foreground"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="login">Login</Label>
          <Input id="login" {...register("login", { required: true })} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Hasło</Label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
        </div>

        <Button className="w-full" type="submit">
          Zaloguj się
        </Button>
      </form>
    </div>
  );
};

export default AdminPage;
