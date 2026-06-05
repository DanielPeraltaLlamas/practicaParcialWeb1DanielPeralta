import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";

export default function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSearch() {
    console.log("BUSCANDO:", query);
  }

  return (
    <div>
      <h1>TVMaze</h1>
      <SearchBar
        query={query}
        onChange={setQuery}
        onSubmit={handleSearch}
        isLoading={loading}
      />
    </div>
  );
}