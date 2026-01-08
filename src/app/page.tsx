"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { UploadExcel } from "@/components/dashboard/UploadExcel";
import { DataPreview } from "@/components/dashboard/DataPreview";
import { DataVisualization } from "@/components/dashboard/DataVisualization";
import { AIInsights } from "@/components/dashboard/AIInsights";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-black font-sans">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                  <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
                </div>
                <UploadExcel compact={true} />
              </div>

              <DataVisualization />
              <AIInsights />
              <DataPreview />
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Stats cards would go here */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
