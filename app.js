const API = 'https://rickandmortyapi.com/api';

export async function getCharacters({name, species, gender, status, page = 1}) {
    try {
        const response = await fetch(`${API}/character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const characters = await response.json();
        return characters.results;
    } catch (error) {
        console.error('Error fetching characters:', error);
        return [];
    }
}


