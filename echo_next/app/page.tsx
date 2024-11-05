import { logIn } from "@/actions";
import { Form } from "@/components/form";

export default async function Home() {
  const HOST_DOMAIN = process.env.HOST_DOMAIN;
  await fetch(`${HOST_DOMAIN}/csrf`);

  return <Form action={logIn} />;
}
