"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { Header } from "@/components/layout/Header";
import { UploadExcel } from "@/components/dashboard/UploadExcel";
import { DataPreview } from "@/components/dashboard/DataPreview";
import { DataVisualization } from "@/components/dashboard/DataVisualization";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { SheetSelector } from "@/components/dashboard/SheetSelector";
import DataChat from "@/components/dashboard/DataChat";
import { useData } from "@/context/DataContext";
import { LandingPage } from "@/components/layout/LandingPage";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { DashboardWelcome } from "@/components/dashboard/DashboardWelcome";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { data } = useData();

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="relative flex h-screen overflow-hidden bg-white dark:bg-black font-sans">
      <Sidebar />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="animated-gradient absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />

        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="relative z-10 flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">Chào mừng bạn trở lại! Hãy bắt đầu khám phá dữ liệu của bạn.</p>
              </div>
              <UploadExcel compact={true} />
            </div>

            {data && data.length > 0 ? (
              <>
                <SheetSelector />
                <DataVisualization />
                <AIInsights />
                <DataPreview />
                <DataChat />
              </>
            ) : (
              <DashboardWelcome />
            )}

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Stats cards would go here */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
