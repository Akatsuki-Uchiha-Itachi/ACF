import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, getDoc, doc, query, where, getDocs } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD1pGZdsO4AAEeGqKbmIGB68po4fRU2D0s",
    authDomain: "acf-project-8f85b.firebaseapp.com",
    projectId: "acf-project-8f85b",
    storageBucket: "acf-project-8f85b.appspot.com",
    messagingSenderId: "239665804855",
    appId: "1:239665804855:web:26b844ed3380ff804a31b2"
};

export const mdata = {
    imgurl: null,
    character_name: [""],
    feat: "",
    description: "",
    anime_name: "",
    powers: [""],
    stand_level: 0
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const db = getFirestore(app);
const animeCollection = collection(db, 'anime');
export const setDocInFirestore = async (data) => {

    await setDoc(doc(animeCollection, formatString(data.character_name)), data);
}

export const fetchData = async (searchString) => {
    const querySnapshot = await getDocs(
        query(
            animeCollection,
            where('character_name', 'array-contains' , searchString.trim().replace(/\w\s*/g,(w) => (w.replace(/^\w/,(c) => c.toUpperCase()))))
        ))
    if (!querySnapshot.empty) {
        const results = [];
        querySnapshot.forEach((doc) => {
            const characterName =  doc.data().character_name;
            console.log(characterName);
            results.push({ id: doc.id, ...doc.data() });
        });
        console.log(results);
        if (results.length === 1) {
            console.log(results);
            return results[0];
        }
        else {
            return mdata;
        }
    } else {
        console.log('Not found');
        return mdata;
    }

};


{/*const fetchData = async (document_name) => {
    const myCollection = collection(db, "anime");
    const docRef = doc(myCollection, document_name);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      return docSnap.data();
    } else {
      console.log("Not Found!");
      return mdata;
    }
  };*/}

export const formatString = (str) => {
    const words = str.toLowerCase().split(' ');
    const formattedWords = words.map(word => {
        const alphanumeric = word.replace(/[^0-9a-zA-Z]/g, '');
        const firstChar = alphanumeric.charAt(0).toUpperCase();
        const rest = alphanumeric.slice(1);
        return `${firstChar}${rest}`;
    });
    const formattedString = formattedWords.join('_');
    const trimmedString = formattedString.replace(/[\s_]+$/, '');
    return trimmedString;
};