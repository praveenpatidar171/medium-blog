import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { BLOG_API_END_POINT } from "../utils/constant";

interface Blog {
    id: string,
    content: string,
    title: string,
    autherId: string,
    published: boolean,
    auther: {
        name: string,
        email: string
    }
}

const useGetSingleBlog = (id: string) => {
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState<Blog>()

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const config: AxiosRequestConfig = {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
                const { data } = await axios.get(`${BLOG_API_END_POINT}/${id}`, config);
                setBlog(data?.blog)

            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error);
                    toast.error(error?.response?.data?.message)
                }
            } finally {
                setLoading(false);
            }
        }
        fetchBlog();
    }, [])

    return {
        loading,
        blog
    }
}

export default useGetSingleBlog