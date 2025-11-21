"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, MOCK_ACCOUNTS } from '@/lib/auth-config';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check localStorage on mount
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (e) {
                console.error("Failed to parse stored user", e);
                localStorage.removeItem('auth_user');
            }
        }
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const account = MOCK_ACCOUNTS.find(
            acc => acc.username === username && acc.password === password
        );

        if (account) {
            // Cast role to Role type to satisfy TypeScript
            const userWithRole = { ...account.user, role: account.user.role as User['role'] };
            setUser(userWithRole);
            setIsAuthenticated(true);
            localStorage.setItem('auth_user', JSON.stringify(userWithRole));
            return true;
        }

        return false;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('auth_user');
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
