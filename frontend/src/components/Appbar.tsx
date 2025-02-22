import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"

const Appbar = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-7xl mx-auto flex items-center justify-between py-5">
            <Link to={'/'} >
                <div className="text-2xl font-bold text-amber-300">Medium</div>
            </Link>
            <div className="flex items-center">
                <button onClick={() => navigate('/publish')} className="p-2 w-14 text-xs rounded-2xl border-2 hover:outline-solid hover:outline-green-300 text-bold bg-green-800 text-white cursor-pointer mr-4" >New</button>
                <div>
                    <Avatar name="Praveen" />
                </div>
            </div>
        </div>
    )
}

export default Appbar