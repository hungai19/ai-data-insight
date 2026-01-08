"use client";

import { useData } from "@/context/DataContext";
import { UploadCloud, FileSpreadsheet, X, Loader2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

export function UploadExcel({ compact = false }: { compact?: boolean }) {
    const { setParsedData, fileName: currentFileName } = useData();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (!file) return;

            setLoading(true);
            setError("");

            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const binaryStr = e.target?.result;
                    if (!binaryStr) throw new Error("Failed to read file");

                    const workbook = XLSX.read(binaryStr, { type: "binary" });
                    const sheetName = workbook.SheetNames[0]; // Take the first sheet
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet);

                    if (jsonData.length === 0) {
                        setError("The uploaded file is empty or could not be parsed.");
                    } else {
                        console.log("Parsed Data Preview:", jsonData.slice(0, 5));
                        setParsedData(jsonData, file.name);
                    }
                } catch (err) {
                    console.error("Error parsing file:", err);
                    setError("Failed to parse file. Please ensure it is a valid Excel or CSV file.");
                } finally {
                    setLoading(false);
                }
            };

            reader.onerror = () => {
                setError("Failed to read file.");
                setLoading(false);
            };

            reader.readAsBinaryString(file);
        },
        [setParsedData]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
                ".xlsx",
            ],
            "application/vnd.ms-excel": [".xls"],
            "text/csv": [".csv"],
        },
        maxFiles: 1,
        multiple: false,
    });

    if (compact) {
        return (
            <div className="w-full md:w-80">
                <div
                    {...getRootProps()}
                    className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-4 transition-all 
                        ${isDragActive
                            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10"
                            : "border-gray-300 bg-white hover:border-blue-500 hover:bg-blue-50/50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-500 dark:hover:bg-blue-900/10"
                        }
                    `}
                >
                    <input {...getInputProps()} />
                    {loading ? (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing...
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <UploadCloud className="h-4 w-4" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-semibold text-gray-900 dark:text-white">
                                    {currentFileName ? "Replace File" : "Upload Data"}
                                </p>
                                <p className="text-[10px] text-gray-500">XLSX, CSV</p>
                            </div>
                        </div>
                    )}

                    {currentFileName && !loading && (
                        <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white ring-2 ring-white dark:ring-zinc-900">
                            <FileSpreadsheet className="h-3 w-3" />
                        </div>
                    )}
                </div>
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
        )
    }

    return (
        <div className="w-full max-w-2xl mx-auto mt-10">
            <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-gray-900/5 dark:bg-zinc-900 dark:ring-white/10">
                {/* Decorative Background Gradients */}
                <div className="absolute -top-24 -left-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

                <div className="relative flex flex-col items-center justify-center text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Upload your Data
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Drag and drop your Excel or CSV file here to start exploring
                        insights.
                    </p>

                    <div
                        {...getRootProps()}
                        className={`group mt-8 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 transition-all 
                ${isDragActive
                                ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10"
                                : "border-gray-300 bg-gray-50/50 hover:border-blue-500 hover:bg-blue-50/50 dark:border-zinc-700 dark:bg-zinc-900/50 dark:hover:border-blue-500 dark:hover:bg-blue-900/10"
                            }
            `}
                    >
                        <input {...getInputProps()} />
                        {loading ? (
                            <div className="flex flex-col items-center">
                                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                                <p className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
                                    Processing...
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-transform group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
                                    <UploadCloud className="h-8 w-8" />
                                </div>
                                <p className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
                                    <span className="text-blue-600 dark:text-blue-400">
                                        Click to upload
                                    </span>{" "}
                                    or drag and drop
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    XLSX, CSV (max. 10MB)
                                </p>
                            </>
                        )}
                    </div>

                    {error && (
                        <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-300">
                            {error}
                        </div>
                    )}

                    {currentFileName && !loading && !error && (
                        <div className="mt-8 flex w-full items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                            <div className="flex-shrink-0">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                    <FileSpreadsheet className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="min-w-0 flex-1 text-left">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {currentFileName}
                                </p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                    Ready for analysis
                                </p>
                            </div>
                            <div className="relative flex items-center justify-center rounded-lg border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ">
                                Success
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
