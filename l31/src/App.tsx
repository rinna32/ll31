import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Header from './Components/Header'
import HomePage from './Components/HomePage'
import WeatherSearchPage from './Components/WeatherSearchPage'
import WeatherDisplayPage from './Components/WeatherDisplayPage'
import About from './Components/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-100">
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search-weather" element={<WeatherSearchPage />} />
            <Route path="/weather/:city" element={<WeatherDisplayPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;