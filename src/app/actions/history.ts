"use server";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from "firebase/firestore";

export async function saveAnalysis(userId: string, fileName: string, insights: string, data: any[]) {
    try {
        if (!userId) throw new Error("User ID is required");

        // We store the full data if it's small, otherwise just a sample and summary
        // For now, let's store a sample (first 50 rows) to keep doc size low
        const sampleData = data.slice(0, 50);

        const historyRef = collection(db, "analysis_history");
        await addDoc(historyRef, {
            userId,
            fileName,
            insights,
            dataPreview: sampleData,
            totalRows: data.length,
            createdAt: serverTimestamp(),
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
            where("userId", "==", userId),
            orderBy("createdAt", "desc")
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
