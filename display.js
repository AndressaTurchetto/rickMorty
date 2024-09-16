import { getCharacters } from './app.js';

const charsContainer = document.querySelector('.chars-container');
const loadMoreButton = document.getElementById('load-more');
const nameInput = document.getElementById('name');
const speciesSelect = document.getElementById('species');
const genderSelect = document.getElementById('gender');
const statusSelect = document.getElementById('status');

let currentPage = 1;
let isLoading = false;

async function loadCharacters(page) {
    if (isLoading) return;

    isLoading = true;

    const filters = {
        name: nameInput.value,
        species: speciesSelect.value,
        gender: genderSelect.value,
        status: statusSelect.value,
        page: page
    };

    try {
        const characters = await getCharacters(filters);
        displayCharacters(characters);
        currentPage = page; 
    } catch (error) {
        console.error('Error loading characters:', error);
    } finally {
        isLoading = false;
    }
}

function displayCharacters(characters) {
    if (characters.length === 0 && currentPage === 1) {
        charsContainer.innerHTML = '<p>No characters found.</p>';
        return;
    }

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
    loadCharacters(currentPage);
}

loadCharacters(currentPage);

loadMoreButton.addEventListener('click', handleLoadMore);
nameInput.addEventListener('input', handleFilterChange);
speciesSelect.addEventListener('change', handleFilterChange);
genderSelect.addEventListener('change', handleFilterChange);
statusSelect.addEventListener('change', handleFilterChange);


document.getElementById('applyFilters').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const species = document.getElementById('species').value;
    const gender = document.getElementById('gender').value;
    const status = document.getElementById('status').value;
  
    let url = 'https://rickandmortyapi.com/api/character?';
    
    if (name) url += `name=${name}&`;
    if (species) url += `species=${species}&`;
    if (gender) url += `gender=${gender}&`;
    if (status) url += `status=${status}&`;
  
    url = url.endsWith('&') ? url.slice(0, -1) : url;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const charactersDiv = document.getElementById('characters');
        charactersDiv.innerHTML = ''; 
  
        data.results.forEach(character => {
          const charElement = document.createElement('div');
          charElement.innerHTML = `
            <h2>${character.name}</h2>
            <p>Species: ${character.species}</p>
            <p>Gender: ${character.gender}</p>
            <p>Status: ${character.status}</p>
            <img src="${character.image}" alt="${character.name}" />
          `;
          charactersDiv.appendChild(charElement);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
