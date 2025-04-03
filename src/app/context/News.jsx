
import React from "react";
import { useState } from "react";
import axios from "axios";
const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

// // Function to fetch crypto news from the API
// async function getCryptoNews() {
//   try {
//     const response = await fetch();
//     const data = await response.json();
//     displayNews(data.articles);
//   } catch (error) {
//     console.error('Error fetching news:', error);
//   }
// }

// Function to display the news in the HTML
function displayNews() {
    const [data, setData] = useState([]);
    const getNews = () => {
        axios.get(`https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${apiKey}`)
        .then((response) => {
            setData(response.data.articles);
            console.log(response.data.articles);
        });
    }
    return (
        <>
            <div className="container my-3 flex justify-center">
                <button 
                    onClick={getNews} 
                    className="btn btn-primary text-white bg-amber-950 px-6 py-3 text-xl rounded-lg"
                >
                    Fetch News!
                </button>
            </div>

        <div className="container">
            <div className="row flex">
                {
                    data.slice(0,5).map((value, index) => {
                        return (
                         <div className="col-3" key={index}>
                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-red-200 ">
                                 <a href="#">
                                     <img className="rounded-t-lg" src={value.urlToImage} alt="" />
                                 </a>
                                 <div className="p-5">
                                     <a href="#">
                                         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{value.title}</h5>
                                     </a>
                                     <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{value.description}</p>
                                     <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-500" >
                                         Read more

                                     </a>
                                 </div>
                             </div>
                         </div>
                        );
                    })
                }
            </div>
        </div>
        </>
    );
}

export default displayNews;

