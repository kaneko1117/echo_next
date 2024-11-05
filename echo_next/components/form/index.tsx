"use client";
import { useActionState, useCallback, useEffect } from "react";

type Props = {
  action: (
    prevState: unknown,
    formData: FormData
  ) => Promise<
    | {
        errors: {
          email?: string[] | undefined;
          password?: string[] | undefined;
        };
      }
    | undefined
  >;
};

export const Form = ({ action }: Props) => {
  const csrfFetch = useCallback(async () => {
    const data = await fetch(`http://localhost/back/csrf`);
    const json = await data.json();
  }, []);
  useEffect(() => {
    csrfFetch();
  }, [csrfFetch]);
  const [state, formAction, isPending] = useActionState(action, null);
  return (
    <form
      className="flex flex-col items-center justify-center gap-10 min-h-screen"
      action={formAction}
    >
      <input
        className="w-50 border border-2 rounded"
        type="email"
        name="email"
      />
      <input
        className="w-50 border border-2 rounded"
        type="password"
        name="password"
      />
      {state?.errors && (
        <div>
          <p aria-live="polite">{state?.errors.email}</p>
          <p aria-live="polite">{state?.errors.password}</p>
        </div>
      )}
      <button
        className="bg-blue-500 text-white rounded p-2 disabled:bg-gray-300"
        type="submit"
        disabled={isPending}
      >
        Submit
      </button>
    </form>
  );
};
