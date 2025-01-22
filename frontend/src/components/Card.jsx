/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import eye from "../assets/eye.png";
import blue from "../assets/blue.png";
import heart from "../assets/heart.png";

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

const Card = ({ product }) => {
    const relativeTime = dayjs(product.createdAt).fromNow();

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg w-[302px]">
            <img
                className="w-full h-[184px]"
                src={product.imageUrl || "https://static.toiimg.com/thumb/msid-95585388,width-400,resizemode-4/95585388.jpg"}
                alt="Product"
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.adname} {product.category}</div>
                <p className="text-gray-700 text-base">New york ,NY ,USA</p>
                <div className="font-bold text-xl mb-2">${product.price}</div>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                <div className="flex gap-2">
                    <img src={eye} alt="view" />
                    <img src={blue} alt="blue" />
                    <img src={heart} alt="heart" />
                </div>

                <p>{relativeTime}</p>
            </div>
        </div>
    );
};

export default Card;