import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar.jsx";
import SeriesList from "./components/SeriesList.jsx";
import FavoritesPanel from "./components/FavoritesPanel.jsx";
import Modal from "./components/Modal.jsx";
import ShowDetail from "./components/OpenDetail.jsx";

import {
  searchShows,
  fetchShowDetail,
} from "./api/tvMazeApi.js";

const STORAGE = "favorites";

function getSaved() {
  try {
    const data = localStorage.getItem(STORAGE);

    if (data) {
      return JSON.parse(data);
    }

    return [];
  } catch {
    return [];
  }
}

export default function App() {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [favorites, setFavorites] =
    useState(getSaved);

  const [open, setOpen] = useState(false);

  const [detail, setDetail] =
    useState(null);

  const [detailLoading, setDetailLoading] =
    useState(false);

  const [detailError, setDetailError] =
    useState("");

  useEffect(() => {
    localStorage.setItem(
      STORAGE,
      JSON.stringify(favorites)
    );
  }, [favorites]);

  async function handleSearch() {
    const text = query.trim();

    if (!text) return;

    setLoading(true);
    setError("");

    try {
      const data =
        await searchShows(text);

      setResults(data);

    } catch {
      setError("Error buscando");
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite(show) {
    const exists =
      favorites.find(
        (item) => item.id === show.id
      );

    if (exists) {
      setFavorites(
        favorites.filter(
          (item) =>
            item.id !== show.id
        )
      );

      return;
    }

    setFavorites([
      show,
      ...favorites,
    ]);
  }

  async function openDetail(id) {
    setOpen(true);

    setDetailLoading(true);

    setDetail(null);

    try {
      const data =
        await fetchShowDetail(id);

      setDetail(data);

    } catch {
      setDetailError(
        "No se pudo cargar"
      );
    } finally {
      setDetailLoading(false);
    }
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

      <FavoritesPanel
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onOpenDetail={openDetail}
      />

      {error && (
        <p>{error}</p>
      )}

      <SeriesList
        shows={results}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onOpenDetail={openDetail}
      />

      <Modal
        open={open}
        onClose={() =>
          setOpen(false)
        }
      >

        {detailLoading && (
          <p>Cargando…</p>
        )}

        {!detailLoading &&
          detail && (
            <ShowDetail
              detail={detail}
            />
          )}

      </Modal>

    </div>
  );
}