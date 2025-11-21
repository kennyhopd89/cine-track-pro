"use client";

import { useAuth } from "@/context/auth-context";
import { LoginScreen } from "./login-screen";
import { Sidebar } from "@/components/layout/Sidebar";
import { StoreInitializer } from "@/components/StoreInitializer";

export function AuthLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <LoginScreen />;
    }

    return (
        <>
            <StoreInitializer />
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Global Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/5 via-transparent to-purple-900/5 pointer-events-none z-0" />
                <div className="relative z-10 h-full flex flex-col">
                    {children}
                </div>
            </main>
        </>
    );
}
