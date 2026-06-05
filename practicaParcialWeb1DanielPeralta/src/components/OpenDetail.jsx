export default function ShowDetail(props) {
  const detail = props.detail;

  if (!detail) return null;

  const {
    name,
    image,
    genres,
    language,
    status,
    runtime,
    rating,
    premiered,
    ended,
    officialSite,
    summary,
    episodes,
    cast,
  } = detail;

  const mainInfo = [language, ...(genres || [])]
    .filter(Boolean)
    .join(" · ");

  const episodesToShow = (episodes || []).slice(0, 20);
  const castToShow = (cast || []).slice(0, 10);

  return (
    <div className="detail-wrapper">

      <div className="top-section">

        <div className="poster-area">
          {image ? (
            <img src={image} alt={name} />
          ) : (
            <div className="no-image">
              Sin imagen
            </div>
          )}
        </div>

        <div className="info-area">

          <h2>{name}</h2>

          {mainInfo && (
            <p className="muted">
              {mainInfo}
            </p>
          )}

          <div className="tags">
            {rating != null && (
              <span>* {rating}</span>
            )}

            {status && (
              <span>{status}</span>
            )}

            {runtime && (
              <span>{runtime} min</span>
            )}

            {premiered && (
              <span>{premiered}</span>
            )}

            {ended && (
              <span>{ended}</span>
            )}
          </div>

          {officialSite && (
            <a
              href={officialSite}
              target="_blank"
              rel="noreferrer"
            >
              Web oficial
            </a>
          )}

        </div>

      </div>

      {castToShow.length > 0 && (
        <div className="block">
          <h3>Reparto</h3>

          <ul>
            {castToShow.map((item, index) => (
              <li key={index}>
                {item.person?.name || "—"}
                {item.character?.name
                  ? ` → ${item.character.name}`
                  : ""}
              </li>
            ))}
          </ul>
        </div>
      )}

      {episodesToShow.length > 0 && (
        <div className="block">
          <h3>Episodios ({episodes?.length || 0})</h3>

          <ul>
            {episodesToShow.map((ep) => (
              <li key={ep.id}>
                {formatEpisode(ep)} — {ep.name}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

function formatEpisode(ep) {
  const season = ep.season ?? "?";
  const number = ep.number ?? "?";

  return `S${String(season).padStart(2, "0")}E${String(number).padStart(2, "0")}`;
}