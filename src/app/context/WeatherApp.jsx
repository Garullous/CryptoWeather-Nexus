import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api_key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

const cities = [
    { name: "Tokyo", lat: 35.682839, lon: 139.759455 },
    { name: "New York", lat: 40.712776, lon: -74.005974 },
    { name: "Mumbai", lat: 19.076090, lon: 72.877426 }
];

const WeatherComponent = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [favorites, setFavorites] = useState(new Set());

    // Load favorites from local storage when the component mounts
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(new Set(savedFavorites));
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const responses = await Promise.all(
                    cities.map(city =>
                        fetch(
                            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${api_key}`
                        ).then(res => res.json())
                    )
                );

                const formattedData = responses.map((data, index) => {
                    const weatherInfo = {
                        name: cities[index].name,
                        temperature: data.main.temp,
                        pressure: data.main.pressure,
                        humidity: data.main.humidity
                    };

                    return weatherInfo;
                });

                setWeatherData(formattedData);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchWeather();
    }, []);

    // Toggle favorite status for a city
    const toggleFavorite = (cityName) => {
        const updatedFavorites = new Set(favorites);
        if (updatedFavorites.has(cityName)) {
            updatedFavorites.delete(cityName);
            toast.info(`Removed ${cityName} from favorites`, { autoClose: 3000 });
        } else {
            updatedFavorites.add(cityName);
            toast.success(` ${cityName} added to favorites!`, { autoClose: 3000 });
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify([...updatedFavorites]));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6">🌍 Weather Info</h2>

            {/* Favorite Cities Section */}
            {favorites.size > 0 && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-center mb-3"> Favorite Cities</h3>
                    <div className="grid grid-cols-2 gap-6">
                        {weatherData
                            .filter(city => favorites.has(city.name))
                            .map((city) => (
                                <div key={city.name} className="flex flex-col items-center p-5 bg-yellow-100 rounded-lg shadow-md w-full">
                                    <p className="text-lg font-bold">{city.name}</p>
                                    <p className="text-gray-700">Temp: 🌡 {city.temperature}°C</p>
                                    <p className="text-gray-700">Pressure: 🔵 {city.pressure} hPa</p>
                                    <p className="text-gray-700">Humidity: 💧 {city.humidity}%</p>
                                    <button
                                        onClick={() => toggleFavorite(city.name)}
                                        className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg"
                                    >
                                        Remove 
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* All Cities Section */}
            <div className="grid grid-cols-2 gap-6">
                {weatherData.map((city) => (
                    <div
                        key={city.name}
                        className={`flex flex-col items-center p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 w-full ${
                            favorites.has(city.name) ? "bg-blue-200" : "bg-red-100"
                        }`}
                    >
                        <p className="text-lg font-bold">{city.name}</p>
                        <p className="text-gray-700">Temp: 🌡 {city.temperature}°C</p>
                        <p className="text-gray-700">Pressure: 🔵 {city.pressure} hPa</p>
                        <p className="text-gray-700">Humidity: 💧 {city.humidity}%</p>
                        <button
                            onClick={() => toggleFavorite(city.name)}
                            className="mt-2 px-3 py-1 bg-green-500 text-white rounded-lg"
                        >
                            {favorites.has(city.name) ? "Unfavorite " : "Add to Favorites "}
                        </button>
                    </div>
                ))}
            </div>

            <ToastContainer position="top-right" />
        </div>
    );
};

export default WeatherComponent;
