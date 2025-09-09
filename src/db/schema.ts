import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    varchar,
    boolean,
    serial,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

// --- NEXT-AUTH REQUIRED TABLES ---
export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
);

// --- YOUR APPLICATION TABLES ---
export const campaigns = pgTable("campaigns", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    status: text("status").default("Active").notNull(),
    userId: text("user_id").references(() => users.id),
});

export const leads = pgTable("leads", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    email: text("email").notNull().unique(),
    status: text("status"),
    // ** THIS LINE IS ADDED **
    avatarUrl: text("avatar_url"),
    campaignId: integer("campaign_id").references(() => campaigns.id, {
        onDelete: "cascade",
    }),
});