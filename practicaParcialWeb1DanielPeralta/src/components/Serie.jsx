export default function Serie({
  show,
  favorites,
  onToggleFavorite,
  onOpenDetail,
}) {
  const saved =
    favorites.some(
      (f) =>
        f.id === show.id
    );

  return (
    <div className="card">

      <button
        onClick={() =>
          onOpenDetail(
            show.id
          )
        }
      >
        <img
          src={show.image}
          alt={show.name}
        />
      </button>

      <h3>
        {show.name}
      </h3>

      <button
        onClick={() =>
          onToggleFavorite(
            show
          )
        }
      >
        {saved
          ? "Quitar"
          : "Favorito"}
      </button>

    </div>
  );
}