export default function SearchBar(props) {
  function submitSearch(event) {
    event.preventDefault();

    if (!props.isLoading) {
      props.onSubmit();
    }
  }

  const buttonDisabled =
    props.isLoading || props.query.trim().length === 0;

  return (
    <section className="searchBar">
      <form onSubmit={submitSearch}>
        <input
          type="search"
          placeholder="Nombre de una serie"
          value={props.query}
          autoComplete="off"
          onInput={(event) => props.onChange(event.target.value)}
        />

        <button disabled={buttonDisabled}>
          {props.isLoading ? "Cargando..." : "BUSCAR"}
        </button>
      </form>
    </section>
  );
}