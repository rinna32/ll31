export async function getCoordinates(city: string) {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`;
    const res = await fetch(nominatimUrl);
    if (!res.ok) throw new Error('Ошибка получения координат');
    const data = await res.json();
    if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), displayName: data[0].display_name };
    }
    throw new Error('Город не найден');
}

export async function fetchWeather(lat: number, lon: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Ошибка получения данных о погоде');
    const data = await res.json();

    return {
        temperature: data.current_weather?.temperature,
        windspeed: data.current_weather?.windspeed,
        code: data.current_weather?.weathercode,
        raw: data.current_weather
    };
}