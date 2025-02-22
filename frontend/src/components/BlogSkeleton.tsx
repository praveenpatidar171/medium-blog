const BlogSkeleton = () => {
    return (
        <div role="status" className="max-w-6xl animate-pulse">
            <div className="max-w-6xl mx-auto ">
                <div className="flex space-x-2 items-center my-3">
                    <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                    <div className="flex space-x-2 items-center my-3">
                        <div className="h-2 w-8 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-600"></span>
                        <div className="h-2 w-8 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                    </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full w-5xl mb-3"></div>
                <div className="h-2 bg-gray-200 rounded-full w-5xl mb-3"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
            </div>
        </div>
    )
}

export default BlogSkeleton