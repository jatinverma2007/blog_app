import BlogCard from '@/components/BlogCard';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const SearchList = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    const { blog } = useSelector(store => store.blog)

    console.log(blog);

    const filteredBlogs = (blog || []).filter(
        (item) =>
            item?.title?.toLowerCase()?.includes(query.toLowerCase()) ||
            item?.subtitle?.toLowerCase()?.includes(query.toLowerCase()) ||
            item?.category?.toLowerCase() === query.toLowerCase()
    );

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='pt-32 px-4'>
            <div className='max-w-6xl mx-auto'>
                <h2 className='mb-5 text-xl font-semibold'>Search Results for: "{query}"</h2>
                {filteredBlogs.length === 0 ? (
                    <p className='text-gray-500'>No blogs found matching your search.</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-7 my-10'>
                        {
                            filteredBlogs.map((blog) => {
                                return <BlogCard key={blog._id} blog={blog} />
                            })
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchList
