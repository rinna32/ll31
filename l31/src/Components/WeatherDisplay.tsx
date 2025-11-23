import { useEffect, useState } from 'react';
import { useParams } from 'react-router';


const WeatherDisplay = () => {
    const { city } = useParams();
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!city) {
            setError("Город не указан");
            setLoading(false);
            return;
        }

        const fetchWeather = async () => {
            setLoading(true);
            setError(null);
            try {
                const apiKey = 'd89c47e816a7f7d1f11e405e6b771340';
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                setWeather(data);
            } catch (err) {
                console.error("Ошибка при получении погоды:", err);
                setError(`Не удалось получить данные о погоде для города "${city}". ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    if (loading) return <p>Загрузка погоды для {city}...</p>;
    if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;
    if (!weather) return <p>Нет данных о погоде.</p>;

    return (
        <div>
            <h2>{weather.name}</h2>
            <p>Температура: {weather.main.temp} °C</p>
            <p>Ощущается как: {weather.main.feels_like} °C</p>
            <p>Влажность: {weather.main.humidity} %</p>
            <p>Описание: {weather.weather[0].description}</p>
            <p>Скорость ветра: {weather.wind.speed} м/с</p>
        </div>
    );
};

export default WeatherDisplay;