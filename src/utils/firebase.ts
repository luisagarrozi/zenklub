import { initializeApp } from "firebase/app";
import { keys } from './keys';

// keys file is in gitignore to protect data
const firebaseConfig = {
  apiKey: keys.apiKey,
  authDomain: keys.authDomain,
  projectId: keys.projectId,
  storageBucket: keys.storageBucket,
  messagingSenderId: keys.messagingSenderId,
  appId: keys.appId,
};

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };