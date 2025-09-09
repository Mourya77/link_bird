import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/drizzle";
import { users, accounts, sessions, verificationTokens } from "@/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
    // The adapter is the bridge between the auth library and your database.
    // It tells NextAuth how to save users, sessions, etc.
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    providers: [
        // This configures the "Continue with Google" button.
        // It reads the credentials from your .env.local file.
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        // This callback adds the user's database ID to the session object,
        // which is useful for database queries later.
        session({ session, user }) {
            session.user.id = user.id;
            return session;
        },
    },
});

