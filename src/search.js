import * as strainsData from './data/strains.JSON';

const strainsList = strainsData.IBPRS1.www;

const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
const searchBtn = document.getElementById('searchBtn');
const strainsContainer = document.getElementById('strainsContainer');

const modal = document.getElementById('modal');
const modalStrainInfo = document.getElementById('modalStrainInfo');
const modalCloseBtn = document.querySelector('.close');

// Display all strains initially
displayAllStrains(strainsList);

searchBtn.addEventListener('click', ev => {
	ev.preventDefault();
	performSearch();
});

searchForm.addEventListener('submit', ev => {
	ev.preventDefault();
	performSearch();
});

function performSearch() {
	const searchValue = searchInput.value.trim().toLowerCase();

	const filteredStrains = searchStrains(searchValue);
	displayStrains(filteredStrains);
}

function displayAllStrains(strains) {
	strainsContainer.innerHTML = '';

	for (const strain of strains) {
		const strainElement = createStrainElement(strain);
		strainsContainer.appendChild(strainElement);
	}
}

function searchStrains(searchTerm) {
	let filteredStrains = [];

	for (const strain of strainsList) {
		const strainName = `${strain.Gatunek} KKP ${strain.KKP}`.toLowerCase();

		if (strainName.includes(searchTerm)) {
			filteredStrains.push(strain);
		}
	}

	return filteredStrains;
}

function displayStrains(strains) {
	strainsContainer.innerHTML = '';

	for (const strain of strains) {
		const strainElement = createStrainElement(strain);
		strainsContainer.appendChild(strainElement);
	}
}

function createStrainElement(strain) {
	const strainElement = document.createElement('div');
	strainElement.classList.add('strain-item');
	const strainName = `${strain.Rodzaj} ${strain.Gatunek} KKP ${strain.KKP}`;
	strainElement.innerHTML = `<span class="strain-info">${strainName}</span>`;
	strainElement.addEventListener('click', () => openModal(strain));
	return strainElement;
}

function openModal(strain) {
	modal.style.display = 'block';
	modalStrainInfo.innerHTML = '';

	const modalTitle = document.createElement('h2');
	modalTitle.textContent = `${strain.Rodzaj} ${strain.Gatunek} KKP ${strain.KKP}`;
	modalTitle.classList.add('modal-title');
	modalStrainInfo.appendChild(modalTitle);

	const modalInfoList = document.createElement('ul');
	modalInfoList.classList.add('modal-info-list');

	modalInfoList.innerHTML = `
		<p class="section-header">Informacje o szczepie:</p>

		<li class="modal-info-item">Autor nazwy: ${strain.AutorNazwy || 'brak danych'}</li>
		<li class="modal-info-item">Data pobrania probki: ${strain.DataPobraniaProbki || 'brak danych'}</li>
		<li class="modal-info-item">Inne oznakowanie: ${strain.Oznakowanie || 'brak danych'}</li>
		<li class="modal-info-item">Deponujący: ${strain.Deponujacy || 'brak danych'}</li>
		<li class="modal-info-item">Grupa patogenna: ${
			strain.GrupaPatogenna
				? `${strain.GrupaPatogenna} <b>(zgodnie z Rozporządzeniem Ministra Zdrowia z dnia 11 grudnia 2020 r.)</b>`
				: 'brak danych'
		}</li>
		<li class="modal-info-item">Rok izolacji: ${strain.RokIzolacji || 'brak danych'}</li>
		<li class="modal-info-item">Kraj pochodzenia: ${strain.Kraj || 'brak danych'}</li>
		<li class="modal-info-item">GenBank: <a class="modal-link" href="https://www.ncbi.nlm.nih.gov/nuccore/${
			strain.Genbank
		}" target="_blank">${strain.Genbank}</a></li>
		<p class="section-header">Warunki hodowli:</p>
		<li class="modal-info-item">Pożywki: ${
			[strain.Medium1, strain.Medium2, strain.Medium3]
				.filter(medium => medium) // Filtruje wartości, eliminuje undefined
				.join(', ') || 'brak danych'
		}</li>
		<li class="modal-info-item">Temperatura: ${
			strain.Temperatura !== undefined ? `${strain.Temperatura} °C` : 'brak danych'
		}</li>
		<li class="modal-info-item">Wymagania atmosferyczne: ${
			strain.WymaganiaAtmosferyczne || 'brak danych'
		}</li>
	`;

	modalStrainInfo.appendChild(modalInfoList);

	// Add Listeners
	modalCloseBtn.addEventListener('click', closeModal);
	window.addEventListener('click', outsideClick);
	document.addEventListener('keydown', onEscKeyDown);
}

function closeModal() {
	modal.style.display = 'none';

	// Remove Listeners
	modalCloseBtn.removeEventListener('click', closeModal);
	window.removeEventListener('click', outsideClick);
	document.removeEventListener('keydown', onEscKeyDown);
}

function outsideClick(ev) {
	if (ev.target === modal) {
		closeModal();
	}
}

function onEscKeyDown(ev) {
	if (ev.key === 'Escape') {
		closeModal();
	}
}