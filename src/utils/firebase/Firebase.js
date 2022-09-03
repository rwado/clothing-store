import { initializeApp, } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDqmAifvImUJqHtfhsJAXij2vTnjsiUV6Q",
  authDomain: "clothing-db-98767.firebaseapp.com",
  projectId: "clothing-db-98767",
  storageBucket: "clothing-db-98767.appspot.com",
  messagingSenderId: "478833426585",
  appId: "1:478833426585:web:530b108eb036b5500ff808"
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
})

/** Auth **/
export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithGoogleRedirect(auth, googleProvider);

/** DataBase **/
export const db = getFirestore()

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (e) {
      console.error("Error creating the user: " + e);
    }
  }
}

export const createAuthUserWithEmailandPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = () => signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)