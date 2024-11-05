import { signUp } from "@/actions";
import { Form } from "@/components/form";

export default async function SignUp() {
  return <Form action={signUp} />;
}
