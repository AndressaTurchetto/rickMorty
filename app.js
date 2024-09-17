const API = 'https://rickandmortyapi.com/api';

export async function getCharacters({name, species, gender, status, page = 1}) {
    try {
        const response = await fetch(`${API}/character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return {
            characters: data.results,
            totalPages: data.info.pages
        };
    } catch (error) {
        console.error('Error fetching characters:', error);
        return { characters: [], totalPages: 0 };
    }
}
