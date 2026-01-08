"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { generateInsights } from "@/app/actions/gemini";
import { saveAnalysis } from "@/app/actions/history";
import { Sparkles, Loader2, CheckCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function AIInsights() {
    const { data, fileName, insights, setInsights } = useData();
    const { user } = useAuth();
    // const [insights, setInsights] = useState(""); // Removed local state
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleGenerateInsights = async () => {
        if (!data || data.length === 0) return;

        setLoading(true);
        setError("");
        setInsights("");

        try {
            // ... (keep summary logic same) ...
            const totalRows = data.length;
            const headers = Object.keys(data[0]).join(", ");
            const sampleRows = JSON.stringify(data.slice(0, 10));

            const summary = `
        Dataset Headers: ${headers}
        Total Rows: ${totalRows}
        Sample Data (first 10 rows): ${sampleRows}
      `;

            const result = await generateInsights(summary);
            setInsights(result);
            setLoading(false); // End main loading immediately after AI result

            // Save to history automatically in background
            if (user && result) {
                setSaving(true);
                try {
                    const saveResult = await saveAnalysis(user.uid, fileName || "unnamed_analysis", result, data);
                    if (!saveResult.success) {
                        console.error("Save failed:", saveResult.error);
                    }
                } catch (saveErr) {
                    console.error("Background save crash:", saveErr);
                } finally {
                    setSaving(false);
                }
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to generate insights. Please try again.");
            setLoading(false);
        } finally {
            // Ensure indicators are cleared
            setLoading(false);
            setSaving(false);
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
                {saving && (
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Saving to history...
                    </div>
                )}
                {insights && !saving && (
                    <div className="flex items-center gap-1 text-xs text-green-500">
                        <CheckCircle className="h-3 w-3" />
                        Saved to history
                    </div>
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
