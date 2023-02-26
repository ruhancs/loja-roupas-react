import { initializeApp } from 'firebase/app'; // yarn add firebase
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,

} from 'firebase/auth'
import { 
    getFirestore,
    doc,
    getDoc,//acessar os dados
    setDoc,//inserir dados
    collection,
    writeBatch,
    query,
    getDocs,
 } from 'firebase/firestore'


// No firebase clicar em <> e criar o web app apos criado copiar o script gerado igual ao abaixo 
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-0l3roCzANK9ggnFR03X1SaWeMDZPXbY",
    authDomain: "loja-roupas-db.firebaseapp.com",
    projectId: "loja-roupas-db",
    storageBucket: "loja-roupas-db.appspot.com",
    messagingSenderId: "924828150485",
    appId: "1:924828150485:web:ffb58f06d744509811505c"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// provider pode ser com facebook, twiter, github
const googleProvider = new GoogleAuthProvider()//para utilizar o google auth
googleProvider.setCustomParameters({
    prompt: "select_account"// para o usuario ter que escolher uma conta para interagir com app
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider)//sign in com google popup
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()//cria o db

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = collection(db, collectionKey) // pegar a coleçao que esta no db
    
    // adicionar doc a coleçao, batch permitira adicionar e deletar no db
    const batch = writeBatch(db)

    // criar o objeto no db com o title como key
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef,object)
    });

    await batch.commit()
    console.log('done')
}

// pegar a coleçao de produtos no db
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    // array com os documentos
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot) => {
        const { title,items } = docSnapshot.data()
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return categoryMap
}

export const creatUserDocFromAuth = async(userAuth, additionalInformation={}) => {
    if(!userAuth) return

    // id do user no googleAuth uid
    const userDocRef = doc(db, 'users', userAuth.uid )//referencia para verificar se o usuario ja existe no db

    const userSnapshot = await getDoc(userDocRef)// verificar se o user existe no db

    // se user data nao existe
    // inserir o usuario no db
    if(!userSnapshot.exists()){
        const { displayName,email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            })
        } catch (error){
            console.log(`error creating user ${error.message}`)
        }
    }

    //se o usuario existe
    // retorna  userDocRef
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return

    return await signInWithEmailAndPassword(auth, email, password)
}

// auth contem o usuario que esta logado
export const signOutUser =async () => await signOut(auth)

// callback sera chamada sempre quando o estado mudar
// sempre que o estado da authenticaçao mudar chama a callback
// utilizado em user.context
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback)






// ir no firebase selecionar authentication, depois selecionar sign in method e selecionar o google
// ativar e inserir o email e salvar
