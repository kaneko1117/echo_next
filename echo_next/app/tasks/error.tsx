"use client";
import { redirect } from "next/navigation";

// Error boundaries must be Client Components

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h2>{error.message}</h2>
      <button
        onClick={() => redirect("/")}
        className="bg-blue-500 text-white rounded p-2"
      >
        Try again
      </button>
    </div>
  );
}
