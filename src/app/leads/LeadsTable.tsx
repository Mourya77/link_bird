"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getLeads, type Lead } from "./actions";
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
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useSheetStore } from "@/stores/useSheetStore";

const TableRowSkeleton = () => (
    <TableRow>
        <TableCell className="w-[300px]">
            <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                </div>
            </div>
        </TableCell>
        <TableCell>
            <Skeleton className="h-4 w-28" />
        </TableCell>
        <TableCell>
            <Skeleton className="h-4 w-12" />
        </TableCell>
        <TableCell>
            <Skeleton className="h-6 w-24 rounded-full" />
        </TableCell>
    </TableRow>
);

export function LeadsTable() {
    const { ref, inView } = useInView();
    const { openSheet } = useSheetStore();

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["leads"],
        queryFn: ({ pageParam }) => getLeads({ pageParam }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isLoading) {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Name</TableHead>
                        <TableHead>Campaign Name</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <TableRowSkeleton key={i} />
                    ))}
                </TableBody>
            </Table>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 py-10">
                Failed to load leads. Please try again later.
            </div>
        );
    }

    const allLeads = data?.pages.flatMap((page) => page.leads) ?? [];

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[300px]">Name</TableHead>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {allLeads.map((lead: Lead) => (
                    <TableRow
                        key={lead.id}
                        onClick={() => openSheet(lead.id)}
                        className="cursor-pointer hover:bg-gray-50"
                    >
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={undefined} />
                                    <AvatarFallback>
                                        {lead.name.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="font-medium">{lead.name}</span>
                                    <span className="text-sm text-gray-500">{lead.email}</span>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>{lead.campaignId || "N/A"}</TableCell>
                        <TableCell>—</TableCell>
                        <TableCell>
                            <Badge variant="secondary">{lead.status || "New"}</Badge>
                        </TableCell>
                    </TableRow>
                ))}
                <TableRow ref={ref} style={{ height: "1px", border: "none" }} />
                {isFetchingNextPage && <TableRowSkeleton />}
            </TableBody>
        </Table>
    );
}