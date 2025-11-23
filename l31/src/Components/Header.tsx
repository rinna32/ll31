

export default function Header() {
    return (
        <nav className="p-4 bg-blue-600 text-white shadow-md">
            <ul className="flex justify-around list-none p-0 m-0">
                <li>
                    <a href="/" className="hover:underline">Главная</a>
                </li>
                <li>
                    <a href="/search-weather" className="hover:underline">Поиск погоды</a>
                </li>
                <li>
                    <a href="/about" className="hover:underline">О нас</a>
                </li>
            </ul>
        </nav>
    )
}
