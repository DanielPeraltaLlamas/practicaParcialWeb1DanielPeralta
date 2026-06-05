const API_BASE = "https://api.tvmaze.com";

function normalizeShow({ show }) {
	return {
		id: show.id,
		name: show.name,
		image: show.image?.medium ?? show.image?.original ?? null,
		genres: show.genres ?? [],
		rating: show.rating?.average ?? null,
		premiered: show.premiered ?? null,
	};
}

function normalizeShowDetail(show) {
	return {
		id: show.id,
		name: show.name,
		image: show.image?.original ?? show.image?.medium ?? null,
		language: show.language,
		status: show.status,
		runtime: show.averageRuntime,
		rating: show.rating?.average ?? null,
		summary: show.summary ?? "",
		episodes: show._embedded?.episodes ?? [],
		cast: show._embedded?.cast ?? [],
	};
}

export async function searchShows(query) {
	const response = await fetch(
		`${API_BASE}/search/shows?q=${encodeURIComponent(query)}`
	);

	if (!response.ok) {
		throw new Error("Error buscando series");
	}

	const data = await response.json();

	return data.map(normalizeShow);
}


export async function fetchShowDetail(id) {
	const response = await fetch(
		`${API_BASE}/shows/${id}?embed[]=episodes&embed[]=cast`
	);

	if (!response.ok) {
		throw new Error("Error cargando detalle");
	}

	const data = await response.json();

	return normalizeShowDetail(data);
}