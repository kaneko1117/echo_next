export default async function Home() {
  const HOST_DOMAIN = process.env.HOST_DOMAIN;
  const token = await fetch(`${HOST_DOMAIN}/csrf`);
  console.log(token);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      data
    </div>
  );
}
