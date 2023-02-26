import SignupForm from "../../sign-up-form/sign-up-form.component"
import SignInForm from "../../sign-in-form/sign-in-form.component"

import './authentication.styles.scss'


const Authentication = () => {
    // useEffect(async () => {
    //     const response = await getRedirectResult(auth)//authenticaçao redirecionando para o google auth
    //     if(response){
    //         const userDocRef = await creatUserDocFromAuth(response.user)
    //     }
    // },[])
    return (
        <div className="authentication-container">
            <SignInForm />
            {/* <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button> */}
            <SignupForm />
        </div>
    )
}

export default Authentication