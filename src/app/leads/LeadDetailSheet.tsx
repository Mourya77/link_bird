"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useSheetStore } from "@/stores/useSheetStore";
import { useQuery } from "@tanstack/react-query";
import { getLeadById } from "./actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, CircleDot, MessageSquareReply, Pencil, Trash2, type LucideProps } from "lucide-react";
import React from "react";

// A skeleton component to show while the lead's details are loading.
const DetailSkeleton = () => (
    <div>
        <SheetHeader className="gap-2">
            <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>
        </SheetHeader>
        <div className="mt-8 space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                    <Skeleton className="h-8 w-8 rounded-full mt-1" />
                    <div className="flex flex-col gap-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// A reusable component for creating each item in the vertical timeline.
// **FIX:** Added explicit types for the component props.
const TimelineItem = ({
    icon: Icon,
    title,
    children
}: {
    icon: React.ElementType<LucideProps>;
    title: string;
    children: React.ReactNode
}) => (
    <div className="flex gap-4">
        <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100">
                <Icon className="h-5 w-5 text-gray-500" />
            </div>
            {/* This div creates the vertical line connecting the timeline items */}
            <div className="flex-1 w-px bg-gray-200 my-2"></div>
        </div>
        <div className="flex-1 pt-1.5">
            <p className="font-semibold text-gray-800">{title}</p>
            <div className="text-sm text-gray-600 mt-1">{children}</div>
        </div>
    </div>
);


export function LeadDetailSheet() {
    const { isOpen, closeSheet, selectedLeadId } = useSheetStore();

    // This hook fetches the data for the selected lead.
    const { data: lead, isLoading, isError } = useQuery({
        queryKey: ["lead", selectedLeadId],
        queryFn: () => getLeadById(selectedLeadId!),
        enabled: !!selectedLeadId,
    });

    return (
        <Sheet open={isOpen} onOpenChange={closeSheet}>
            <SheetContent className="w-[500px] sm:w-[640px] sm:max-w-none">
                {isLoading && <DetailSkeleton />}
                {isError && <p className="text-center text-red-500">Failed to load lead details.</p>}
                {lead && (
                    <>
                        <SheetHeader className="gap-2">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={lead.avatarUrl ?? undefined} />
                                        <AvatarFallback className="text-2xl">
                                            {lead.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <SheetTitle className="text-2xl">{lead.name}</SheetTitle>
                                        <SheetDescription>{lead.email}</SheetDescription>
                                        <div className="mt-2">
                                            <Badge variant="outline">{lead.status || 'N/A'}</Badge>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Pencil className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-800" />
                                    <Trash2 className="h-4 w-4 text-gray-500 cursor-pointer hover:text-red-600" />
                                </div>
                            </div>
                        </SheetHeader>
                        <div className="py-8">
                            <div className="relative">
                                {/* Here we render the timeline, using placeholder data for now */}
                                <TimelineItem icon={CheckCircle2} title="Invitation Request">
                                    <p>Message: Hi {lead.name}, I'm building consultive AI...</p>
                                </TimelineItem>
                                <TimelineItem icon={CircleDot} title="Connection Status">
                                    <p>Checked connection status</p>
                                </TimelineItem>
                                <TimelineItem icon={MessageSquareReply} title="Replied">
                                    <p>View Reply</p>
                                </TimelineItem>
                            </div>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}

