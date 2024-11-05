"use client";

import { logIn } from "@/app/actions";

export const Form = () => {
  return (
    <form
      className="flex flex-col items-center justify-center gap-10 min-h-screen"
      onSubmit={logIn}
    >
      <input className="w-50 border border-2 rounded" />
      <input className="w-50 border border-2 rounded" type="password" />
      <button className="bg-blue-500 text-white rounded p-2" type="submit">
        Submit
      </button>
    </form>
  );
};
