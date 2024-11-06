"use client";
import { logIn, signUp } from "@/actions";
import { useActionState, useCallback, useEffect, useState } from "react";

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

const Form = ({ action }: Props) => {
  const [state, formAction, isPending] = useActionState(action, null);
  return (
    <form
      className="flex flex-col items-center justify-center gap-4"
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

export const AuthForm = () => {
  const csrfFetch = useCallback(async () => {
    await fetch(`http://localhost/back/csrf`);
  }, []);
  useEffect(() => {
    csrfFetch();
  }, [csrfFetch]);

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="m-10 font-bold text-[24px]">
        {isSignUp ? "Sign up" : "Log in"}
      </h1>
      {isSignUp ? <Form action={signUp} /> : <Form action={logIn} />}
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="text-blue-500 p-2 m-4 border border-blue-500 rounded w-50"
      >
        {isSignUp ? "click here to log in" : "click here to sign up"}
      </button>
    </div>
  );
};
