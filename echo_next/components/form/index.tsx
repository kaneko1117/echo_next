"use client";
import { logIn, signUp } from "@/actions";
import { useActionState, useCallback, useEffect, useState } from "react";

type Props = {
  formAction: (payload: FormData) => void;
  state:
    | {
        errors: {
          email?: string[] | undefined;
          password?: string[] | undefined;
        };
      }
    | null
    | undefined;
  isPending: boolean;
};

const Form = ({ formAction, state, isPending }: Props) => {
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
        disabled={isPending}
      >
        Submit
      </button>
    </form>
  );
};

export const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [logInState, logInAction, isLogInPending] = useActionState(logIn, null);
  const [signUpState, signUpAction, isSignUpPending] = useActionState(
    signUp,
    null
  );

  const getCsrfToken = useCallback(async () => {
    try {
      const res = await fetch(`/api/csrf`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }, []);

  useEffect(() => {
    getCsrfToken();
  }, [getCsrfToken]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="m-10 font-bold text-[24px]">
        {isSignUp ? "Sign up" : "Log in"}
      </h1>
      {isSignUp ? (
        <Form
          state={signUpState}
          formAction={signUpAction}
          isPending={isSignUpPending}
        />
      ) : (
        <Form
          state={logInState}
          formAction={logInAction}
          isPending={isLogInPending}
        />
      )}
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="text-blue-500 p-2 m-4 border border-blue-500 rounded w-50"
      >
        {isSignUp ? "click here to log in" : "click here to sign up"}
      </button>
    </div>
  );
};
