import data from "./data/pn27.json";

function performSearch() {
  const input = document.getElementById("search-input").value.toLowerCase();
  const result = data.find((item) => item.code === input);

  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = "";

  if (result) {
    const name = document.createElement("p");
    name.textContent = result.name;

    console.log(result);

    const img = document.createElement("img");
    img.src = result.URL;
    img.alt = result.name;
    img.className = "result-image";

    const downloadButton = document.createElement("a");
    downloadButton.href = result.URL;
    downloadButton.download = result.name;
    downloadButton.textContent = "Pobierz obraz";
    downloadButton.className = "download-button";

    resultContainer.appendChild(name);
    resultContainer.appendChild(img);
    resultContainer.appendChild(downloadButton);
  } else {
    resultContainer.textContent = "Nie znaleziono wyniku.";
  }
}

document
  .getElementById("search-button")
  .addEventListener("click", performSearch);

document
  .getElementById("search-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      performSearch();
    }
  });
