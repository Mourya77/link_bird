import { notFound } from "next/navigation";
import { getCampaignById } from "../actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./OverviewTab";
import { LeadsTab } from "./LeadsTab";
import { SequenceTab } from "./SequenceTab";
import { SettingsTab } from "./SettingsTab"; // Import the final component

export default async function CampaignDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const campaignId = parseInt(params.id, 10);
    const campaign = await getCampaignById(campaignId);

    if (!campaign) {
        return notFound();
    }

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">{campaign.name}</h1>
                    <p className="text-gray-500">
                        Manage and track your campaign performance.
                    </p>
                </div>
                <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>
                    {campaign.status}
                </Badge>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 max-w-lg">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="leads">Leads</TabsTrigger>
                    <TabsTrigger value="sequence">Sequence</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4">
                    <OverviewTab campaign={campaign} />
                </TabsContent>

                <TabsContent value="leads" className="mt-4">
                    <Card>
                        <CardHeader><CardTitle>Leads in this Campaign</CardTitle></CardHeader>
                        <CardContent>
                            <LeadsTab campaignId={campaign.id} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="sequence">
                    <SequenceTab campaign={campaign} />
                </TabsContent>

                {/* **THE FINAL CHANGE IS HERE** */}
                <TabsContent value="settings">
                    <SettingsTab campaign={campaign} />
                </TabsContent>
            </Tabs>
        </div>
    );
}