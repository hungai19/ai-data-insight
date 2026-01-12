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
import { Bar, Line, Pie } from "react-chartjs-2";
import { useMemo, useState, useRef } from "react";
import { BarChart3, LineChart, PieChart, Sparkles, Loader2, FileDown, Presentation } from "lucide-react";
import { analyzeChartData } from "@/app/actions/gemini";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import pptxgen from "pptxgenjs";

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
    const chartRef = useRef<any>(null);
    const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
    const [xAxis, setXAxis] = useState("");
    const [yAxis, setYAxis] = useState("");

    const [aiInsight, setAiInsight] = useState("");
    const [loadingAI, setLoadingAI] = useState(false);

    const headers = useMemo(() => {
        if (!data || data.length === 0) return [];
        return Object.keys(data[0]);
    }, [data]);

    // Auto-select defaults when headers change (e.g. after uploading or switching sheets)
    useMemo(() => {
        if (headers.length >= 2) {
            // If current selection is not valid for new headers, reset them
            const isXValid = headers.includes(xAxis);
            const isYValid = headers.includes(yAxis);

            if (!xAxis || !isXValid) setXAxis(headers[0]);

            if (!yAxis || !isYValid) {
                // Try to find a numeric column
                const numericCol = headers.find((h: string) => {
                    const val = data?.[0]?.[h];
                    const numVal = Number(val);
                    return !isNaN(numVal) && typeof val !== "boolean";
                });
                setYAxis(numericCol || headers[1]);
            }
        }
    }, [headers, data]);

    const processedData = useMemo(() => {
        if (!data || !xAxis || !yAxis) return null;

        const aggregated: Record<string, number> = {};
        data.forEach((row: any) => {
            const label = String(row[xAxis] || "Unknown");
            const value = Number(row[yAxis]) || 0;
            aggregated[label] = (aggregated[label] || 0) + value;
        });

        const labels = Object.keys(aggregated);
        const values = Object.values(aggregated);

        // Modern Professional Color Palettes
        const colors = [
            "rgba(99, 102, 241, 0.85)",  // Indigo
            "rgba(14, 165, 233, 0.85)",  // Sky Blue
            "rgba(168, 85, 247, 0.85)",  // Purple
            "rgba(20, 184, 166, 0.85)",  // Teal
            "rgba(236, 72, 153, 0.85)",  // Pink
            "rgba(245, 158, 11, 0.85)",  // Amber
            "rgba(34, 197, 94, 0.85)",   // Green
            "rgba(239, 68, 68, 0.85)"    // Red
        ];

        return {
            labels,
            datasets: [
                {
                    label: `Tổng ${yAxis}`,
                    data: values,
                    backgroundColor: (context: any) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;
                        if (!chartArea) return colors[context.dataIndex % colors.length];

                        // Create gradient for Bar/Line
                        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                        const baseColor = colors[context.dataIndex % colors.length];
                        gradient.addColorStop(0, baseColor.replace("0.85", "0.4"));
                        gradient.addColorStop(1, baseColor);
                        return gradient;
                    },
                    borderColor: colors.map(c => c.replace("0.85", "1")),
                    borderWidth: 2,
                    borderRadius: chartType === "bar" ? 8 : 0,
                    tension: 0.4,
                    fill: chartType === "line",
                    pointBackgroundColor: "#fff",
                    pointBorderColor: colors[0].replace("0.85", "1"),
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                },
            ],
        };
    }, [data, xAxis, yAxis, chartType]);

    const handleAIAnalysis = async () => {
        if (!processedData) return;
        setLoadingAI(true);
        setAiInsight("");
        try {
            const chartInfo = {
                type: chartType,
                xAxis,
                yAxis,
                summary: (processedData.labels as string[]).map((l, i) => `${l}: ${processedData.datasets[0].data[i]}`).join(", ")
            };
            const result = await analyzeChartData(chartInfo);
            setAiInsight(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingAI(false);
        }
    };

    const exportToPDF = async () => {
        const element = document.getElementById("chart-export-area");
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                onclone: (clonedDoc) => {
                    // Force sanitization by string replacement on the entire clones body and styles
                    // This is the most aggressive way to remove any oklch() or lab() that html2canvas can't parse
                    const sanitizeString = (str: string) => {
                        return str.replace(/oklch\([^)]+\)/g, "rgb(0,0,0)").replace(/lab\([^)]+\)/g, "rgb(0,0,0)");
                    };

                    // Sanitize all style tags
                    const styles = clonedDoc.getElementsByTagName("style");
                    for (let i = 0; i < styles.length; i++) {
                        styles[i].innerHTML = sanitizeString(styles[i].innerHTML);
                    }

                    const clonedExportArea = clonedDoc.getElementById("chart-export-area");
                    if (clonedExportArea) {
                        // Hide buttons and force safe styles
                        const allElements = clonedExportArea.querySelectorAll('*');
                        allElements.forEach((el) => {
                            if (el instanceof HTMLElement) {
                                if (el.tagName === 'BUTTON' || el.tagName === 'SELECT') {
                                    el.style.display = 'none';
                                }
                                if (el.innerText.trim().length > 0) {
                                    el.style.color = "black";
                                }
                            }
                        });

                        clonedExportArea.style.padding = "40px";
                        clonedExportArea.style.backgroundColor = "white";
                        clonedExportArea.style.color = "black";
                        clonedExportArea.style.width = "1200px";
                    }
                }
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("l", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`DataInsight_BaoCao_${new Date().getTime()}.pdf`);
        } catch (error) {
            console.error("PDF Export Error:", error);
            alert("Lỗi khi xuất PDF. Vui lòng thử lại.");
        }
    };

    const exportToPPTX = async () => {
        if (!chartRef.current) return;

        try {
            const chartImage = chartRef.current.toBase64Image();
            const pptx = new pptxgen();
            const slide = pptx.addSlide();

            slide.addText(`Phân tích dữ liệu: ${yAxis} theo ${xAxis}`, {
                x: 0.5, y: 0.3, w: "90%", fontSize: 24, color: "363636", bold: true
            });

            slide.addImage({ data: chartImage, x: 0.5, y: 1.2, w: 9, h: 4.5 });

            if (aiInsight) {
                const analysisSlide = pptx.addSlide();
                analysisSlide.addText("Thông tin hiểu biết (AI Insights)", {
                    x: 0.5, y: 0.5, fontSize: 22, color: "6366f1", bold: true
                });

                // Clean markdown and prepare text objects for pptxgenjs
                const textObjects = aiInsight.split("\n")
                    .filter(l => l.trim().length > 0)
                    .map(l => {
                        // Remove markdown symbols and trim
                        const cleanText = l.replace(/[\*\#\-\_\>]/g, "").trim();
                        return { text: cleanText, options: { bullet: true, fontSize: 14, color: "404040" } };
                    })
                    .filter(obj => obj.text.length > 0);

                if (textObjects.length > 0) {
                    analysisSlide.addText(textObjects as any, {
                        x: 0.5, y: 1.2, w: "90%", h: 5, align: pptx.AlignH.left, valign: pptx.AlignV.top
                    });
                }
            }

            pptx.writeFile({ fileName: `DataInsight_${new Date().getTime()}.pptx` });
        } catch (error) {
            console.error("PPTX Export Error:", error);
            alert("Không thể xuất PowerPoint. Vui lòng thử lại.");
        }
    };

    if (!data || data.length === 0) return null;

    return (
        <div className="mt-8 space-y-8">
            <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Tùy chỉnh biểu đồ</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Chart Type Selector */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Loại biểu đồ</label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => setChartType("bar")}
                                className={`flex items-center justify-center gap-2 rounded-md border p-2 text-sm transition-all ${chartType === "bar" ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-200 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800"}`}
                            >
                                <BarChart3 className="h-4 w-4 shrink-0" /> <span className="truncate">Bar</span>
                            </button>
                            <button
                                onClick={() => setChartType("line")}
                                className={`flex items-center justify-center gap-2 rounded-md border p-2 text-sm transition-all ${chartType === "line" ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-200 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800"}`}
                            >
                                <LineChart className="h-4 w-4 shrink-0" /> <span className="truncate">Line</span>
                            </button>
                            <button
                                onClick={() => setChartType("pie")}
                                className={`flex items-center justify-center gap-2 rounded-md border p-2 text-sm transition-all ${chartType === "pie" ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-200 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800"}`}
                            >
                                <PieChart className="h-4 w-4 shrink-0" /> <span className="truncate">Pie</span>
                            </button>
                        </div>
                    </div>

                    {/* X Axis Selector */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nhãn (Trục X)</label>
                        <select
                            value={xAxis}
                            onChange={(e) => setXAxis(e.target.value)}
                            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800"
                        >
                            {headers.map(h => <option key={h} value={h}>{h}</option>)}
                        </select>
                    </div>

                    {/* Y Axis Selector */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Giá trị (Trục Y)</label>
                        <select
                            value={yAxis}
                            onChange={(e) => setYAxis(e.target.value)}
                            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800"
                        >
                            {headers.map(h => <option key={h} value={h}>{h}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="chart-export-area">
                {/* Chart Display */}
                <div className="lg:col-span-2 glass-card p-6" id="chart-container">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                                {chartType} Chart
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {yAxis} theo {xAxis}
                            </p>
                        </div>
                    </div>

                    <div className="relative min-h-[350px] md:min-h-[450px] w-full flex items-center justify-center">
                        {processedData ? (
                            <>
                                {chartType === "bar" && (
                                    <Bar
                                        ref={chartRef}
                                        data={processedData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: { display: false },
                                                tooltip: {
                                                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                                                    padding: 12,
                                                    cornerRadius: 8,
                                                    titleFont: { size: 14, weight: "bold" },
                                                    bodyFont: { size: 14 },
                                                }
                                            },
                                            scales: {
                                                y: { grid: { tickBorderDash: [5, 5] } },
                                                x: { grid: { display: false } }
                                            }
                                        }}
                                    />
                                )}
                                {chartType === "line" && (
                                    <Line
                                        ref={chartRef}
                                        data={processedData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: { display: false },
                                                tooltip: {
                                                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                                                    padding: 12,
                                                    cornerRadius: 8,
                                                }
                                            },
                                            scales: {
                                                y: { grid: { tickBorderDash: [5, 5] } },
                                                x: { grid: { display: false } }
                                            }
                                        }}
                                    />
                                )}
                                {chartType === "pie" && (
                                    <Pie
                                        ref={chartRef}
                                        data={processedData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: { position: "bottom" }
                                            }
                                        }}
                                    />
                                )}
                            </>
                        ) : (
                            <p className="text-gray-500">Đang chuẩn bị dữ liệu...</p>
                        )}
                    </div>
                </div>

                {/* AI Analysis Section */}
                <div className="glass-card p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Phân tích</h3>
                    </div>

                    {!aiInsight && !loadingAI && (
                        <div className="flex flex-col items-center justify-center flex-1 py-12 text-center">
                            <p className="text-sm text-gray-500 mb-4">Bạn muốn AI giúp phân tích ý nghĩa của biểu đồ này không?</p>
                            <button
                                onClick={handleAIAnalysis}
                                className="rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                AI Phân tích biểu đồ này
                            </button>
                        </div>
                    )}

                    {loadingAI && (
                        <div className="flex flex-col items-center justify-center flex-1 py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-2" />
                            <p className="text-sm text-gray-500">Đang phân tích...</p>
                        </div>
                    )}

                    {aiInsight && (
                        <div className="flex-1 flex flex-col">
                            <div className="flex-1 overflow-auto">
                                <div className="prose prose-sm dark:prose-invert text-gray-700 dark:text-gray-300">
                                    <ReactMarkdown>{aiInsight}</ReactMarkdown>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 flex flex-wrap gap-2">
                                <button
                                    onClick={exportToPDF}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 text-xs font-semibold transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-gray-300"
                                >
                                    <FileDown className="h-3.5 w-3.5" /> PDF
                                </button>
                                <button
                                    onClick={exportToPPTX}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-2 text-xs font-semibold transition-colors dark:bg-orange-900/20 dark:hover:bg-orange-900/30 dark:text-orange-400"
                                >
                                    <Presentation className="h-3.5 w-3.5" /> PowerPoint
                                </button>
                                <button
                                    onClick={() => setAiInsight("")}
                                    className="w-full text-center py-2 text-[10px] text-gray-400 hover:text-purple-600 underline"
                                >
                                    Phân tích lại
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
