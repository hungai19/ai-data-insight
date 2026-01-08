"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";
import { generateInsights } from "@/app/actions/gemini";
import { Sparkles, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function AIInsights() {
    const { data } = useData();
    const [insights, setInsights] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerateInsights = async () => {
        if (!data || data.length === 0) return;

        setLoading(true);
        setError("");
        setInsights("");

        try {
            // Prepare a lightweight summary to send to API to avoid token limits
            // We'll summarize basics here
            const totalRows = data.length;
            const headers = Object.keys(data[0]).join(", ");
            const sampleRows = JSON.stringify(data.slice(0, 10)); // Send first 10 rows as context

            // Basic aggregation for context
            // Note: In a real app, do more aggregation here before sending
            const summary = `
        Dataset Headers: ${headers}
        Total Rows: ${totalRows}
        Sample Data (first 10 rows): ${sampleRows}
      `;

            const result = await generateInsights(summary);
            setInsights(result);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to generate insights. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!data || data.length === 0) return null;

    return (
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        AI Data Insights
                    </h3>
                </div>
                {!insights && !loading && (
                    <button
                        onClick={handleGenerateInsights}
                        className="rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                        Generate Insights
                    </button>
                )}
            </div>

            <div className="mt-4">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Analyzing your data...
                        </p>
                    </div>
                )}

                {error && (
                    <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-300">
                        {error}
                    </div>
                )}

                {insights && (
                    <div className="prose prose-sm max-w-none dark:prose-invert text-gray-700 dark:text-gray-300">
                        <ReactMarkdown>{insights}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}
