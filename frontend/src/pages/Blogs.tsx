import { useEffect } from "react"
import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import BlogSkeleton from "../components/BlogSkeleton"
import useGetBlogs from "../hooks/useGetBlogs"
import { useNavigate } from "react-router-dom"

const Blogs = () => {

    const navigate = useNavigate();

    interface Blog {
        auther: {
            name: string,
            email: string
        },
        title: string,
        content: string,
        id: string,
        published: boolean
    }

    const { blogs, loading } = useGetBlogs();
    console.log(blogs)
    console.log(loading);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signup')
        }
    })
    return (
        <div>
            <div>
                <Appbar />
            </div>
            <div className="flex items-center justify-center">

                {!loading && <div>{blogs?.map((blog: Blog) =>
                    <BlogCard
                        autherName={blog.auther.name}
                        title={blog.title}
                        content={blog.content}
                        publishedDate='Des 13, 2025'
                        key={blog.id}
                        id={blog.id}
                    />
                )} </div>
                }


                {
                    loading && <div className="max-w-7xl mx-auto">
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                }
            </div>
        </div>
    )
}

export default Blogs