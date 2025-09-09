import { signIn } from "@/auth";
import { Chrome } from "lucide-react";

export function SignInButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/" });
            }}
            className="w-full"
        >
            <button
                type="submit"
                className="w-full py-6 text-lg border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center"
            >
                <Chrome className="mr-2 h-6 w-6" />
                Continue with Google
            </button>
        </form>
    );
}
