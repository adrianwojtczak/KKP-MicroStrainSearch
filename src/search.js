import * as strainsData from './data/strains.JSON';

const strainsList = strainsData.strains;

console.log(strainsList);

const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
const searchBtn = document.getElementById('searchBtn');
const strainsContainer = document.getElementById('strainsContainer');

const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalStrainInfo = document.getElementById('modalStrainInfo');
const modalCloseBtn = document.querySelector('.close');

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
	console.log(searchValue);

	const filteredStrains = searchStrains(searchValue);
	displayStrains(filteredStrains);
}

function searchStrains(searchTerm) {
	const filteredStrains = strainsList.filter(strain => {
		const strainName = strain.strain.trim().toLowerCase();
		const strainNo = strain.no.trim().toLowerCase();
		return strainName.includes(searchTerm) || strainNo.includes(searchTerm);
	});
	return filteredStrains;
}

function searchStrains(searchTerm) {
	const filteredStrains = strainsList.filter(strain => {
		const strainName = strain.strain.trim().toLowerCase();
		const strainNo = strain.no.trim().toLowerCase();
		return strainName.includes(searchTerm) || strainNo.includes(searchTerm);
	});
	return filteredStrains;
}

console.log(searchStrains('bacillus'));

function displayStrains(strains) {
	strainsContainer.innerHTML = '';

	strains.forEach(strain => {
		const strainEl = document.createElement('div');
		strainEl.classList.add('strain');

		const nameAndNumber = document.createElement('p');
		nameAndNumber.textContent = `${strain.strain} ${strain.no}`;
		nameAndNumber.classList.add('strain-info');
		strainEl.appendChild(nameAndNumber);

		strainEl.addEventListener('click', () => {
			openModal(strain);
		});

		strainsContainer.appendChild(strainEl);
	});
}

function openModal(strain) {
	modal.style.display = 'block';
	modalStrainInfo.innerHTML = '';

	const modalTitle = document.createElement('h2');
	modalTitle.textContent = `${strain.strain} ${strain.no}`;
	modalStrainInfo.appendChild(modalTitle);

	const modalInfoList = document.createElement('ul');

	const isolationInfo = strain.isolation;
	if (isolationInfo) {
		const isolationItem = document.createElement('li');
		isolationItem.textContent = `Isolation Year: ${isolationInfo.year}, Place: ${isolationInfo.place}`;
		modalInfoList.appendChild(isolationItem);
	}

	const growthConditionsInfo = strain.growthConditions;
	if (growthConditionsInfo) {
		const growthConditionsItem = document.createElement('li');
		growthConditionsItem.textContent = `Growth Temperature: ${growthConditionsInfo.temperature}, Conditions: ${growthConditionsInfo.conditions}`;
		modalInfoList.appendChild(growthConditionsItem);
	}

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
