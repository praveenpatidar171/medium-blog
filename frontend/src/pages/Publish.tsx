import { ChangeEvent, useState } from "react"
import Appbar from "../components/Appbar"
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import { BLOG_API_END_POINT } from "../utils/constant";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Publish = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handlePublish = async () => {

        try {
            setLoading(true)
            const token = localStorage.getItem('token');
            const config: AxiosRequestConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
            const sendData = {
                title,
                content
            }

            await axios.post(`${BLOG_API_END_POINT}`, sendData, config);
            toast.success('Blog Published Successfully!!')
            navigate('/')

        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data?.message);
            }
        }
        finally {
            setLoading(false);
        }

    }
    return (
        <div>
            <div>
                <Appbar />
            </div>
            <div className="max-w-5xl my-10 mx-auto flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium" htmlFor="title">Title</label>
                    <input
                        className="outline-none border-2 border-gray-200 rounded-sm focus:border-blue-500 p-2"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Enter Your Title" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium" htmlFor="content">Content</label>
                    <textarea
                        className="outline-none min-h-80 border-2 border-gray-200 rounded-sm focus:border-blue-500 p-2"
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                        placeholder="Enter Your Content here.." />
                </div>
                <button onClick={handlePublish} className={`p-2 ${loading ? 'w-40' : 'w-24'} text-sm font-medium rounded-lg border-2 hover:outline-solid hover:outline-sky-500 text-bold bg-blue-700 text-white cursor-pointer`} >{loading ? <span className="flex items-center justify-center" ><Loader2 className="h-4 w-4 animate-spin mr-2" /> Please wait..</span> : 'Publish'}</button>

            </div>

        </div>
    )
}

export default Publish