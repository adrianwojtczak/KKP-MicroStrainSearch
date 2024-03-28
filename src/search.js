import * as strainsData from "./data/strains.JSON";

const strainsList = strainsData.IBPRS1.www;

// Search elements
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const searchBtn = document.getElementById("searchBtn");
const strainsContainer = document.getElementById("strainsContainer");

// Modal elements
const modal = document.getElementById("modal");
const modalStrainInfo = document.getElementById("modalStrainInfo");
const modalCloseBtn = document.querySelector(".close");

// Checkbox elements
const bacteriaCheckbox = document.getElementById("bacteriaCheckbox");
const moldCheckbox = document.getElementById("moldCheckbox");
const yeastCheckbox = document.getElementById("yeastCheckbox");
const virusCheckbox = document.getElementById("virusCheckbox");

// Pagination elements
const paginationNumbers = document.getElementById("pagination-numbers");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

// Display all strains initially
// displayAllStrains(strainsList);

const resultsPerPage = 25; // Możesz dostosować tę wartość do preferencji użytkownika
let currentPage = 1; // Możesz ustawić stronę początkową
let currentDisplayFunction = displayAllStrains;

displayAllStrains(strainsList, currentPage, resultsPerPage);

searchBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  currentPage = 1;
  performSearch();
});

searchForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  currentPage = 1;
  performSearch();
});

// Add event listeners to checkboxes
bacteriaCheckbox.addEventListener("change", () => {
  currentPage = 1;
  performSearch();
});
moldCheckbox.addEventListener("change", () => {
  currentPage = 1;
  performSearch();
});
yeastCheckbox.addEventListener("change", () => {
  currentPage = 1;
  performSearch();
});
virusCheckbox.addEventListener("change", () => {
  currentPage = 1;
  performSearch();
});

function performSearch() {
  const searchValue = searchInput.value.trim().toLowerCase();

  const selectedGroups = getSelectedGroups();

  const allFilteredStrains = searchStrains(
    searchValue,
    selectedGroups,
    1,
    strainsList.length
  );

  const totalPages = Math.ceil(allFilteredStrains.length / resultsPerPage);

  const filteredStrains = searchStrains(
    searchValue,
    selectedGroups,
    currentPage,
    resultsPerPage
  );

  if (filteredStrains.length === 0) {
    // Jeżeli nie ma pasujących szczepów, wyświetl pustą tablicę
    displayStrains([]);
  } else {
    displayStrains(filteredStrains);
  }

  currentDisplayFunction = performSearch;

  // const totalPages = Math.ceil(filteredStrains.length / resultsPerPage);
  displayPagination(totalPages, currentPage);
}

// function displayAllStrains(strains) {
// 	strainsContainer.innerHTML = '';

// 	for (const strain of strains) {
// 		const strainElement = createStrainElement(strain);
// 		strainsContainer.appendChild(strainElement);
// 	}
// }

function displayAllStrains(strains, page, resultsPerPage) {
  strainsContainer.innerHTML = "";

  const startIndex = (page - 1) * resultsPerPage;
  const endIndex = Math.min(startIndex + resultsPerPage, strains.length); // Sprawdzamy czy endIndex nie przekracza długości tablicy
  const displayedStrains = strains.slice(startIndex, endIndex);

  for (const strain of displayedStrains) {
    const strainElement = createStrainElement(strain);
    strainsContainer.appendChild(strainElement);
  }

  // Wyświetlanie paginacji
  currentDisplayFunction = displayAllStrains;

  const totalPages = Math.ceil(strains.length / resultsPerPage);
  displayPagination(totalPages, page);
}

function getSelectedGroups() {
  const selectedGroups = [];

  if (bacteriaCheckbox.checked) {
    selectedGroups.push("bakterie");
  }
  if (moldCheckbox.checked) {
    selectedGroups.push("pleśnie");
  }
  if (yeastCheckbox.checked) {
    selectedGroups.push("drożdże");
  }
  if (virusCheckbox.checked) {
    selectedGroups.push("wirusy");
  }

  return selectedGroups;
}

function searchStrains(searchTerm, selectedGroups, page, resultsPerPage) {
  let filteredStrains = [];

  for (const strain of strainsList) {
    const strainName =
      `${strain.Rodzaj} ${strain.Gatunek} KKP ${strain.KKP}`.toLowerCase();

    if (
      strainName.includes(searchTerm) &&
      (selectedGroups.length === 0 ||
        selectedGroups.includes(strain.Grupa.toLowerCase()))
    ) {
      filteredStrains.push(strain);
    }
  }

  const startIndex = (page - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedStrains = filteredStrains.slice(startIndex, endIndex);

  return paginatedStrains;
}

function displayStrains(strains) {
  strainsContainer.innerHTML = "";

  for (const strain of strains) {
    const strainElement = createStrainElement(strain);
    strainsContainer.appendChild(strainElement);
  }
}

function createStrainElement(strain) {
  const strainElement = document.createElement("div");
  strainElement.classList.add("strain-item");
  const strainName = `${strain.Rodzaj} ${strain.Gatunek} KKP ${strain.KKP}`;
  strainElement.innerHTML = `<span class="strain-info">${strainName}</span>`;
  strainElement.addEventListener("click", () => openModal(strain));
  return strainElement;
}

function openModal(strain) {
  modal.style.display = "block";
  modalStrainInfo.innerHTML = "";

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = `${strain.Rodzaj} ${strain.Gatunek} KKP ${strain.KKP}`;
  modalTitle.classList.add("modal-title");
  modalStrainInfo.appendChild(modalTitle);

  const modalInfoList = document.createElement("ul");
  modalInfoList.classList.add("modal-info-list");

  modalInfoList.innerHTML = `
	  <p class="section-header">Informacje o szczepie:</p>
  
	  <li class="modal-info-item">Autor nazwy: ${
      strain.AutorNazwy || "brak danych"
    }</li>
	  <li class="modal-info-item">Data pobrania probki: ${
      strain.DataPobraniaProbki || "brak danych"
    }</li>
	  <li class="modal-info-item">Inne oznakowanie: ${
      strain.OznakowanieNaWWW || strain.Oznakowanie || "brak danych"
    }</li>
	<li class="modal-info-item">
  ${
    !strain.UkrycDeponujacego || strain.UkrycDeponujacego === "0"
      ? `Deponujący: ${strain.Deponujacy || "brak danych"}`
      : ""
  }
</li>
	  <li class="modal-info-item">Grupa patogenna: ${
      strain.GrupaPatogenna
        ? `${strain.GrupaPatogenna} <b>(zgodnie z Rozporządzeniem Ministra Zdrowia z dnia 11 grudnia 2020 r.)</b>`
        : "brak danych"
    }</li>
	  <li class="modal-info-item">Rok izolacji: ${
      strain.RokIzolacji || "brak danych"
    }</li>
	  <li class="modal-info-item">Kraj pochodzenia: ${
      strain.Kraj || "brak danych"
    }<li class="modal-info-item">
	${
    strain.Genbank // Sprawdź, czy Genbank istnieje
      ? `GenBank: <a class="modal-link" href="https://www.ncbi.nlm.nih.gov/nuccore/${strain.Genbank}" target="_blank">${strain.Genbank}</a>`
      : ""
  }
  </li>
	  <p class="section-header">Warunki hodowli:</p>
	  <li class="modal-info-item">Pożywki: ${
      [strain.Medium1, strain.Medium2, strain.Medium3]
        .filter((medium) => medium) // Filtruje wartości, eliminuje undefined
        .map((medium) =>
          medium
            ? `<a class="modal-link" href="/KKP-MicroStrainSearch/docs/medium/${medium}.pdf" target="_blank">${medium}</a>`
            : ""
        )
        .join(", ") || "brak danych"
    }</li>
	  <li class="modal-info-item">Temperatura: ${
      strain.Temperatura !== undefined
        ? `${strain.Temperatura} °C`
        : "brak danych"
    }</li>
	  <li class="modal-info-item">Wymagania atmosferyczne: ${
      strain.WymaganiaAtmosferyczne || "brak danych"
    }</li>
	`;

  modalStrainInfo.appendChild(modalInfoList);

  // Add Listeners
  modalCloseBtn.addEventListener("click", closeModal);
  window.addEventListener("click", outsideClick);
  document.addEventListener("keydown", onEscKeyDown);
}

function closeModal() {
  modal.style.display = "none";

  // Remove Listeners
  modalCloseBtn.removeEventListener("click", closeModal);
  window.removeEventListener("click", outsideClick);
  document.removeEventListener("keydown", onEscKeyDown);
}

function outsideClick(ev) {
  if (ev.target === modal) {
    closeModal();
  }
}

function onEscKeyDown(ev) {
  if (ev.key === "Escape") {
    closeModal();
  }
}

// Pagination
function disableButton(button) {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
}

function enableButton(button) {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
}

// function displayPagination(totalPages, currentPage) {
// 	paginationNumbers.innerHTML = '';

// 	if (totalPages > 1) {
// 		for (let i = 1; i <= totalPages; i++) {
// 			const button = document.createElement('button');
// 			button.innerText = i;
// 			button.classList.add('pagination-button');
// 			if (i === currentPage) {
// 				button.classList.add('active');
// 			}
// 			button.addEventListener('click', () => {
// 				currentPage = i;
// 				currentDisplayFunction(strainsList, currentPage, resultsPerPage);
// 			});
// 			paginationNumbers.appendChild(button);
// 		}
// 	}

// 	// Disable/Enable prev/next buttons based on current page
// 	if (currentPage === 1) {
// 		disableButton(prevButton);
// 	} else {
// 		enableButton(prevButton);
// 	}

// 	if (currentPage === totalPages) {
// 		disableButton(nextButton);
// 	} else {
// 		enableButton(nextButton);
// 	}
// }

function createPaginationClickHandler(page) {
  return function () {
    currentPage = page;
    currentDisplayFunction(strainsList, currentPage, resultsPerPage);
  };
}

// function displayPagination(totalPages, currentPage) {
// 	paginationNumbers.innerHTML = '';

// 	if (totalPages > 1) {
// 		for (let i = 1; i <= totalPages; i++) {
// 			const button = document.createElement('button');
// 			button.innerText = i;
// 			button.classList.add('pagination-button');
// 			if (i === currentPage) {
// 				button.classList.add('active');
// 			}
// 			button.addEventListener('click', createPaginationClickHandler(i));
// 			paginationNumbers.appendChild(button);
// 		}
// 	}

// 	// Disable/Enable prev/next buttons based on current page
// 	if (currentPage === 1) {
// 		disableButton(prevButton);
// 	} else {
// 		enableButton(prevButton);
// 	}

// 	if (currentPage === totalPages) {
// 		disableButton(nextButton);
// 	} else {
// 		enableButton(nextButton);
// 	}
// }

// function displayPagination(totalPages, currentPage) {
// 	paginationNumbers.innerHTML = '';

// 	if (totalPages > 1) {
// 		let startPage, endPage;

// 		if (totalPages <= 11) {
// 			startPage = 1;
// 			endPage = totalPages;
// 		} else {
// 			if (currentPage <= 6) {
// 				startPage = 1;
// 				endPage = 11;
// 			} else if (currentPage + 5 >= totalPages) {
// 				startPage = totalPages - 10;
// 				endPage = totalPages;
// 			} else {
// 				startPage = currentPage - 5;
// 				endPage = currentPage + 5;
// 			}
// 		}

// 		for (let i = startPage; i <= endPage; i++) {
// 			const button = document.createElement('button');
// 			button.innerText = i;
// 			button.classList.add('pagination-button');
// 			if (i === currentPage) {
// 				button.classList.add('active');
// 			}
// 			button.addEventListener('click', createPaginationClickHandler(i));
// 			paginationNumbers.appendChild(button);
// 		}
// 	}

// 	// Disable/Enable prev/next buttons based on current page
// 	if (currentPage === 1) {
// 		disableButton(prevButton);
// 	} else {
// 		enableButton(prevButton);
// 	}

// 	if (currentPage === totalPages) {
// 		disableButton(nextButton);
// 	} else {
// 		enableButton(nextButton);
// 	}
// }

function displayPagination(totalPages, currentPage) {
  paginationNumbers.innerHTML = "";

  if (totalPages > 1) {
    let startPage, endPage;

    if (totalPages <= 11) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 9; // Obcięcie o 2 strony, aby dodać "..."
      } else if (currentPage + 5 >= totalPages) {
        startPage = totalPages - 8; // Obcięcie o 2 strony, aby dodać "..."
        endPage = totalPages;
      } else {
        startPage = currentPage - 4;
        endPage = currentPage + 4;
      }
    }

    // Dodanie przycisku pierwszej strony, jeśli jeszcze nie został dodany
    if (startPage !== 1) {
      const firstPageButton = document.createElement("button");
      firstPageButton.innerText = "1";
      firstPageButton.classList.add("pagination-button");
      firstPageButton.addEventListener(
        "click",
        createPaginationClickHandler(1)
      );
      paginationNumbers.appendChild(firstPageButton);

      // Dodanie "..." przed pierwszym przyciskiem, jeśli istnieje więcej stron
      if (startPage > 2) {
        const dotsBeforeButton = document.createElement("span");
        dotsBeforeButton.innerText = "...";
        paginationNumbers.appendChild(dotsBeforeButton);
      }
    }

    // Wyświetlenie przycisków paginacji
    for (let i = startPage; i <= endPage; i++) {
      const button = document.createElement("button");
      button.innerText = i;
      button.classList.add("pagination-button");
      if (i === currentPage) {
        button.classList.add("active");
      }
      button.addEventListener("click", createPaginationClickHandler(i));
      paginationNumbers.appendChild(button);
    }

    // Dodanie "..." po ostatnim przycisku, jeśli istnieje więcej stron
    if (endPage < totalPages - 1) {
      const dotsAfterButton = document.createElement("span");
      dotsAfterButton.innerText = "...";
      paginationNumbers.appendChild(dotsAfterButton);
    }

    // Dodanie przycisku ostatniej strony, jeśli jeszcze nie został dodany
    if (endPage !== totalPages) {
      const lastPageButton = document.createElement("button");
      lastPageButton.innerText = totalPages;
      lastPageButton.classList.add("pagination-button");
      lastPageButton.addEventListener(
        "click",
        createPaginationClickHandler(totalPages)
      );
      paginationNumbers.appendChild(lastPageButton);
    }
  }

  // Disable/Enable prev/next buttons based on current page
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (currentPage === totalPages) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
}

nextButton.addEventListener("click", () => {
  currentPage++;
  currentDisplayFunction(strainsList, currentPage, resultsPerPage);
});

prevButton.addEventListener("click", () => {
  currentPage--;
  currentDisplayFunction(strainsList, currentPage, resultsPerPage);
});
