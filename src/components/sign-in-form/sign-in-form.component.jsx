import { useState, useContext } from "react"
import './sign-in-form.styles.scss'
import FormInput from "../form-input/form-input.component"
import Button,{ BUTTON_TYPES_CLASSES } from "../button/button.component"
import {
    signInWithGooglePopup, 
    creatUserDocFromAuth,
    signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.util"
import { UserContext } from "../../contexts/user.context" // para utilzar o currentUser e setCurrentUser em user.context.jsx

const defaultFormFields = {
    email:'',
    password:'',
}

const SignInForm = () => {
    const [ formFields,setFormFields ] = useState(defaultFormFields)
    const { email,password } = formFields

// nao é necessario usando o onAuthStateChangedListener criado no firebase.util
    // const { setCurrentUser } = useContext(UserContext)

    const resetFormFild = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup()// authenticaçao com google popup //const { user } = 
// nao é necessario usando o onAuthStateChangedListener criado no firebase.util
        // await creatUserDocFromAuth(user)//recebe o usuario do google auth para inserir no db
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email,password)
// nao é necessario usando o onAuthStateChangedListener criado no firebase.util
            // setCurrentUser(user)//para usar o user em outras rotas 
            resetFormFild()
        } catch(error){
            if(error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'){
                alert('incorrect email or password')
                return
            }
            console.log(error)
        }
    }

    const handleChange = (event) => {
        const { name,value } = event.target    
        setFormFields({...formFields, [name]:value})
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label= 'Email'
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                />

                <FormInput
                    label='Password' 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                />
                <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm