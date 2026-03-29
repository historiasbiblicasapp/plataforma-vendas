import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIi_OWRqTqWoQprRvZKeit2UBneb26R-o",
  authDomain: "compras-e1326.firebaseapp.com",
  projectId: "compras-e1326",
  storageBucket: "compras-e1326.firebasestorage.app",
  messagingSenderId: "649230850488",
  appId: "1:649230850488:web:54f6488b29dc2acfbe974d",
  measurementId: "G-NHFHRZEX7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
// Ensure analytics only runs on the client-side
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

const db = getFirestore(app);

export { app, analytics, db };
