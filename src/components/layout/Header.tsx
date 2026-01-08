import { Bell, Search, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { auth, isFirebaseInitialized } from "@/lib/firebase";

export function Header() {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white/50 px-6 backdrop-blur-md shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <form className="relative flex flex-1" action="#" method="GET">
                    <label htmlFor="search-field" className="sr-only">
                        Search
                    </label>
                    <div className="relative w-full max-w-sm self-center">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            id="search-field"
                            className="block h-10 w-full rounded-full border-0 bg-gray-100 py-0 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:text-gray-200"
                            placeholder="Search..."
                            type="search"
                            name="search"
                        />
                    </div>
                </form>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                    >
                        <span className="sr-only">View notifications</span>
                        <Bell className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Separator */}
                    <div
                        className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                        aria-hidden="true"
                    />

                    {/* User Profile */}
                    <div className="relative flex items-center gap-x-4">
                        <div className="hidden lg:flex lg:flex-col lg:items-end">
                            <span className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                                {user?.email || "User"}
                            </span>
                        </div>
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg ring-2 ring-white cursor-pointer  dark:ring-zinc-900">
                            <span className="font-medium">{user?.email?.[0].toUpperCase() || "U"}</span>
                        </div>
                        <button
                            onClick={() => {
                                if (isFirebaseInitialized) {
                                    auth.signOut();
                                } else {
                                    console.warn("Auth not configured");
                                    // For demo purposes, maybe refresh page?
                                    window.location.reload();
                                }
                            }}
                            className="ml-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-zinc-800"
                            title="Sign out"
                        >
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
