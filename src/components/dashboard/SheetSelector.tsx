"use client";

import { useData } from "@/context/DataContext";
import { Layers } from "lucide-react";

export function SheetSelector() {
    const { sheetNames, activeSheet, setActiveSheet, fileName } = useData();

    if (!fileName || sheetNames.length <= 1) return null;

    return (
        <div className="mb-6 flex flex-wrap items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-1.5 mr-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                <Layers className="h-4 w-4" />
                <span>Các Tab dữ liệu:</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {sheetNames.map((name) => (
                    <button
                        key={name}
                        onClick={() => setActiveSheet(name)}
                        className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${activeSheet === name
                                ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                                : "border-gray-200 bg-white text-gray-600 hover:border-blue-400 hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-400 dark:hover:border-blue-500 dark:hover:text-blue-400"
                            }`}
                    >
                        {name}
                    </button>
                ))}
            </div>
        </div>
    );
}
