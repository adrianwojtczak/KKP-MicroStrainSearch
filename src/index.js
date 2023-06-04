import * as strainsData from "./data/strains.JSON";

const strainsList = strainsData.strains;

console.log(strainsList);

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const strainsContainer = document.getElementById("strainsContainer");

searchBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  const searchValue = searchInput.value.trim().toLowerCase();
  console.log(searchValue);

  const filteredStrains = searchStrains(searchValue);
  displayStrains(filteredStrains);
});

function searchStrains(searchTerm) {
  const filteredStrains = strainsList.filter((strain) => {
    const strainName = strain.strain.trim().toLowerCase();
    const strainNo = strain.no.trim().toLowerCase();
    return strainName.includes(searchTerm) || strainNo.includes(searchTerm);
  });
  return filteredStrains;
}

console.log(searchStrains("bacillus"));

function displayStrains(strains) {
  strainsContainer.innerHTML = "";

  strains.forEach((strain) => {
    const strainEl = document.createElement("div");

    for (const key in strain) {
      const value = strain[key];

      if (typeof value === "object") {
        const nestedDiv = document.createElement("div");
        strainEl.style.backgroundColor = "#f2f2f2";
        strainEl.style.marginBottom = "10px";

        for (const nestedKey in value) {
          const nestedValue = value[nestedKey];
          const nestedKeyValueEl = document.createElement("p");
          nestedKeyValueEl.textContent = `${nestedKey}: ${nestedValue}`;
          nestedDiv.appendChild(nestedKeyValueEl);
        }

        strainEl.appendChild(nestedDiv);
      } else {
        const keyValueEl = document.createElement("p");
        keyValueEl.textContent = `${key}: ${value}`;
        strainEl.appendChild(keyValueEl);
      }
    }

    strainsContainer.appendChild(strainEl);
  });
}
