"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { getUserHistory } from "@/app/actions/history";
import { useRouter } from "next/navigation";
import { Calendar, FileText, ArrowRight, Loader2, Database } from "lucide-react";

export default function HistoryPage() {
    const { user } = useAuth();
    const { setParsedData, setInsights } = useData();
    const router = useRouter();
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;
            try {
                setLoading(true);
                const result = await getUserHistory(user.uid);
                if (result.success) {
                    setHistory(result.history || []);
                } else {
                    setError(result.error || "Failed to fetch history");
                }
            } catch (err: any) {
                setError(err.message || "An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user]);

    const handleViewHistory = (item: any) => {
        // Handle migration from old array format to new record format
        let allData: Record<string, any[]> = {};
        let sheetNamesList: string[] = [];

        if (Array.isArray(item.dataPreview)) {
            // Old format: dataPreview is an array of rows from a single sheet
            const defaultSheetName = "Sheet1";
            allData = { [defaultSheetName]: item.dataPreview };
            sheetNamesList = [defaultSheetName];
        } else if (item.dataPreview && typeof item.dataPreview === 'object') {
            // New format: dataPreview is Record<string, any[]>
            allData = item.dataPreview;
            sheetNamesList = Object.keys(allData);
        }

        // Set context data
        setParsedData(allData, sheetNamesList, item.fileName);
        setInsights(item.insights);
        // Redirect to dashboard
        router.push("/");
    };

    return (
        <ProtectedRoute>
            <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-black font-sans">
                <Sidebar />
                <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
                <div className="flex flex-1 flex-col overflow-hidden">
                    <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                    <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analysis History</h1>
                                    <p className="mt-2 text-gray-500 dark:text-gray-400">View your past data analysis sessions.</p>
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                                    <p className="mt-4 text-gray-500">Loading your history...</p>
                                </div>
                            ) : error ? (
                                <div className="rounded-lg bg-red-50 p-6 text-center text-red-600 dark:bg-red-900/20 dark:text-red-400">
                                    {error}
                                </div>
                            ) : history.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 rounded-xl border-2 border-dashed border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                                    <div className="rounded-full bg-gray-100 p-3 dark:bg-zinc-800 mb-4">
                                        <Database className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">No analysis history found.</p>
                                    <p className="text-sm text-gray-400 mt-1">Start by uploading a file on the Dashboard.</p>
                                    <button
                                        onClick={() => router.push("/")}
                                        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
                                    >
                                        Go to Dashboard
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {history.map((item) => (
                                        <div
                                            key={item.id}
                                            className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-blue-200 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-900/50"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <div className="flex items-center text-xs text-gray-400">
                                                    <Calendar className="h-3 w-3 mr-1" />
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>

                                            <h3 className="font-semibold text-gray-900 dark:text-white truncate mb-1" title={item.fileName}>
                                                {item.fileName}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                                {item.totalRows} rows analyzed
                                            </p>

                                            <button
                                                onClick={() => handleViewHistory(item)}
                                                className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-gray-50 py-2.5 text-sm font-medium text-gray-700 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-zinc-800 dark:text-gray-300 dark:group-hover:bg-blue-600"
                                            >
                                                View Analysis
                                                <ArrowRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
