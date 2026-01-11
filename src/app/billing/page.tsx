"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { Header } from "@/components/layout/Header";

export default function BillingPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <ProtectedRoute>
            <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-black font-sans">
                <Sidebar />
                <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
                <div className="flex flex-1 flex-col overflow-hidden">
                    <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                    <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing & Subscription</h1>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Manage your subscription plan.</p>

                            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                                <p className="text-center text-gray-500">Billing details coming soon.</p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
