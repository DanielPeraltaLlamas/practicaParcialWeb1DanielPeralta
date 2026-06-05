import Serie from "./Serie.jsx";

export default function SeriesList(props) {
  const hasShows = props.shows.length > 0;

  if (!hasShows) {
    return (
      <section className="empty">
        <h3>No hay resultados</h3>

        <p className="muted">
          Intenta escribir otra serie.
        </p>
      </section>
    );
  }

  return (
    <section className="series-container">

      {props.shows.map((item) => (
        <Serie
          key={item.id}
          show={item}
          onOpenDetail={props.onOpenDetail}
        />
      ))}

    </section>
  );
}