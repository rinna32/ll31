import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLockalStorage'
import { useWeather } from '../hooks/useWeather'
import { WeatherCard } from './WeatherCard';
import { HistoryList } from './HistoryList';

export default function WeatherSearchPage() {
    const { weather, loading, error, load } = useWeather();
    const [history, setHistory] = useLocalStorage<string[]>('history', []);
    const [city, setCity] = useState<string>('');

    const handleSearch = async () => {
        const q = city.trim();
        if (!q) {
            alert('Введите название города');
            return;
        }

        try {
            await load(q);
            if (!history.includes(q)) {
                setHistory([...history, q]);
            }
        } catch (e: any) {
            console.error(e);
            alert('Ошибка при загрузке погоды: ' + e.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex justify-center items-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-xl font-semibold mb-3 text-center">Приложение Погоды</h1>

                <div className="flex gap-2 mb-3">
                    <input
                        value={city}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
                        placeholder="Введите город"
                        className="flex-1 border rounded px-3 py-2"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-sky-500 text-white px-3 py-2 rounded"
                    >
                        Поиск
                    </button>
                </div>

                {loading && <div>Загрузка...</div>}
                {error ? <div className="text-red-600">Ошибка: {error}</div> : null}
                {!loading && weather && <WeatherCard weather={weather} />}

                <h3 className="mt-4 font-medium">История запросов</h3>
                <HistoryList history={history} />
            </div>
        </div>
    );
} 