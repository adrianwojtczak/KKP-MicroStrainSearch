// Data docelowa
const eventDate = new Date("2024-05-23T14:30:59").getTime();

// Aktualizacja licznika co sekundę
const countdownInterval = setInterval(function () {
  // Obecna data i czas
  const now = new Date().getTime();

  // Różnica między datą docelową a obecną datą
  const distance = eventDate - now;

  // Obliczanie dni, godzin, minut i sekund
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Wyświetlanie wyników w odpowiednich elementach HTML
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  // Jeśli odliczanie skończy się, wyświetl wiadomość
  if (distance < 0) {
    clearInterval(countdownInterval);
    document.getElementById("countdown").innerHTML =
      '<span class="quote">Oszukiwanie może przynieść chwilowe korzyści, ale prawdziwe wartości i osiągnięcia wymagają cierpliwości i czasu. Pamiętaj, że na najważniejsze rzeczy w życiu warto poczekać.</span>';
  }
}, 1000);
