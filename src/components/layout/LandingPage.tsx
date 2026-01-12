"use client";

import Link from "next/link";
import { MoveRight, BarChart3, Brain, Zap, Shield, ChevronRight } from "lucide-react";
import Image from "next/image";
import { MiniLoginForm } from "@/components/auth/MiniLoginForm";

export function LandingPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100">
            {/* Header / Nav */}
            <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-200 transition-transform group-hover:scale-105">
                            <BarChart3 className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900 lg:text-2xl">Data<span className="text-indigo-600">Insight</span></span>
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        <Link href="#features" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Tính năng</Link>
                        <Link href="#solutions" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Giải pháp</Link>
                        <Link href="#pricing" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Bảng giá</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            Đăng nhập
                        </Link>
                        <Link
                            href="/signup"
                            className="rounded-full bg-gray-900 px-5 py-2 text-sm font-bold text-white transition-all hover:bg-gray-800 hover:shadow-lg active:scale-95"
                        >
                            Dùng thử miễn phí
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-50/50 blur-[120px]" />

                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
                            <div className="space-y-8 animate-in-slide-up">
                                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                                    <Zap className="h-3 w-3" />
                                    <span>Nâng tầm phân tích dữ liệu</span>
                                </div>
                                <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                                    Biến dữ liệu thành <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Những hiểu biết</span> <br />
                                    đắt giá
                                </h1>
                                <p className="max-w-xl text-lg text-gray-600 leading-relaxed">
                                    Nền tảng phân tích dữ liệu AI mạnh mẽ giúp bạn nhập file Excel/CSV và nhận về các biểu đồ trực quan cùng báo cáo phân tích chuyên sâu chỉ trong vài giây.
                                </p>
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <Link
                                        href="/signup"
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/25 transition-all hover:bg-blue-700 hover:-translate-y-1 active:scale-95"
                                    >
                                        Bắt đầu ngay lập tức
                                        <MoveRight className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href="#demo"
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 text-sm font-bold text-gray-900 transition-all hover:bg-gray-50 active:scale-95"
                                    >
                                        Xem bản Demo
                                    </Link>
                                </div>

                            </div>

                            <div className="relative animate-in-fade lg:ml-10 flex flex-col items-center lg:items-end gap-12">
                                {/* Small Login form in top right area */}
                                <div className="z-20 w-full max-w-sm lg:-mr-6">
                                    <MiniLoginForm />
                                </div>

                                {/* Simplified, pure CSS/SVG Data Mockup instead of heavy image */}
                                <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-8 shadow-2xl shadow-blue-500/5 transition-all hover:shadow-blue-500/10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex gap-2">
                                            <div className="h-3 w-3 rounded-full bg-red-400/20" />
                                            <div className="h-3 w-3 rounded-full bg-amber-400/20" />
                                            <div className="h-3 w-3 rounded-full bg-green-400/20" />
                                        </div>
                                        <div className="h-2 w-24 rounded-full bg-gray-50" />
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-20 rounded-2xl bg-blue-50/50 flex flex-col items-center justify-center gap-2">
                                                <div className="h-1.5 w-10 rounded-full bg-blue-200" />
                                                <div className="h-3 w-12 rounded-full bg-blue-600" />
                                            </div>
                                            <div className="h-20 rounded-2xl bg-indigo-50/50 flex flex-col items-center justify-center gap-2">
                                                <div className="h-1.5 w-10 rounded-full bg-indigo-200" />
                                                <div className="h-3 w-12 rounded-full bg-indigo-600" />
                                            </div>
                                            <div className="h-20 rounded-2xl bg-purple-50/50 flex flex-col items-center justify-center gap-2">
                                                <div className="h-1.5 w-10 rounded-full bg-purple-200" />
                                                <div className="h-3 w-12 rounded-full bg-purple-600" />
                                            </div>
                                        </div>

                                        <div className="h-40 rounded-3xl bg-gray-50/50 p-6 relative overflow-hidden">
                                            <div className="flex items-end gap-2 h-full justify-between">
                                                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                                    <div key={i} className="w-full bg-blue-600/10 rounded-t-lg relative group">
                                                        <div
                                                            className="absolute bottom-0 w-full bg-blue-600 rounded-t-lg transition-all duration-1000 group-hover:bg-blue-700"
                                                            style={{ height: `${h}%` }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Glassmorphism overlays */}
                                    <div className="absolute top-1/2 -right-4 -translate-y-1/2 scale-90">
                                        <div className="glass p-4 rounded-2xl border border-white/60 shadow-xl space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                                    <Brain className="h-4 w-4" />
                                                </div>
                                                <div className="h-2 w-16 rounded-full bg-gray-200" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <div className="h-1.5 w-24 rounded-full bg-gray-100" />
                                                <div className="h-1.5 w-20 rounded-full bg-gray-100" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Background decoration */}
                                <div className="absolute -bottom-10 -right-10 -z-10 h-64 w-64 rounded-full bg-blue-50/50 blur-3xl" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 bg-gray-50/50">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center space-y-4 mb-16">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600">Mọi thứ bạn cần</h2>
                            <p className="text-4xl font-extrabold text-gray-900 tracking-tight">Công cụ phân tích dữ liệu toàn diện</p>
                            <p className="mx-auto max-w-2xl text-gray-500">
                                Không cần kiến thức lập trình hay kỹ năng nâng cao về Excel. Mọi thứ được tự động hóa.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={BarChart3}
                                title="Trực quan hóa đa dạng"
                                desc="Hàng chục loại biểu đồ hiện đại, sinh động giúp dữ liệu của bạn kể một câu chuyện hấp dẫn."
                                color="text-blue-600"
                                bg="bg-blue-100/50"
                            />
                            <FeatureCard
                                icon={Brain}
                                title="Insights từ Gemini AI"
                                desc="Kết nối với mô hình AI mạnh mẽ nhất của Google để nhận được các phân tích chuyên sâu tự động."
                                color="text-purple-600"
                                bg="bg-purple-100/50"
                            />
                            <FeatureCard
                                icon={Zap}
                                title="Xử lý thần tốc"
                                desc="Tải tệp lên và nhận kết quả ngay tức thì. Tiết kiệm hàng giờ đồng hồ làm việc thủ công."
                                color="text-amber-600"
                                bg="bg-amber-100/50"
                            />
                        </div>
                    </div>
                </section>

                {/* Integration / Mobile Preview Section */}
                <section className="py-24 overflow-hidden">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="rounded-3xl bg-blue-600 p-8 lg:p-16 relative overflow-hidden">
                            <div className="absolute right-0 top-0 -mr-32 -mt-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
                            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                                <div className="space-y-6 text-center lg:text-left text-white max-w-lg">
                                    <h2 className="text-3xl font-bold lg:text-4xl">Chuẩn bị sẵn sàng cho mobile</h2>
                                    <p className="text-blue-100 leading-relaxed">
                                        Theo dõi dữ liệu của bạn ở bất cứ đâu. Hệ thống của chúng tôi được tối ưu hóa hoàn hảo cho cả thiết bị máy tính và di động.
                                    </p>
                                    <Link
                                        href="/signup"
                                        className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-600 shadow-xl transition-all hover:bg-blue-50 active:scale-95"
                                    >
                                        Bắt đầu sử dụng miễn phí
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </div>
                                <div className="w-full lg:w-1/2 flex justify-center">
                                    <div className="h-[400px] w-[200px] rounded-[32px] border-[8px] border-blue-900 bg-white shadow-2xl shadow-blue-900/40 relative overflow-hidden">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-24 bg-blue-900 rounded-b-2xl" />
                                        <div className="p-4 pt-10 space-y-4">
                                            <div className="h-2 w-1/2 bg-gray-100 rounded" />
                                            <div className="h-20 w-full bg-blue-50 rounded-xl" />
                                            <div className="h-4 w-1/3 bg-gray-100 rounded" />
                                            <div className="h-24 w-full bg-gray-50 rounded-xl" />
                                            <div className="flex gap-2">
                                                <div className="h-8 w-8 rounded-lg bg-indigo-50" />
                                                <div className="h-8 w-8 rounded-lg bg-green-50" />
                                                <div className="h-8 w-8 rounded-lg bg-blue-50" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-gray-100 py-12">
                <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gray-900 flex items-center justify-center">
                            <BarChart3 className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-gray-900">DataInsight</span>
                    </div>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <Link href="#" className="hover:text-blue-600">Privacy Policy</Link>
                        <Link href="#" className="hover:text-blue-600">Terms of Service</Link>
                        <Link href="#" className="hover:text-blue-600">Security</Link>
                    </div>
                    <p className="text-sm text-gray-400">© 2026 DataInsight. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, desc, color, bg }: any) {
    return (
        <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-blue-200 hover:shadow-xl hover:-translate-y-1">
            <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${bg} ${color} transition-transform group-hover:scale-110`}>
                <Icon className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}
