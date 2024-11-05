"use server";

import { cookies } from "next/headers";

export const logIn = async () => {
  // cookieに保存されたcsrftokenを取得
  const cookieStore = await cookies();
  const csrftoken = cookieStore.get("csrftoken");
  console.log(csrftoken?.value);
};
