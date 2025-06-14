"use client";

import LabelInput from "@/components/LabelInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();

  return (
    <div className="flex w-full h-[100vh] flex-col items-center justify-center">
      <Label className="text-xl pb-4 text-2xl font-semibold text-muted-foreground">
        Panel administratora
      </Label>
      <div className="flex w-full max-w-sm flex-col gap-4 bg-secondary p-4 rounded-lg shadow-md">
        <LabelInput label="Login" />
        <LabelInput label="Hasło" />
        <Button
          className="w-full cursor-pointer"
          variant="default"
          onClick={() => {
            // Handle login logic here
            router.push("/admin/dashboard");
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
