"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Campaign } from "../actions";
import { useState } from "react";

// This component displays all the content for the "Settings" tab
export function SettingsTab({ campaign }: { campaign: Campaign }) {
    // We use local state for the toggle switches
    const [autopilot, setAutopilot] = useState(false);
    const [personalization, setPersonalization] = useState(true);

    return (
        <div className="space-y-8 mt-4">
            {/* Campaign Details Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Campaign Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="campaign-name">Campaign Name</Label>
                        <Input id="campaign-name" defaultValue={campaign.name} />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label>Campaign Status</Label>
                        </div>
                        <Switch defaultChecked={campaign.status === 'Active'} />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label>Request without personalization</Label>
                        </div>
                        <Switch checked={personalization} onCheckedChange={setPersonalization} />
                    </div>
                </CardContent>
            </Card>

            {/* AutoPilot Mode Card */}
            <Card>
                <CardHeader>
                    <CardTitle>AutoPilot Mode</CardTitle>
                    <p className="text-sm text-gray-500">Let the system automatically manage Linkedin account assignments</p>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label>Autopilot</Label>
                        </div>
                        <Switch checked={autopilot} onCheckedChange={setAutopilot} />
                    </div>
                </CardContent>
            </Card>

            {/* Danger Zone Card */}
            <Card className="border-red-500/50">
                <CardHeader>
                    <CardTitle>Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Delete Campaign</p>
                            <p className="text-sm text-gray-500">Permanently delete this campaign and all associated data.</p>
                        </div>
                        <Button variant="destructive">Delete Campaign</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button size="lg">Save All Changes</Button>
            </div>
        </div>
    );
}