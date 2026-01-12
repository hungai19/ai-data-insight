"use client";

import Link from "next/link";
import { MiniLoginForm } from "@/components/auth/MiniLoginForm";
import { BarChart3 } from "lucide-react";

export default function LoginPage() {
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
                            Chào mừng <br />
                            <span className="text-blue-600">trở lại!</span>
                        </h1>
                        <p className="max-w-md text-lg text-gray-600 leading-relaxed">
                            Đăng nhập để tiếp tục khám phá những hiểu biết ẩn sâu trong dữ liệu của bạn với công nghệ AI tiên tiến.
                        </p>

                        <div className="pt-10 flex gap-10 opacity-30">
                            <div className="h-12 w-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                                <BarChart3 className="h-6 w-6" />
                            </div>
                            <div className="h-12 w-32 rounded-full border-2 border-dashed border-gray-300" />
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end animate-in-fade">
                        <MiniLoginForm />
                    </div>
                </div>
            </main>

            {/* Background elements */}
            <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-blue-50/50 blur-[100px]" />
            <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-50/30 blur-[100px]" />
        </div>
    );
}
