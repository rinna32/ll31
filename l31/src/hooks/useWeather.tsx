import { useState } from 'react';
import { getCoordinates, fetchWeather } from '../services/weatherServices'

export function useWeather() {
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const load = async (city: string) => {
        setLoading(true);
        setError(null);
        try {
            const coords = await getCoordinates(city);
            const data = await fetchWeather(coords.lat, coords.lon);
            setWeather({ ...data, name: coords.displayName });
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return { weather, loading, error, load };
}