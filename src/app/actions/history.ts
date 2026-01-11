// This file is now client-side compatible to ensure Firebase Auth context is available for Firestore operations.

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from "firebase/firestore";

export async function saveAnalysis(userId: string, fileName: string, insights: string, allData: Record<string, any[]>) {
    try {
        if (!userId) throw new Error("User ID is required");

        // We store the full data if it's small, otherwise just a sample and summary
        // For multi-sheet support, we store a sample (first 50 rows) of each sheet
        const dataPreview: Record<string, any[]> = {};
        let totalRows = 0;

        Object.entries(allData).forEach(([sheetName, sheetData]) => {
            dataPreview[sheetName] = sheetData.slice(0, 50);
            totalRows += sheetData.length;
        });

        const historyRef = collection(db, "analysis_history");
        await addDoc(historyRef, {
            userId,
            fileName,
            insights,
            dataPreview, // This is now a Record<string, any[]>
            totalRows,
            createdAt: serverTimestamp(),
            version: "2.0", // To distinguish from old array format
        });

        return { success: true };
    } catch (error: any) {
        console.error("Error saving analysis:", error);
        return { success: false, error: error.message };
    }
}

export async function getUserHistory(userId: string) {
    try {
        if (!userId) throw new Error("User ID is required");

        const historyRef = collection(db, "analysis_history");
        const q = query(
            historyRef,
            where("userId", "==", userId)
        );

        const querySnapshot = await getDocs(q);

        const history = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString(),
        }));

        return { success: true, history };
    } catch (error: any) {
        console.error("Error fetching history:", error);
        return { success: false, error: error.message };
    }
}
