import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import SeriesList from "./components/SeriesList.jsx";
import { searchShows } from "./api/tvMazeApi.js";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const shows = await searchShows(cleanQuery);

      setResults(shows);

    } catch (e) {
      setError("Error buscando series");
    } finally {
      setLoading(false);
    }
  }

  function openDetail(id) {
    console.log("Abrir detalle:", id);
  }

  return (
    <div className="app">
      <h1>TVMaze</h1>

      <SearchBar
        query={query}
        onChange={setQuery}
        onSubmit={handleSearch}
        isLoading={loading}
      />

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {loading && (
        <p>Cargando…</p>
      )}

      {!loading && (
        <SeriesList
          shows={results}
          onOpenDetail={openDetail}
        />
      )}
    </div>
  );
}