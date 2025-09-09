import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CampaignsTable } from "./CampaignsTable"; // Import the table component

export default function CampaignsPage() {
    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Campaigns</h1>
                    <p className="text-gray-500">Manage your campaigns and track their performance.</p>
                </div>
                <Button>Create Campaign</Button>
            </div>

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>All Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* This is the crucial change: render the table instead of the placeholder */}
                    <CampaignsTable />
                </CardContent>
            </Card>
        </div>
    );
}