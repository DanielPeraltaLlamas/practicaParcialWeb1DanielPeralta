export default function FavoritesPanel({
  favorites,
  onToggleFavorite,
  onOpenDetail,
}) {
  if (favorites.length === 0) {
    return null;
  }

  return (
    <section>

      <h2>Favoritas</h2>

      <div className="favorites">

        {favorites.map((serie) => (
          <div
            key={serie.id}
            className="favorite"
          >

            <button
              onClick={() =>
                onOpenDetail(
                  serie.id
                )
              }
            >
              {serie.name}
            </button>

            <button
              onClick={() =>
                onToggleFavorite(
                  serie
                )
              }
            >
              ✕
            </button>

          </div>
        ))}

      </div>

    </section>
  );
}