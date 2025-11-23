export const WeatherCard: React.FC<{ weather: any }> = ({ weather }) => {
    if (!weather) return null;

    const getWeatherDescription = (code: number) => {
        switch (code) {
            case 0: return 'Ясно';
            case 1:
            case 2:
            case 3: return 'Преимущественно ясно, частичная облачность и пасмурно';
            case 45:
            case 48: return 'Туман и отложение изморози';
            case 51:
            case 53:
            case 55: return 'Морось: легкая, умеренная и плотная интенсивность';
            case 56:
            case 57: return 'Моросящий дождь: легкая и плотная интенсивность';
            case 61:
            case 63:
            case 65: return 'Дождь: небольшой, умеренный и сильный';
            case 66:
            case 67: return 'Ледяной дождь: легкий и сильный';
            case 71:
            case 73:
            case 75: return 'Снегопад: слабый, умеренный и сильный';
            case 77: return 'Снежные зерна';
            case 80:
            case 81:
            case 82: return 'Ливневые дожди: небольшие, умеренные и сильные';
            case 85:
            case 86: return 'Снегопад: слабый и сильный';
            case 95: return 'Гроза: слабая или умеренная';
            case 96:
            case 99: return 'Гроза с небольшим и сильным градом';
            default: return 'Неизвестная погода';
        }
    };

    return (
        <div className="p-4 border rounded-xl text-center shadow-sm bg-white">
            {weather.name && <h3 className="text-xl font-semibold mb-2">{weather.name}</h3>}
            <div className="text-5xl font-bold">{Math.round(weather.temperature)}°C</div>
            <div>Ветер: {weather.windspeed} м/с</div>
            <div className="text-sm opacity-70">
                Погода: {getWeatherDescription(weather.code)} ({weather.code})
            </div>
        </div>
    );
};