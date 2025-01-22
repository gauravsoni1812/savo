/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Navbar from './Navbar';
import home from '../assets/home.png';
import location from "../assets/location.png"
import searchIcon from "../assets/search.png"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Card from './Card';

const List = () => {
    const [search, setSearch] = useState(true);
    const [name, setName] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const itemsPerPage = 5; // Number of products per page
    const queryClient = useQueryClient();

    // Fetch function to get products with pagination
    const fetchProducts = async () => {
        // const [{currentPage }] = queryKey;
        const response = await fetch(
            `http://localhost:3005/api/v1?name=${name}&page=${currentPage}&limit=${itemsPerPage}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return response.json();
    };

    // Delete function to delete a single product
    const deleteProduct = async (productId) => {
        const response = await fetch(`http://localhost:3005/api/v1/${productId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
        return response.json();
    };

    // React Query: Fetch products
    const { data, error, isLoading } = useQuery({
        queryKey: ['products', { search, currentPage }], // Updated queryKey
        queryFn: fetchProducts,
        keepPreviousData: true, // Keeps the old data until the new data is loaded
    });

    // React Query: Delete mutation
    const deleteMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
        onError: (error) => {
            console.error('Failed to delete product:', error.message);
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const products = data?.products || [];
    const totalPages = data?.totalPages || 1;

    const handleSearch = () => {
        setSearch(!search);
        setCurrentPage(1); // Reset to the first page on search
    };

    const handleDelete = (productId) => {
        deleteMutation.mutate(productId);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Update current page state
    };

    return (
        <div>
            <Navbar />
            <div className='w-full'>
                <div className='h-[308px] relative'>
                    <img src={home} alt='home' className='h-full w-full' />
                    <div className='flex justify-center items-center'>
                        <div className='flex gap-7 p-10 px-14 backdrop-blur-md bg-white/30 absolute'>
                            <div>
                                <div className="relative">
                                    <img
                                        src={searchIcon}
                                        alt="search"
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                                    />
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="I am looking for..."
                                        id="name"
                                        type="text"
                                        className="w-[500px] p-3 pl-10 border-[1px] border-[#C2D1F0] rounded-md"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="relative">
                                    <img
                                        src={location}
                                        alt="location"
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                                    />
                                    <input
                                        placeholder="Location"
                                        id="location"
                                        type="text"
                                        className="w-[500px] p-3 pl-10 border-[1px] border-[#C2D1F0] rounded-md"
                                    />
                                </div>
                            </div>

                            <button onClick={handleSearch} className='bg-green-600 py-2 px-4 rounded-lg text-white'>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-[60%] mx-auto mt-20'>
                <div className='w-full flex flex-wrap gap-6'>
                    {products.map((product) => (
                        <div key={product._id} className='relative'>
                            <Card product={product} />
                            <button
                                onClick={() => handleDelete(product._id)}
                                className='absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-md'
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

                <div className='flex gap-5 justify-around items-center'>
                    <div className='text-center mt-6 text-gray-600'>
                        Showing {products.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{' '}
                        {products.length > 0
                            ? Math.min(currentPage * itemsPerPage, data.totalProducts || 0)
                            : 0}{' '}
                        of {data.totalProducts || 0} results
                    </div>


                    {/* Pagination Controls */}
                    <div className='flex justify-center items-center my-10'>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className='px-4 py-2 mx-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50'
                            disabled={currentPage === 1}
                        >
                            &larr;
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`px-4 py-2 mx-1 rounded-md ${pageNumber === currentPage
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 text-gray-700'
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className='px-4 py-2 mx-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50'
                            disabled={currentPage === totalPages}
                        >
                            &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
