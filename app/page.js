import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const hasToken = cookieStore.get("token");

  if (hasToken) {
   
    redirect("/main/feed");
  } else {
   
    redirect("/auth/login");
  }
}




