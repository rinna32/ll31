import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

interface WeatherData {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    weather: {
        description: string;
    }[];
    wind: {
        speed: number;
    };
}

const WeatherDisplay = () => {
    const { city } = useParams<{ city: string }>();
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                const data: WeatherData = await response.json();
                setWeather(data);
            } catch (err: unknown) {
                console.error("Ошибка при получении погоды:", err);
                if (err instanceof Error) {
                    setError(`Не удалось получить данные о погоде для города "${city}". ${err.message}`);
                } else {
                    setError(`Не удалось получить данные о погоде для города "${city}". Неизвестная ошибка`);
                }
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
