/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Navbar from './Navbar';
import { FaPlus } from 'react-icons/fa';

// Function to handle the API call
const postAd = async (adData) => {
    const response = await fetch('http://localhost:3005/api/v1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(adData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to post ad');
    }

    return response.json();
};

const Post = () => {
    const [formData, setFormData] = useState({
        adname: '',
        category: 'volvo',
        description: '',
        price: '',
        imageUrl: '',
    });

    const { mutate, isLoading, isError, error, isSuccess } = useMutation({
        mutationFn: postAd, // Function to handle the API call
        onSuccess: () => {
            setFormData({
                adname: '',
                category: 'volvo',
                description: '',
                price: '',
                imageUrl: '',
            });
        },
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure price is a number
        const dataToSend = {
            ...formData,
            price: parseFloat(formData.price), // Convert price to a number
        };

        mutate(dataToSend);
    };

    const categories = ['Phones', 'Laptops', 'Cars', 'Bikes'];


    return (
        <div>
            <Navbar />
            <div className="h-full w-full bg-[#F8FAFD] flex justify-center items-center">
                <div className="h-full w-[80%] mt-10">
                    <h1 className="mb-12 text-[36px] font-semibold">Post your Ad</h1>
                    {isSuccess && (
                        <div className="bg-green-100 p-3 mb-5 rounded-md text-green-700">
                            Ad posted successfully!
                        </div>
                    )}
                    {isError && (
                        <div className="bg-red-100 p-3 mb-5 rounded-md text-red-700">
                            Error: {error.message}
                        </div>
                    )}

                    <form className="bg-white" onSubmit={handleSubmit}>
                        <div className="p-12 flex flex-col gap-5">
                            <p className="font-semibold text-[24px] leading-[36px]">General info</p>

                            <div>
                                <label htmlFor="adname">Ad name</label>
                                <input
                                    id="adname"
                                    type="text"
                                    value={formData.adname}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border-[1px] border-[#C2D1F0] rounded-md"
                                />
                            </div>

                            <div className="flex gap-10">
                                <div>
                                    <label htmlFor="category">Category</label>
                                    <select
                                        id="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border-[1px] border-[#C2D1F0] rounded-md"
                                    >
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="price">Price</label>
                                    <input
                                        id="price"
                                        type="text"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border-[1px] border-[#C2D1F0] rounded-md"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="imageUrl">Image URL</label>
                                <input
                                    id="imageUrl"
                                    type="text"
                                    value={formData.imageUrl}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border-[1px] border-[#C2D1F0] rounded-md"
                                />
                            </div>
                        </div>

                        {/* Submit button container */}
                        <div className="flex justify-end p-12">
                            <button
                                type="submit"
                                className={`flex items-center gap-2 text-white bg-green-600 px-6 py-3 rounded-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Posting...' : 'Post your ad'}
                                <span>
                                    <FaPlus />
                                </span>
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Post;
