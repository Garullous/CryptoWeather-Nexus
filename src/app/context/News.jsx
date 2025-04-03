import React, { useState, useEffect } from "react";
import axios from "axios";

// const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

function DisplayNews() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`https://newsdata.io/api/1/latest?apikey=pub_7792262fe63976a18e5d048fbd4fc3d794b84`)
            .then((response) => {
                setData(response.data.results);
                console.log(response.data.results);
            })
            .catch((error) => console.error("Error fetching news:", error));
    }, []); // Runs only on component mount
    return (
        <div className="container my-3 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {Array.isArray(data) ? (
                    data.slice(0, 5).map((value, index) => (
                        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-red-200 p-4" key={index}>
                            <a href={value.url} target="_blank" rel="noopener noreferrer">
                                <img className="rounded-t-lg w-full h-48 object-cover" src={value.image_url} alt={value.title} />
                            </a>
                            <div className="p-4">
                                <a href={value.link} target="_blank" rel="noopener noreferrer">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                                        {value.title}
                                    </h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    {value.source_name}
                                </p>
                                <a href={value.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-500">
                                    Read more
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-700">Loading...</p>
                )}
            </div>
        </div>
    );
    
}

export default DisplayNews;
