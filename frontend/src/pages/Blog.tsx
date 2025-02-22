import { useParams } from "react-router-dom";
import useGetSingleBlog from "../hooks/useGetSingleBlog"
import Appbar from "../components/Appbar";
import { Avatar } from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";

const Blog = () => {
  const params = useParams();

  const id = params.id;

  const { loading, blog } = useGetSingleBlog(id as string);
  return (
    <div>
      {
        !loading && <div className=" flex flex-col gap-6">
          <div>
            <Appbar />
          </div>
          <div className="grid grid-cols-12 w-full max-w-7xl mx-auto">
            <div className="col-span-8 px-6">
              <div className="text-5xl font-extrabold">
                {blog?.title}
              </div>
              <h1 className="text-gray-500 font-medium my-3">Posted On August 24, 2023</h1>
              <p className="">
                {blog?.content}
              </p>
            </div>
            <div className="col-span-4 px-6">
              <h1 className="font-medium">Author</h1>
              <div className="flex items-center gap-3">
                <div>
                  <Avatar name={blog?.auther?.name || "User"} />
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="text-3xl font-bold">{blog?.auther?.name}</h1>
                  <div className="text-gray-500 font-medium">Something about auther like may be funny to attract the audience to read the blog.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      }
      {loading && <div className="max-w-7xl p-32 mx-auto text-center text-3xl text-red-700"><BlogSkeleton /></div>}
    </div>
  )
}

export default Blog