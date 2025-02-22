import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react"
import { BLOG_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";

const useGetBlogs = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchAllBlogs = async () => {

            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const config: AxiosRequestConfig = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                const { data } = await axios.get(`${BLOG_API_END_POINT}/all/bulk`, config);
                setBlogs(data.blogs);

            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error);
                    toast.error(error?.response?.data?.message)
                }
            } finally {
                setLoading(false);
            }
        }

        fetchAllBlogs();

    }, [])

    return {
        loading,
        blogs
    }
}

export default useGetBlogs