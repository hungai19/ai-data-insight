"use client";

import Link from "next/link";
import { MiniSignupForm } from "@/components/auth/MiniSignupForm";
import { BarChart3 } from "lucide-react";

export default function SignupPage() {
    return (
        <div className="relative min-h-screen bg-white font-sans">
            {/* Simple Header */}
            <header className="absolute top-0 z-50 w-full bg-transparent px-6 py-8">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-200 transition-transform group-hover:scale-105">
                            <BarChart3 className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900 lg:text-2xl">Data<span className="text-indigo-600">Insight</span></span>
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 pt-32 pb-20">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
                    <div className="space-y-8 animate-in-slide-up">
                        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                            Bắt đầu <br />
                            <span className="text-blue-600">khám phá ngay!</span>
                        </h1>
                        <p className="max-w-md text-lg text-gray-600 leading-relaxed">
                            Tham gia cùng hàng ngàn người dùng đang tối ưu hóa quy trình làm việc của họ với sức mạnh từ dữ liệu và AI.
                        </p>

                        <div className="pt-10 flex gap-4 opacity-50">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-gray-100" />
                                ))}
                            </div>
                            <div className="text-sm font-medium text-gray-500 self-center">
                                +500 người dùng mới tuần này
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end animate-in-fade">
                        <MiniSignupForm />
                    </div>
                </div>
            </main>

            {/* Background elements */}
            <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-blue-50/50 blur-[100px]" />
            <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-50/30 blur-[100px]" />
        </div>
    );
}
