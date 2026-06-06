import Serie from "./Serie.jsx";

export default function SeriesList(props) {
  const {
    shows,
    favorites,
    onToggleFavorite,
    onOpenDetail,
  } = props;

  if (shows.length === 0) {
    return (
      <div className="empty">
        <h3>Sin resultados</h3>

        <p className="muted">
          Busca una serie para empezar.
        </p>
      </div>
    );
  }

  return (
    <section className="results">

      <h2>Series</h2>

      <div className="cardList">

        {shows.map((show) => (
          <Serie
            key={show.id}
            show={show}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            onOpenDetail={onOpenDetail}
          />
        ))}

      </div>

    </section>
  );
}