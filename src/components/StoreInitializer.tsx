"use client";

import { useEffect } from "react";
import { useProjectStore } from "@/store/useProjectStore";

export function StoreInitializer() {
    const { fetchInitialData } = useProjectStore();

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    return null;
}
