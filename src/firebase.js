import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCUndICAUxUT3n_Q19F05BazSpLOkr2d1c',
    authDomain: 'chat-e7246.firebaseapp.com',
    projectId: 'chat-e7246',
    storageBucket: 'chat-e7246.appspot.com',
    messagingSenderId: '28357679434',
    appId: '1:28357679434:web:58376c850f47e39fb689b3',
    measurementId: 'G-VE6BZN6595',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
