"use server";

import { db } from "@/db/drizzle";
import { leads } from "@/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";

export type Lead = typeof leads.$inferSelect;

export async function getLeads({
    pageParam = 0,
}: {
    pageParam?: number;
}): Promise<{
    leads: Lead[];
    nextCursor: number | null;
}> {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const leadsPerPage = 20;

    try {
        const fetchedLeads = await db
            .select()
            .from(leads)
            .limit(leadsPerPage)
            .offset(pageParam * leadsPerPage);

        return {
            leads: fetchedLeads,
            nextCursor: fetchedLeads.length === leadsPerPage ? pageParam + 1 : null,
        };
    } catch (error) {
        console.error("Failed to fetch leads:", error);
        throw new Error("Could not fetch leads from the database.");
    }
}

// --- ADD THIS NEW FUNCTION ---
/**
 * Fetches a single lead from the database by its unique ID.
 * @param id The ID of the lead to fetch.
 * @returns The lead object or null if not found.
 */
export async function getLeadById(id: number): Promise<Lead | null> {
    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated");
    }

    try {
        const lead = await db.query.leads.findFirst({
            where: eq(leads.id, id),
        });
        return lead ?? null;
    } catch (error) {
        console.error(`Failed to fetch lead with id ${id}:`, error);
        throw new Error("Could not fetch lead details.");
    }
}