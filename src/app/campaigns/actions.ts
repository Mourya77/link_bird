"use server";

import { db } from "@/db/drizzle";
// **FIX:** Import the 'leads' schema as well
import { campaigns, leads } from "@/db/schema";
import { auth } from "@/auth";
import { eq, sql } from "drizzle-orm";

// --- Existing types and functions ---
export type Campaign = typeof campaigns.$inferSelect;
export type CampaignWithLeads = Campaign & { totalLeads: number };

export async function getCampaigns(): Promise<CampaignWithLeads[]> {
    const session = await auth();
    if (!session?.user) throw new Error("User not authenticated");

    try {
        const allCampaigns = await db.query.campaigns.findMany({
            extras: {
                totalLeads: sql<number>`(select count(*) from leads where leads.campaign_id = campaigns.id)`.as("total_leads"),
            },
        });
        return allCampaigns as CampaignWithLeads[];
    } catch (error) {
        console.error("Failed to fetch campaigns:", error);
        throw new Error("Could not fetch campaigns from the database.");
    }
}

export async function getCampaignById(id: number): Promise<Campaign | null> {
    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated");
    }

    try {
        const campaign = await db.query.campaigns.findFirst({
            where: eq(campaigns.id, id),
        });
        return campaign ?? null;
    } catch (error) {
        console.error(`Failed to fetch campaign with id ${id}:`, error);
        throw new Error("Could not fetch campaign details.");
    }
}


// --- ADD THIS NEW FUNCTION AND TYPE ---

// Define the type for a single lead, which we'll need for the new function.
export type Lead = typeof leads.$inferSelect;

/**
 * Fetches all leads associated with a specific campaign ID.
 * @param campaignId The ID of the campaign.
 * @returns An array of lead objects.
 */
export async function getLeadsForCampaign(campaignId: number): Promise<Lead[]> {
    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated");
    }

    try {
        // The key is the 'where' clause that filters leads by the campaignId
        const campaignLeads = await db.query.leads.findMany({
            where: eq(leads.campaignId, campaignId),
        });
        return campaignLeads;
    } catch (error) {
        console.error(`Failed to fetch leads for campaign ${campaignId}:`, error);
        throw new Error("Could not fetch campaign leads.");
    }
}