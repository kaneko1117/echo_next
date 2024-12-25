import { cookies } from "next/headers";

type TaskResponse = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}[];

export default async function Tasks() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const setCookies = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value};`)
    .join(" ");
  const csrftoken = cookieStore.get("_csrf");
  const res: Response = await fetch(`${process.env.HOST_DOMAIN}/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrftoken?.value || "",
      Cookie: setCookies,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const tasks: TaskResponse = await res.json();
  console.log(tasks);

  return (
    <>
      {tasks.map((task) => {
        return <div key={task.id}>{task.title}</div>;
      })}
    </>
  );
}
