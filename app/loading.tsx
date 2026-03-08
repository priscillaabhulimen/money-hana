import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <Loader />
    </div>
  );
}
