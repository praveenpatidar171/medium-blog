import Quotes from "../components/Quotes"
import SignupInner from "../components/SignupInner"

const SignUp = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <SignupInner />
            </div>
            <div className="hidden lg:block">
                <Quotes />
            </div>
        </div>
    )
}

export default SignUp