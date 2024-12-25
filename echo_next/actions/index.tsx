"use server";

import { schema } from "@/validation";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

const fetcher = async (path: string, body: Record<string, string> | null) => {
  // cookieは明示的に渡してあげないといけない
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const setCookies = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value};`)
    .join(" ");
  const csrftoken = cookieStore.get("_csrf");
  const domain = process.env.HOST_DOMAIN;
  const res = await fetch(`${domain}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrftoken?.value || "",
      Cookie: setCookies,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res;
};

export const logIn = async (prevState: unknown, formData: FormData) => {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetcher("login", {
    email: `${formData.get("email")}`,
    password: `${formData.get("password")}`,
  });
  const cookieStore = await cookies();
  const copyCookie = res.headers.get("set-cookie");
  const tokenPart = copyCookie?.indexOf("token=");
  const token = tokenPart ? copyCookie?.substring(tokenPart) : "";
  const tokenValue = token?.match(/token=(.*?);/)?.[1];
  const expiresValue = token?.match(/Expires=(.*?);/)?.[1];
  cookieStore.set({
    name: "token",
    value: tokenValue || "",
    sameSite: "strict",
    secure: true,
    httpOnly: true,
    expires: new Date(expiresValue || ""),
  });

  redirect("/tasks");
};

export const signUp = async (prevState: unknown, formData: FormData) => {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await fetcher("signup", {
      email: `${formData.get("email")}`,
      password: `${formData.get("password")}`,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
