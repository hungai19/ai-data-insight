"use client";

import React, { createContext, useContext, useState } from "react";

interface DataContextType {
    data: any[];
    allData: Record<string, any[]>;
    sheetNames: string[];
    activeSheet: string | null;
    fileName: string | null;
    insights: string | null;
    setParsedData: (allData: Record<string, any[]>, sheetNames: string[], fileName: string) => void;
    setActiveSheet: (sheetName: string) => void;
    setInsights: (insights: string | null) => void;
    clearData: () => void;
}

const DataContext = createContext<DataContextType>({
    data: [],
    allData: {},
    sheetNames: [],
    activeSheet: null,
    fileName: null,
    insights: null,
    setParsedData: () => { },
    setActiveSheet: () => { },
    setInsights: () => { },
    clearData: () => { },
});

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [allData, setAllData] = useState<Record<string, any[]>>({});
    const [sheetNames, setSheetNames] = useState<string[]>([]);
    const [activeSheet, setActiveSheetState] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [insights, setInsightsState] = useState<string | null>(null);

    const data = activeSheet ? allData[activeSheet] || [] : [];

    const setParsedData = (newAllData: Record<string, any[]>, names: string[], name: string) => {
        setAllData(newAllData);
        setSheetNames(names);
        setActiveSheetState(names[0] || null);
        setFileName(name);
        setInsightsState(null);
    };

    const setActiveSheet = (sheetName: string) => {
        setActiveSheetState(sheetName);
        setInsightsState(null); // Clear insights when switching sheets as they might not apply
    };

    const setInsights = (text: string | null) => {
        setInsightsState(text);
    };

    const clearData = () => {
        setAllData({});
        setSheetNames([]);
        setActiveSheetState(null);
        setFileName(null);
        setInsightsState(null);
    };

    return (
        <DataContext.Provider value={{
            data, allData, sheetNames, activeSheet, fileName, insights,
            setParsedData, setActiveSheet, setInsights, clearData
        }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);
