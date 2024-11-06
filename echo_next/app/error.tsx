"use client"; // Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h2>Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="bg-blue-500 text-white rounded p-2"
      >
        Try again
      </button>
    </div>
  );
}
