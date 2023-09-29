import { initializeApp } from "firebase/app";
import { useEffect, useState } from 'react'
import { getAuth, signInWithPopup, GithubAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNhDgqQFztZXtGE10xeN8Jygi-tcVbFPE",
  authDomain: "sql-online-1b0a0.firebaseapp.com",
  projectId: "sql-online-1b0a0",
  storageBucket: "sql-online-1b0a0.appspot.com",
  messagingSenderId: "62041363466",
  appId: "1:62041363466:web:9d814b079d0709368bfbf3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app)

// Github's provider
const provider = new GithubAuthProvider()

// sign up with email and password
export function singUp (email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}

// log in with email and password
export function loginWithEmail (email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

// log out
export function logOut () {
  return signOut(auth)
}

// Custom Hook for onAuthStateChanged
export function useAuth () {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
    return unsub
  }, [])
  return currentUser
}

// Login with GitHub
export const loginWithGitHub = () => {
  return signInWithPopup(auth, provider)
  // const {photoUrl, screenName, email} = userInfo.user.reloadUserInfo;
  // return {
  //  avatar: photoUrl,
  //  userName: screenName,
  //  email: email
  // }
}
// an insert to database
export const saveQuery = ({ title, description, query }) => {
  return addDoc(collection(db, 'queryList'), {
    title,
    description,
    query
  })
}

//Custom Hook for getDocs from the database
// export function useQueryList () {
//   const [queryList, setQueryList] = useState([])

//   useEffect(() => {
//     getDocs(collection(db, 'queryList'))
//       .then(snapshot => {
//         const lists = snapshot.docs.map((doc) => ({
//           ...doc.data()
//         }))
//         setQueryList(lists)
//       })
//   }, [])

//   return queryList
// }

//getDocs from the database
export function getQueryList () {
  return getDocs(collection(db, 'queryList'));
}

//delete Doc from the database
export function deleteDocById (id) {
  return deleteDoc(doc(db, 'queryList', id))
}

//update Doc from the database
export function updateDocById (id, item) {
  return updateDoc(doc(db, 'queryList', id), item)
}