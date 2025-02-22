import { useNavigate } from "react-router-dom"

interface BlogProps {
    autherName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string
}

const BlogCard = ({
    id,
    autherName,
    title,
    content,
    publishedDate,
}: BlogProps) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/blog/${id}`)
    }
    return (
        <div onClick={handleClick} className="max-w-3xl mx-auto ">
            <div className="flex space-x-2 items-center my-3">
                <Avatar name="praveen" />
                <div className="flex space-x-2 items-center my-3">
                    <span className="text-xl font-semibold ">{autherName}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-600"></span>
                    <span className="text-xl text-gray-400 font-semibold ">{publishedDate}</span>
                </div>
            </div>
            <div className="text-3xl font-bold mb-3">
                {title}
            </div>
            <div className="text-xl font-normal mb-3">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-sm text-gray-400 font-semibold mb-3">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
            <div className="w-full border-b-2 border-gray-300">

            </div>
        </div>
    )
}

export default BlogCard



export interface AvatarProps {
    name: string
}
export const Avatar = ({ name }: AvatarProps) => {
    return <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600" >
        <span className="font-medium text-xl text-gray-600 dark:text-gray-300">{name[0].toUpperCase()}</span>
    </div >
}