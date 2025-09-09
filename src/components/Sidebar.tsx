import { auth } from "@/auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton } from "@/components/auth/SignOutButton";
import {
    LayoutDashboard,
    Users,
    Settings,
    BarChart3,
    MessageSquare,
    Link2,
    ListChecks,
    Users2,
} from "lucide-react";

// Matches the navigation items from the provided screenshots
const navLinks = [
    { href: "/overview", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/leads", label: "Leads", icon: Users },
    { href: "/campaigns", label: "Campaigns", icon: BarChart3 },
    { href: "/messages", label: "Messages", icon: MessageSquare, count: 12 },
    { href: "/linkedin-accounts", label: "Linkedin Accounts", icon: Link2 },
];

const adminLinks = [
    { href: "/settings", label: "Setting & Billing", icon: Settings },
    { href: "/activity-logs", label: "Activity logs", icon: ListChecks },
    { href: "/user-logs", label: "User logs", icon: Users2 },
];

export async function Sidebar() {
    const session = await auth();
    const user = session?.user;

    // Don't render the sidebar if the user isn't logged in
    if (!user) {
        return null;
    }

    // Get user initials for the avatar fallback
    const initials =
        user.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase() || user.email?.charAt(0).toUpperCase() || "U";

    return (
        <aside className="w-64 flex-shrink-0 border-r bg-gray-50/50 flex flex-col h-screen sticky top-0">
            {/* User profile section */}
            <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage src={user.image ?? undefined} alt={user.name ?? ""} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col truncate">
                        <span className="font-semibold truncate">{user.name}</span>
                        <span className="text-sm text-gray-500 truncate">{user.email}</span>
                    </div>
                </div>
            </div>

            {/* Main navigation */}
            <nav className="flex-1 px-2 py-4 space-y-1">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-200/70"
                    >
                        <link.icon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-800" />
                        <span className="flex-1">{link.label}</span>
                        {link.count && (
                            <span className="ml-auto text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                {link.count}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>

            {/* Admin Panel / Settings section */}
            <div className="px-2 py-4 space-y-1 border-t">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Admin Panel
                </h3>
                {adminLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-200/70"
                    >
                        <link.icon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-800" />
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Sign out section */}
            <div className="p-2 border-t">
                <SignOutButton />
            </div>
        </aside>
    );
}

