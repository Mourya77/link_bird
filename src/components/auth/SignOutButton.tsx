import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
            }}
            className="w-full"
        >
            <Button
                type="submit"
                variant="ghost"
                className="w-full justify-start text-left text-sm font-medium text-gray-700 hover:bg-gray-200/70"
            >
                <LogOut className="mr-3 h-5 w-5 text-gray-500" />
                Sign Out
            </Button>
        </form>
    );
}

