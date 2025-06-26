import { PackageX } from "lucide-react";

const FetchError = ({ error }: any) => {
  return (
    <div className="text-red-500 mx-auto font-semibold text-lg py-4">
      <PackageX className="inline mr-2 " />
      Wystąpił błąd: {error.status || "Nieznany błąd"}
    </div>
  );
};

export default FetchError;
