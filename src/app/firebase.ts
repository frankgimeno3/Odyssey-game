import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const missing = Object.entries(firebaseConfig).filter(([, value]) => !value?.trim()).map(([key]) => key);
if (missing.length) {
  console.error('[Odyssey][Firebase][configuration]', {
    missing,
    action: 'Configure REACT_APP_* in Vercel and redeploy. See .env.example.',
  });
  throw new Error(`[Odyssey] Missing Firebase configuration: ${missing.join(', ')}. Use REACT_APP_* and rebuild.`);
}

export function logFirestore(operation: string, details: Record<string, unknown> = {}) {
  console.info(`[Odyssey][Firestore][${operation}]`, {
    projectId: firebaseConfig.projectId, collection: 'documents',
    route: typeof window === 'undefined' ? 'server' : window.location.pathname,
    online: typeof navigator === 'undefined' ? undefined : navigator.onLine,
    ...details,
  });
}

export function logFirestoreError(operation: string, error: unknown) {
  const failure = error as { code?: string; message?: string } | null;
  console.error(`[Odyssey][Firestore][${operation}]`, {
    code: failure?.code ?? 'unknown', message: failure?.message ?? String(error),
    projectId: firebaseConfig.projectId, collection: 'documents',
    route: typeof window === 'undefined' ? 'server' : window.location.pathname,
    online: typeof navigator === 'undefined' ? undefined : navigator.onLine,
    action: 'Check Firebase project, Firestore rules and Network request URL/status. A resource 404 alone does not identify a Firestore error.',
  });
}

if (typeof window !== 'undefined') logFirestore('configured');
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
