import Quotes from "../components/Quotes"
import SignInInner from "../components/SignInInner"

const SignIn = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <SignInInner />
            </div>
            <div className="hidden lg:block">
                <Quotes />
            </div>
        </div>
    )
}

export default SignIn