"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Campaign } from "../actions";

const availableFields = [
    "{{firstName}}",
    "{{lastName}}",
    "{{fullName}}",
    "{{jobTitle}}",
];

export function SequenceTab({ campaign }: { campaign: Campaign }) {
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Message Sequence</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column: Available Fields */}
                    <div>
                        <h3 className="font-semibold mb-2">Request Message</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Edit your request message here.
                        </p>
                        <div className="space-y-2">
                            <h4 className="font-medium text-sm">Available fields:</h4>
                            <div className="flex flex-wrap gap-2">
                                {availableFields.map((field) => (
                                    <Button key={field} variant="outline" size="sm">
                                        {field}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Message Template Editor */}
                    <div>
                        <h3 className="font-semibold mb-2">Message Template</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Use {'{{fieldName}}'} to insert mapped fields from your data.
                        </p>
                        <Textarea
                            className="min-h-[150px]"
                            placeholder="Hi {{firstName}}, let's connect!"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline">Preview</Button>
                            <Button>Save</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}