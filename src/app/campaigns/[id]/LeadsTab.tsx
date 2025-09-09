"use client";

import { useQuery } from "@tanstack/react-query";
import { getLeadsForCampaign, type Lead } from "../actions";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Helper for loading state
const TableRowSkeleton = () => (
    <TableRow>
        <TableCell><div className="flex items-center gap-3"><Skeleton className="h-10 w-10 rounded-full" /><Skeleton className="h-4 w-32" /></div></TableCell>
        <TableCell><Skeleton className="h-4 w-48" /></TableCell>
        <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
    </TableRow>
);

export function LeadsTab({ campaignId }: { campaignId: number }) {
    // Fetch data using the campaignId as part of the unique query key
    const { data: leads, isLoading, isError } = useQuery({
        queryKey: ["campaign-leads", campaignId],
        queryFn: () => getLeadsForCampaign(campaignId),
    });

    if (isLoading) {
        return (
            <Table>
                <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Lead Description</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>{Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)}</TableBody>
            </Table>
        );
    }

    if (isError) {
        return <div className="text-center text-red-500 py-10">Failed to load leads.</div>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Lead Description</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {leads?.map((lead: Lead) => (
                    <TableRow key={lead.id} className="hover:bg-gray-50">
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={lead.avatarUrl ?? undefined} />
                                    <AvatarFallback>{lead.name.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{lead.name}</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-gray-600">{lead.email}</TableCell>
                        <TableCell><Badge variant="secondary">{lead.status}</Badge></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}