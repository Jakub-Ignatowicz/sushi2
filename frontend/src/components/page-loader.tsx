import { LoadingSpinner } from "./loading-spinner";

export default function PageLoader() {
  return (
    <div className="flex items-center justify-center h-full ">
      <LoadingSpinner size={32} />
    </div>
  );
}
