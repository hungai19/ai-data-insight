import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let auth: ReturnType<typeof getAuth>;
let db: ReturnType<typeof getFirestore>;

if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    auth = getAuth(app);
    db = getFirestore(app);
} else {
    // Prevent crash during build/dev if keys are missing
    console.warn("Firebase keys are missing. Auth and DB will not work.");
    // Cast to any to satisfy TS for now, or handle null check in components
    auth = {} as any;
    db = {} as any;
}


export const isFirebaseInitialized = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
