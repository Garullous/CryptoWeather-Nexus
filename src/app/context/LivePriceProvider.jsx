"use client";
import { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SIGNIFICANT_CHANGE_THRESHOLD = 8; // percent change threshold

const LiveCryptoPrices = () => {
  const [livePrices, setLivePrices] = useState({});
  const [wsError, setWsError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const isMounted = useRef(false);

  // Mark component as mounted
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Toggle favorite status and update localStorage
  const toggleFavorite = (coin) => {
    let updatedFavorites;
    if (favorites.includes(coin)) {
      updatedFavorites = favorites.filter((fav) => fav !== coin);
      if (isMounted.current) {
        toast.info(
          `${coin.charAt(0).toUpperCase() + coin.slice(1)} removed from favorites!`
        );
      }
    } else {
      updatedFavorites = [...favorites, coin];
      if (isMounted.current) {
        toast.info(
          `${coin.charAt(0).toUpperCase() + coin.slice(1)} added to favorites!`
        );
      }
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // WebSocket connection to update live prices
  useEffect(() => {
    const socket = new WebSocket(
      "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin"
    );

    socket.onopen = () => {
      console.log("WebSocket Connected");
      setWsError(null);
    };

    socket.onmessage = (event) => {
      try {
        const updatedPrices = JSON.parse(event.data);
        console.log("Live price update:", updatedPrices);
        setLivePrices((prevPrices) => {
          Object.entries(updatedPrices).forEach(([coin, newPriceStr]) => {
            const newPrice = parseFloat(newPriceStr);
            const prevPrice = parseFloat(prevPrices[coin]) || 0;
            if (
              prevPrice &&
              Math.abs(((newPrice - prevPrice) / prevPrice) * 100) >=
                SIGNIFICANT_CHANGE_THRESHOLD
            ) {
              if (isMounted.current) {
                toast.info(
                  `${coin.charAt(0).toUpperCase() + coin.slice(1)} price shifted by ${(
                    ((newPrice - prevPrice) / prevPrice) *
                    100
                  ).toFixed(2)}%!`
                );
              }
            }
          });
          return { ...prevPrices, ...updatedPrices };
        });
      } catch (err) {
        console.error("JSON Parse Error:", err);
        setWsError("Invalid WebSocket response format");
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
      setWsError("WebSocket connection failed");
    };

    socket.onclose = (event) => {
      console.warn(
        "⚠️ WebSocket Closed:",
        event.reason || "No reason provided"
      );
      setWsError("WebSocket disconnected, Refresh the page till it works!!");
    };

    return () => {
      socket.close();
    };
  }, []);

  const coins = ["bitcoin", "ethereum", "monero", "litecoin"];

  return (
    <>
      <h3 className="text-4xl font-extrabold text-gray-900 mb-8">
        Live Crypto Marketplace
      </h3>
      <div className="p-6 bg-white w-full text-black">
        {wsError && (
          <p className="text-center mb-4 text-red-500">{wsError}</p>
        )}
        <div className="grid grid-cols-2 gap-6">
          {coins.map((coin) => {
            const price = livePrices[coin];
            const formattedPrice = price
              ? `$${parseFloat(price).toFixed(2)}`
              : "Fetching...";
            const isFavorite = favorites.includes(coin);
            return (
              <div
                key={coin}
                className={`flex flex-col items-center p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 w-full ${
                  isFavorite ? "bg-yellow-200" : "bg-red-100"
                }`}
              >
                <p className="text-lg font-bold capitalize">{coin}</p>
                <p className="text-green-600 text-xl">{formattedPrice}</p>
                <button
                  onClick={() => toggleFavorite(coin)}
                  className={`mt-2 px-4 py-2 ${
                    isFavorite ? "bg-red-500" : "bg-blue-500"
                  } text-white rounded`}
                >
                  {isFavorite ? "Remove" : "Favorite"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default LiveCryptoPrices;
