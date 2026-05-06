import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src="/logo.png"
        alt="Dominex Logo"
        width={120}
        height={120}
      />
      <h1 className="text-2xl font-bold mt-4">Dominex</h1>
    </div>
  );
}
