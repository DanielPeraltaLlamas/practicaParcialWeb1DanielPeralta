export default function Serie({ show, onOpenDetail }) {
  if (!show) return null;

  const releaseYear = show.premiered
    ? show.premiered.substring(0, 4)
    : "";

  const genresText =
    show.genres?.length > 0
      ? show.genres.slice(0, 2).join(" / ")
      : null;

  function openShow() {
    onOpenDetail(show.id);
  }

  return (
    <article className="serie">

      <div className="poster">
        <button onClick={openShow}>
          {show.image ? (
            <img
              src={show.image}
              alt={show.name}
            />
          ) : (
            <span className="placeholder">
              No disponible
            </span>
          )}
        </button>
      </div>

      <section className="info">

        <header>
          <h3>{show.name}</h3>

          {genresText && (
            <small className="muted">
              {genresText}
            </small>
          )}
        </header>

        <footer className="details">

          {show.rating !== null && (
            <span>
              Nota: {show.rating}
            </span>
          )}

          {releaseYear && (
            <span>
              Año {releaseYear}
            </span>
          )}

        </footer>

      </section>
    </article>
  );
}