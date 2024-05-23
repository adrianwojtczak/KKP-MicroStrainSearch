import data from "./data/pn27.json";

document.getElementById("search-button").addEventListener("click", function () {
  const input = document.getElementById("search-input").value;
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

    resultContainer.appendChild(name);
    resultContainer.appendChild(img);
  } else {
    resultContainer.textContent = "Nie znaleziono wyniku.";
  }
});
