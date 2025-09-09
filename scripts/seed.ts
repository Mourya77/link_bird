import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { leads, campaigns } from "../src/db/schema"; // Import campaigns schema
import * as dotenv from "dotenv";

dotenv.config({
    path: ".env.local",
});

if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL environment variable is not set");
}

const db = drizzle(sql);

// Sample data for campaigns
const sampleCampaigns = [
    { id: 1, name: "Juicy Chemistry", status: "Active" },
    { id: 2, name: "The Skin Story", status: "Active" },
    { id: 3, name: "Digi Sidekick", status: "Inactive" },
    { id: 4, name: "Social Beat", status: "Active" },
    { id: 5, name: "Bot Space", status: "Active" },
];

// Sample data for leads, now with campaignId to link them
const sampleLeads = [
    { name: "Aarav Sharma", email: "aarav.sharma@example.com", status: "Connected", campaignId: 1 },
    { name: "Vivaan Singh", email: "vivaan.singh@example.com", status: "Pending", campaignId: 2 },
    { name: "Aditya Kumar", email: "aditya.kumar@example.com", status: "Replied", campaignId: 3 },
    { name: "Arjun Patel", email: "arjun.patel@example.com", status: "Connected", campaignId: 4 },
    { name: "Reyansh Gupta", email: "reyansh.gupta@example.com", status: "New", campaignId: 5 },
    { name: "Ishaan Reddy", email: "ishaan.reddy@example.com", status: "Pending", campaignId: 1 },
    { name: "Vihaan Joshi", email: "vihaan.joshi@example.com", status: "Replied", campaignId: 2 },
    { name: "Sai Desai", email: "sai.desai@example.com", status: "Connected", campaignId: 3 },
    { name: "Shaurya Mehta", email: "shaurya.mehta@example.com", status: "New", campaignId: 4 },
    { name: "Advik Shah", email: "advik.shah@example.com", status: "Pending", campaignId: 5 },
    { name: "Kabir Iyer", email: "kabir.iyer@example.com", status: "Replied", campaignId: 1 },
    { name: "Anay Pillai", email: "anay.pillai@example.com", status: "Connected", campaignId: 2 },
    { name: "Dhruv Nair", email: "dhruv.nair@example.com", status: "New", campaignId: 3 },
    { name: "Rudra Chavan", email: "rudra.chavan@example.com", status: "Pending", campaignId: 4 },
    { name: "Atharv Kulkarni", email: "atharv.kulkarni@example.com", status: "Replied", campaignId: 5 },
    { name: "Ayaan Malhotra", email: "ayaan.malhotra@example.com", status: "Connected", campaignId: 1 },
    { name: "Krishna Verma", email: "krishna.verma@example.com", status: "New", campaignId: 2 },
    { name: "Rohan Chaudhary", email: "rohan.chaudhary@example.com", status: "Pending", campaignId: 3 },
    { name: "Aryan Jain", email: "aryan.jain@example.com", status: "Replied", campaignId: 4 },
    { name: "Neel Agarwal", email: "neel.agarwal@example.com", status: "Connected", campaignId: 5 },
];


async function seedDatabase() {
    console.log("🌱 Seeding database...");

    try {
        // Clear existing data to prevent duplicates, starting with leads
        await db.delete(leads);
        await db.delete(campaigns);
        console.log("🗑️  Deleted existing leads and campaigns.");

        // Insert the new sample campaigns
        const insertedCampaigns = await db.insert(campaigns).values(sampleCampaigns).returning();
        console.log(`✅ Seeded ${insertedCampaigns.length} campaigns.`);

        // Insert the new sample leads
        const insertedLeads = await db.insert(leads).values(sampleLeads).returning();
        console.log(`✅ Seeded ${insertedLeads.length} leads.`);

    } catch (error) {
        console.error("❌ Error seeding database:", error);
    }

    console.log("🌱 Seeding complete.");
    process.exit(0);
}

seedDatabase();