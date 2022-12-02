import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import ErrorPage from "./pages/ErrorPage";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
