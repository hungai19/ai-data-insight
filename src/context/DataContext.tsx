"use client";

import React, { createContext, useContext, useState } from "react";

interface DataContextType {
    data: any[];
    fileName: string | null;
    insights: string | null;
    setParsedData: (data: any[], fileName: string) => void;
    setInsights: (insights: string | null) => void;
    clearData: () => void;
}

const DataContext = createContext<DataContextType>({
    data: [],
    fileName: null,
    insights: null,
    setParsedData: () => { },
    setInsights: () => { },
    clearData: () => { },
});

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<any[]>([]);
    const [fileName, setFileName] = useState<string | null>(null);
    const [insights, setInsightsState] = useState<string | null>(null);

    const setParsedData = (newData: any[], name: string) => {
        setData(newData);
        setFileName(name);
        setInsightsState(null);
    };

    const setInsights = (text: string | null) => {
        setInsightsState(text);
    };

    const clearData = () => {
        setData([]);
        setFileName(null);
        setInsightsState(null);
    };

    return (
        <DataContext.Provider value={{ data, fileName, insights, setParsedData, setInsights, clearData }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);
