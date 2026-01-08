import Link from "next/link";
import { LayoutDashboard, History, CreditCard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, current: true },
  { name: "History", href: "/history", icon: History, current: false },
  { name: "Billing", href: "/billing", icon: CreditCard, current: false },
];

export function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-zinc-950 text-white">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold tracking-tight text-blue-500">
          Data<span className="text-white">Insight</span>
        </h1>
      </div>
      <div className="flex flex-1 flex-col gap-y-4 px-3 py-4">
        <nav className="flex flex-1 flex-col gap-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                item.current
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold transition-all duration-200"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {item.name}
            </Link>
          ))}
          <div className="mt-auto">
             <Link
              href="/settings"
              className="text-zinc-400 hover:bg-zinc-800 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm font-semibold transition-all duration-200"
            >
              <Settings className="h-5 w-5 shrink-0" aria-hidden="true" />
              Settings
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
