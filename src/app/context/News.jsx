import React, { useState, useEffect } from "react";
import axios from "axios";

// const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

function DisplayNews() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=296e34ae0afe4397b4f658e0fc8994c6`)
            .then((response) => {
                setData(response.data.articles);
                console.log(response.data.articles);
            })
            .catch((error) => console.error("Error fetching news:", error));
    }, []); // Runs only on component mount

    return (
        <div className="container my-3 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {data.slice(0, 5).map((value, index) => (
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-red-200 p-4" key={index}>
                        <a href={value.url} target="_blank" rel="noopener noreferrer">
                            <img className="rounded-t-lg w-full h-48 object-cover" src={value.urlToImage} alt={value.title} />
                        </a>
                        <div className="p-4">
                            <a href={value.url} target="_blank" rel="noopener noreferrer">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                                    {value.title}
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {value.description}
                            </p>
                            <a href={value.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-500">
                                Read more
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DisplayNews;
