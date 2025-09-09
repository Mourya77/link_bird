import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadsTable } from "./LeadsTable";
import { LeadDetailSheet } from "./LeadDetailSheet";

export default function LeadsPage() {
    return (
        <>
            <div className="p-8 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Leads</h1>
                    <p className="text-gray-500">Manage and track your prospects.</p>
                </div>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>All Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LeadsTable />
                    </CardContent>
                </Card>
            </div>

            <LeadDetailSheet />
        </>
    );
}