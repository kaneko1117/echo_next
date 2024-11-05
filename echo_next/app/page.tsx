import { logIn } from "@/actions";
import { Form } from "@/components/form";

export default async function LogIn() {
  const HOST_DOMAIN = process.env.HOST_DOMAIN;
  const data = await fetch(`${HOST_DOMAIN}/csrf`);
  const json = await data.json();
  console.log(json);

  return <Form action={logIn} />;
}
