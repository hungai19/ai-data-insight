"use client";

import { useData } from "@/context/DataContext";

export function DataPreview() {
    const { data, fileName } = useData();

    if (!data || data.length === 0) return null;

    // Get headers from the first object keys
    const headers = Object.keys(data[0]);

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    Data Preview: <span className="text-blue-600">{fileName}</span>
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Total Rows: {data.length}
                </span>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-zinc-800">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
                        <thead className="bg-gray-50 dark:bg-zinc-900">
                            <tr>
                                {headers.map((header) => (
                                    <th
                                        key={header}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-zinc-800 dark:bg-black">
                            {data.slice(0, 5).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {headers.map((header, colIndex) => (
                                        <td
                                            key={`${rowIndex}-${colIndex}`}
                                            className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-300"
                                        >
                                            {row[header]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-gray-50 px-6 py-3 text-center text-xs text-gray-500 dark:bg-zinc-900 dark:text-gray-400">
                    Showing first 5 rows
                </div>
            </div>
        </div>
    );
}
