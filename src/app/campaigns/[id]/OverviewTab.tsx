import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Send, CheckCircle, MessageSquareReply, type LucideProps } from "lucide-react";
import type { Campaign } from "../actions";
import React from "react";

// A small helper component for each stat card
// **FIX:** Added explicit types for the component props to resolve the errors.
const StatCard = ({
    title,
    value,
    icon: Icon
}: {
    title: string;
    value: string | number;
    icon: React.ElementType<LucideProps>
}) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);

// This component displays all the content for the "Overview" tab
export function OverviewTab({ campaign }: { campaign: Campaign }) {
    // For this assignment, we'll use mock data for stats.
    const totalLeads = 20;
    const acceptanceRate = 35.5;
    const replyRate = 15.2;

    return (
        <div className="space-y-6">
            {/* Top row of stat cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Leads" value={totalLeads} icon={Users} />
                <StatCard title="Request Sent" value="0" icon={Send} />
                <StatCard title="Request Accepted" value="0" icon={CheckCircle} />
                <StatCard title="Request Replied" value="0" icon={MessageSquareReply} />
            </div>

            {/* Bottom row with progress and details */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Campaign Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span>Leads Contacted</span>
                                <span>{totalLeads}</span>
                            </div>
                            <Progress value={100} />
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span>Acceptance Rate</span>
                                <span>{acceptanceRate}%</span>
                            </div>
                            <Progress value={acceptanceRate} />
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span>Reply Rate</span>
                                <span>{replyRate}%</span>
                            </div>
                            <Progress value={replyRate} />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Campaign Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong>Start Date:</strong> 02/09/2025</p>
                        <p><strong>Status:</strong> {campaign.status}</p>
                        <p><strong>Conversion Rate:</strong> 0.0%</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}