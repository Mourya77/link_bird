"use client";

import { useQuery } from "@tanstack/react-query";
import { getCampaigns, type CampaignWithLeads } from "./actions"; // **FIX:** Import the new type
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

// Helper component for loading state
const TableRowSkeleton = () => (
    <TableRow>
        <TableCell>
            <Skeleton className="h-5 w-32" />
        </TableCell>
        <TableCell>
            <Skeleton className="h-6 w-20 rounded-full" />
        </TableCell>
        <TableCell>
            <Skeleton className="h-5 w-12" />
        </TableCell>
    </TableRow>
);

export function CampaignsTable() {
    const { data: campaigns, isLoading, isError } = useQuery({
        queryKey: ["campaigns"],
        queryFn: getCampaigns, // No changes needed here, it will infer the correct type now
    });

    if (isLoading) {
        // ... loading state remains the same
        return (
            <Table>
                <TableHeader><TableRow><TableHead>Campaign Name</TableHead><TableHead>Status</TableHead><TableHead>Total Leads</TableHead></TableRow></TableHeader>
                <TableBody>{Array.from({ length: 5 }).map((_, i) => (<TableRowSkeleton key={i} />))}</TableBody>
            </Table>
        );
    }

    if (isError) {
        // ... error state remains the same
        return (<div className="text-center text-red-500 py-10">Failed to load campaigns.</div>);
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Leads</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* **FIX:** The 'campaign' parameter is now correctly typed automatically. */}
                {campaigns?.map((campaign: CampaignWithLeads) => (
                    <TableRow key={campaign.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                            <Link href={`/campaigns/${campaign.id}`} className="hover:underline">
                                {campaign.name}
                            </Link>
                        </TableCell>
                        <TableCell>
                            <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                                {campaign.status}
                            </Badge>
                        </TableCell>
                        <TableCell>{campaign.totalLeads}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}