/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Navbar from './Navbar';
import home from '../assets/home.png';

import { useQuery } from '@tanstack/react-query'; // Ensure you are importing useQuery
import Card from './Card';

// Fetch function to get products from your API
const fetchProducts = async () => {
    const response = await fetch('http://localhost:3005/api/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json(); // Assuming the response is JSON
};

const List = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['products'], // This is the query key
        queryFn: fetchProducts,  // This is the function to fetch data
    });

    // Check if the response contains data and products
    if (isLoading) {
        return <div>Loading...</div>; // Display loading state
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Display error if fetching fails
    }

    const { currentPage, totalPages, products } = data || {};

    // Handle pagination and slice the products accordingly
    const productsPerPage = 6;
    const currentProducts = Array.isArray(products) ? products : [];

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            // For now, we don't change the state, but if needed, you can adjust currentPage here
        }
    };

    return (
        <div>
            <Navbar />
            <div className='w-full'>
                <div className='h-[308px] relative'>
                    <img src={home} alt='home' className='h-full w-full' />
                    <div className='flex justify-center items-center'>
                        <div className='flex gap-7 p-10 backdrop-blur-md bg-white/30 absolute'>
                            <div>
                                <input
                                    placeholder='I am looking for...'
                                    id='name'
                                    type='text'
                                    className='w-full p-3 border-[1px] border-[#C2D1F0] rounded-md'
                                />
                            </div>

                            <div>
                                <input
                                    placeholder='Location'
                                    id='location'
                                    type='text'
                                    className='w-full p-3 border-[1px] border-[#C2D1F0] rounded-md'
                                />
                            </div>

                            <button className='bg-green-600 py-2 px-4 rounded-lg'>Search</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-[60%] mx-auto mt-20'>
                <div className='w-full flex flex-wrap gap-6'>
                    {currentProducts.map((product) => (
                        <Card key={product._id} product={product} />
                    ))}
                </div>

                {/* Results Count */}
                <div className='text-center mt-6 text-gray-600'>
                    Showing {(currentPage - 1) * productsPerPage + 1} - {Math.min(currentPage * productsPerPage, products.length)} of {products.length} results
                </div>

                {/* Pagination Controls */}
                <div className='flex justify-center items-center mt-10'>
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
                            className={`px-4 py-2 mx-1 rounded-md ${pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
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
    );
};

export default List;
