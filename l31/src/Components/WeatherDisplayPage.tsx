import React, { useEffect, useState } from 'react';
import { WeatherCard } from './WeatherCard';
import { getCoordinates, fetchWeather } from '../services/weatherServices'
import { useParams } from 'react-router';

const WeatherDisplayPage: React.FC = () => {
    const { city } = useParams<{ city?: string }>();
    const [weather, setWeather] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!city) {
            setError("Город не указан в URL.");
            setLoading(false);
            return;
        }

        const fetchWeatherForDisplay = async () => {
            setLoading(true);
            setError(null);
            try {
                const coords = await getCoordinates(city);
                const data = await fetchWeather(coords.lat, coords.lon);
                setWeather({ ...data, name: coords.displayName });
            } catch (err: any) {
                console.error("Ошибка при получении погоды:", err);
                setError(`Не удалось получить данные о погоде для "${city}". ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherForDisplay();
    }, [city]);

    if (loading) return <div className="text-center mt-4">Загрузка погоды для {city}...</div>;
    if (error) return <div className="text-red-600 text-center mt-4">Ошибка: {error}</div>;
    if (!weather) return <div className="text-center mt-4">Нет данных о погоде для {city}.</div>;

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg mt-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-3 text-center">Погода в {weather!.name}</h2>
            <WeatherCard weather={weather!} />
        </div>
    );
};

export default WeatherDisplayPage;