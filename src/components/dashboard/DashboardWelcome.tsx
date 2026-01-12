"use client";

import { BarChart3, Brain, Shield, Zap, TrendingUp, PieChart as PieChartIcon, Activity } from "lucide-react";
import { Bar, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function DashboardWelcome() {
    // Sample data for the demo chart
    const sampleData = {
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
        datasets: [
            {
                label: "Hiệu suất dự kiến",
                data: [45, 59, 80, 81, 56, 95],
                backgroundColor: "rgba(99, 102, 241, 0.5)",
                borderColor: "rgba(99, 102, 241, 1)",
                borderWidth: 2,
                borderRadius: 4,
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const chartOptions = {
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
            y: { display: false },
            x: { grid: { display: false } }
        }
    };

    const stats = [
        {
            title: "Phân tích Thông minh",
            desc: "Sử dụng Gemini AI để tìm ra xu hướng ẩn",
            icon: Brain,
            color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
        },
        {
            title: "Trực quan hóa Đỉnh cao",
            desc: "Biểu đồ hiện đại và dễ dàng tùy chỉnh",
            icon: BarChart3,
            color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
        },
        {
            title: "Bảo mật Tuyệt đối",
            desc: "Dữ liệu của bạn được mã hóa an toàn",
            icon: Shield,
            color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
        },
        {
            title: "Tốc độ Vượt trội",
            desc: "Phân tích hàng ngàn dòng dữ liệu trong tích tắc",
            icon: Zap,
            color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
        },
    ];

    return (
        <div className="space-y-10 animate-in-fade">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl opacity-50" />
                <div className="relative flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                            <Activity className="h-3.5 w-3.5" />
                            Sẵn sàng khởi tạo
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white lg:text-4xl">
                            Khám phá tiềm năng <br className="hidden lg:block" />
                            <span className="text-blue-600">dữ liệu của bạn</span>
                        </h2>
                        <p className="max-w-xl text-lg text-gray-500 dark:text-gray-400">
                            Bắt đầu bằng cách tải lên tệp Excel hoặc CSV. Hệ thống AI của chúng tôi sẽ giúp bạn phân tích và trực quan hóa dữ liệu chỉ trong vài giây.
                        </p>
                    </div>

                    <div className="w-full md:w-[350px] lg:w-[450px] h-[250px] glass-card p-4 relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mẫu xem trước (Sample View)</span>
                            <div className="flex gap-1">
                                <div className="h-2 w-2 rounded-full bg-red-400" />
                                <div className="h-2 w-2 rounded-full bg-amber-400" />
                                <div className="h-2 w-2 rounded-full bg-green-400" />
                            </div>
                        </div>
                        <div className="h-[180px]">
                            <Line data={sampleData} options={chartOptions} />
                        </div>
                        <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[1px] group-hover:backdrop-blur-0 transition-all pointer-events-none border border-white/20 dark:border-zinc-800" />
                    </div>
                </div>
            </div>

            {/* Features/Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="glass-card p-6 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform">
                        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color} shadow-sm transition-transform group-hover:scale-110`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{stat.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{stat.desc}</p>
                    </div>
                ))}
            </div>

            {/* Preview Section Two */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <h4 className="text-xl font-bold">Phân tích xu hướng</h4>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Hệ thống tự động phát hiện các xu hướng tăng trưởng, sự giảm sút và các điểm dị thường trong tập dữ liệu của bạn nhờ thuật toán tiên tiến.
                    </p>
                    <div className="h-40 mt-4 rounded-xl bg-gray-50 dark:bg-zinc-950 p-4 border border-dashed border-gray-200 dark:border-zinc-800 flex items-end gap-2">
                        {[40, 70, 45, 90, 65, 80, 50, 95].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-indigo-500/20 rounded-t-sm border-t-2 border-indigo-500 animate-pulse"
                                style={{ animationDelay: `${i * 100}ms`, height: `${h}%` }}
                            />
                        ))}
                    </div>
                </div>

                <div className="glass-card p-8 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400">
                            <PieChartIcon className="h-5 w-5" />
                        </div>
                        <h4 className="text-xl font-bold">Cấu trúc dữ liệu</h4>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Hiểu rõ tỷ lệ và đóng góp của từng thành phần trong tổng thể dữ liệu kinh doanh hoặc phân tích của bạn một cách trực quan.
                    </p>
                    <div className="mt-4 flex items-center justify-center py-4">
                        <div className="relative h-32 w-32 rounded-full border-[16px] border-gray-100 dark:border-zinc-800">
                            <div className="absolute top-[-16px] left-[-16px] h-32 w-32 rounded-full border-[16px] border-pink-500 border-r-transparent border-b-transparent rotate-45" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-400">75%</span>
                            </div>
                        </div>
                        <div className="ml-8 space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-pink-500" />
                                <span className="text-xs text-gray-500">Mục tiêu đạt được</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-gray-200 dark:bg-zinc-700" />
                                <span className="text-xs text-gray-500">Đang thực hiện</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
