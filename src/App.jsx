import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import ErrorPage from "./pages/ErrorPage";

// Components
import useLocalStorage from "./hooks/useLocalStorage";
import SearchResults from "./pages/SearchResults";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.scss";

function App() {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage([], "recent");

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={<Home recentlyViewed={recentlyViewed} setRecentlyViewed={setRecentlyViewed} />}
          />
          <Route
            path="/movie/:id"
            element={
              <Movie recentlyViewed={recentlyViewed} setRecentlyViewed={setRecentlyViewed} />
            }
          />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
