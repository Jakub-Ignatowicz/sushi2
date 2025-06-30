"use client";

import LabelInput from "@/components/label-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();

  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <Label className="pb-4 text-2xl font-semibold text-muted-foreground">
        Panel administratora
      </Label>
      <div className="flex w-full max-w-sm flex-col gap-4 p-4 rounded-lg shadow-md bg-primary-foreground">
        <LabelInput label="Login" />
        <LabelInput label="Hasło" />
        <Button
          className="w-full cursor-pointer"
          variant="default"
          onClick={() => {
            router.push("/admin/dashboard/orders/new");
            console.log("Zaloguj się clicked");
          }}
        >
          Zaloguj się
        </Button>
      </div>
    </div>
  );
};

export default AdminPage;
