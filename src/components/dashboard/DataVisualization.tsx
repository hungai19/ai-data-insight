"use client";

import { useData } from "@/context/DataContext";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
);

export function DataVisualization() {
    const { data } = useData();

    const chartData = useMemo(() => {
        if (!data || data.length === 0) return null;

        // 1. Sales by Category (Bar Chart)
        const salesByCategory: Record<string, number> = {};
        data.forEach((row: any) => {
            const category = row["Category"];
            const sales = Number(row["Sales"]) || 0;
            if (category) {
                salesByCategory[category] = (salesByCategory[category] || 0) + sales;
            }
        });

        const categoryLabels = Object.keys(salesByCategory);
        const categoryValues = Object.values(salesByCategory);

        const barData = {
            labels: categoryLabels,
            datasets: [
                {
                    label: "Total Sales",
                    data: categoryValues,
                    backgroundColor: [
                        "rgba(59, 130, 246, 0.7)", // Blue
                        "rgba(16, 185, 129, 0.7)", // Green
                        "rgba(245, 158, 11, 0.7)", // Amber
                        "rgba(239, 68, 68, 0.7)", // Red
                        "rgba(139, 92, 246, 0.7)", // Violet
                    ],
                    borderColor: [
                        "rgb(59, 130, 246)",
                        "rgb(16, 185, 129)",
                        "rgb(245, 158, 11)",
                        "rgb(239, 68, 68)",
                        "rgb(139, 92, 246)",
                    ],
                    borderWidth: 1,
                },
            ],
        };

        // 2. Sales by Region (Doughnut Chart)
        const salesByRegion: Record<string, number> = {};
        data.forEach((row: any) => {
            const region = row["Region"];
            const sales = Number(row["Sales"]) || 0;
            if (region) {
                salesByRegion[region] = (salesByRegion[region] || 0) + sales;
            }
        });

        const doughnutData = {
            labels: Object.keys(salesByRegion),
            datasets: [
                {
                    label: "Sales by Region",
                    data: Object.values(salesByRegion),
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.7)",
                        "rgba(54, 162, 235, 0.7)",
                        "rgba(255, 206, 86, 0.7)",
                        "rgba(75, 192, 192, 0.7)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        };

        // 3. Sales Trend Over Time (Line Chart)
        // Assuming 'Date' column exists and is somewhat capable of being sorted
        const salesByDate: Record<string, number> = {};
        data.forEach(row => {
            const dateRaw = row['Date'];
            if (dateRaw) {
                const sales = Number(row["Sales"]) || 0;
                salesByDate[dateRaw] = (salesByDate[dateRaw] || 0) + sales;
            }
        })

        // Sort dates
        const sortedDates = Object.keys(salesByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

        const lineData = {
            labels: sortedDates,
            datasets: [
                {
                    label: 'Sales Trend',
                    data: sortedDates.map(date => salesByDate[date]),
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    tension: 0.3
                }
            ]
        }


        return { barData, doughnutData, lineData };
    }, [data]);

    if (!chartData) return null;

    return (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Bar Chart */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Sales by Category
                </h3>
                <Bar data={chartData.barData} options={{ responsive: true }} />
            </div>

            {/* Doughnut Chart */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Sales by Region
                </h3>
                <div className="mx-auto flex h-64 w-full justify-center">
                    <Doughnut data={chartData.doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </div>

            {/* Line Chart - Full Width */}
            <div className="col-span-1 lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Sales Trend
                </h3>
                <Line data={chartData.lineData} options={{ responsive: true }} />
            </div>
        </div>
    );
}
