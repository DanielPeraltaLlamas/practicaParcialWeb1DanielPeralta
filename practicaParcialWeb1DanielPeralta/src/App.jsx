import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import SeriesList from "./components/SeriesList.jsx";
import Modal from "./components/Modal.jsx";
import ShowDetail from "./components/OpenDetail.jsx";
import { searchShows, fetchShowDetail } from "./api/tvMazeApi.js";

export default function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState("");

  async function doSearch() {
    const value = text.trim();
    if (!value) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await searchShows(value);
      setList(res);
    } catch {
      setErrorMsg("Error buscando series");
    } finally {
      setIsLoading(false);
    }
  }

  async function showInfo(id) {
    setIsOpen(true);
    setSelected(null);
    setDetailError("");
    setLoadingDetail(true);

    try {
      const data = await fetchShowDetail(id);
      setSelected(data);
    } catch {
      setDetailError("Error cargando detalle");
    } finally {
      setLoadingDetail(false);
    }
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <div className="app">
      <h1>TVMaze</h1>

      <SearchBar
        query={text}
        onChange={setText}
        onSubmit={doSearch}
        isLoading={isLoading}
      />

      {errorMsg && <div className="error">{errorMsg}</div>}
      {isLoading && <p>Cargando…</p>}

      <SeriesList
        shows={list}
        onOpenDetail={showInfo}
      />

      <Modal open={isOpen} onClose={close}>
        {loadingDetail && <p>Cargando detalle…</p>}

        {detailError && <p className="error">{detailError}</p>}

        {!loadingDetail && !detailError && selected && (
          <ShowDetail detail={selected} />
        )}
      </Modal>
    </div>
  );
}