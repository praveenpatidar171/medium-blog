import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { USER_API_END_POINT } from "../utils/constant"
import { Loader2 } from "lucide-react"

interface SignInSendData {
    email: string,
    password: string
}

const SignInInner = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input, [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async () => {

        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const sendData: SignInSendData = {
                email: input.email,
                password: input.password
            }

            const { data } = await axios.post(`${USER_API_END_POINT}/signin`, sendData, config);
            localStorage.setItem('token', data.token);
            navigate('/blogs');

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="w-96 rounded-lg border border-gray-200 shadow-2xl p-8">
                <div className="text-center">
                    <h1 className="font-bold text-3xl mb-2">Sign In & Continue</h1>
                    <h2 className="text-sm font-semibold text-gray-400">Don't have an account? <Link className="underline" to={'/signup'}>Signup</Link></h2>
                </div>
                <div className="flex flex-col gap-4 my-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium" htmlFor="email">Email</label>
                        <input
                            onChange={changeEventHandler}
                            className="outline-none border-2 border-gray-200 rounded-sm focus:border-blue-500 p-2"
                            type="email"
                            name="email"
                            placeholder="Enter Your Email" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium" htmlFor="name">Password</label>
                        <input
                            onChange={changeEventHandler}
                            className="outline-none border-2 border-gray-200 rounded-sm focus:border-blue-500 p-2"
                            type="password"
                            name="password"
                            placeholder="Enter Your Password" />
                    </div>
                </div>
                <button onClick={handleSubmit} className="p-2 w-full rounded-md text-bold bg-black text-white cursor-pointer">{loading ? <span className="flex justify-center items-center"><Loader2 className="h-4 w-4 animate-spin mr-2" /> Please wait..</span> : 'SignIn'}</button>
            </div>
        </div>
    )
}

export default SignInInner