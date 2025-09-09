import { SignInButton } from "../components/auth/LoginDialog";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) {
    // If the user is already logged in, redirect them to the leads page.
    // We will create this page later.
    redirect("/leads");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Welcome to Linkbird Replica
        </h1>
        <p className="text-lg text-gray-600">
          Please log in to continue to your dashboard.
        </p>
        <SignInButton />
      </div>
    </main>
  );
}

