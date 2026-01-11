"use client";

import Link from "next/link";
import { LayoutDashboard, History, CreditCard, Settings, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
    const pathname = usePathname();

    const navigation = [
        { name: "Dashboard", href: "/", icon: LayoutDashboard, current: pathname === "/" },
        { name: "History", href: "/history", icon: History, current: pathname === "/history" },
        { name: "Billing", href: "/billing", icon: CreditCard, current: pathname === "/billing" },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-zinc-950 text-white shadow-2xl transition-transform">
                <div className="flex h-16 items-center justify-between px-6">
                    <h1 className="text-xl font-bold tracking-tight text-blue-500">
                        Data<span className="text-white">Insight</span>
                    </h1>
                    <button
                        onClick={onClose}
                        className="rounded-md p-1 text-zinc-400 hover:text-white"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex flex-1 flex-col gap-y-4 px-3 py-4">
                    <nav className="flex flex-1 flex-col gap-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    item.current
                                        ? "bg-zinc-800 text-white"
                                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                                )}
                            >
                                <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                                {item.name}
                            </Link>
                        ))}

                        <div className="mt-auto">
                            <Link
                                href="/settings"
                                onClick={onClose}
                                className={cn(
                                    pathname === "/settings" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                                )}
                            >
                                <Settings className="h-5 w-5 shrink-0" aria-hidden="true" />
                                Settings
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}

