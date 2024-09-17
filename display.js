import { getCharacters } from './app.js';

const charsContainer = document.querySelector('.chars-container');
const loadMoreButton = document.getElementById('load-more');
const nameInput = document.getElementById('name');
const speciesSelect = document.getElementById('species');
const genderSelect = document.getElementById('gender');
const statusSelect = document.getElementById('status');

let currentPage = 1;
let isLoading = false;
let totalPages = 1; // Total de páginas conhecido inicialmente

async function loadCharacters(page) {
    if (isLoading || page > totalPages) return;

    isLoading = true;

    const filters = {
        name: nameInput.value,
        species: speciesSelect.value,
        gender: genderSelect.value,
        status: statusSelect.value,
        page: page
    };

    try {
        const { characters, totalPages: fetchedTotalPages } = await getCharacters(filters);

        if (characters.length === 0 && page === 1) {
            charsContainer.innerHTML = '<p>No characters found.</p>';
        } else {
            displayCharacters(characters);
            currentPage = page;
            totalPages = fetchedTotalPages; // Atualiza o total de páginas

            // Se a página atual for maior ou igual ao total de páginas, esconda o botão
            if (currentPage >= totalPages) {
                loadMoreButton.style.display = 'none';
            } else {
                loadMoreButton.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Error loading characters:', error);
    } finally {
        isLoading = false;
    }
}

function displayCharacters(characters) {
    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.classList.add('char');

        characterCard.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <div class="char-info">
                <h3>${character.name}</h3>
                <span>${character.species}</span>
            </div>
        `;

        charsContainer.appendChild(characterCard);
    });
}

function handleLoadMore() {
    loadCharacters(currentPage + 1);
}

function handleFilterChange() {
    currentPage = 1;
    charsContainer.innerHTML = '';
    loadMoreButton.style.display = 'block';
    loadCharacters(currentPage);
}

loadCharacters(currentPage);

loadMoreButton.addEventListener('click', handleLoadMore);
nameInput.addEventListener('input', handleFilterChange);
speciesSelect.addEventListener('change', handleFilterChange);
genderSelect.addEventListener('change', handleFilterChange);
statusSelect.addEventListener('change', handleFilterChange);
