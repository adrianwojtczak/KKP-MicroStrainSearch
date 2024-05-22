!function(){// Data docelowa
let e=new Date("2024-05-23T14:30:59").getTime(),n=setInterval(function(){// Obecna data i czas
let t=new Date().getTime(),a=e-t;// Wyświetlanie wyników w odpowiednich elementach HTML
document.getElementById("days").innerText=Math.floor(a/864e5),document.getElementById("hours").innerText=Math.floor(a%864e5/36e5),document.getElementById("minutes").innerText=Math.floor(a%36e5/6e4),document.getElementById("seconds").innerText=Math.floor(a%6e4/1e3),a<0&&(clearInterval(n),document.getElementById("countdown").innerHTML='<span class="quote">Oszukiwanie może przynieść chwilowe korzyści, ale prawdziwe wartości i osiągnięcia wymagają cierpliwości i czasu. Pamiętaj, że na najważniejsze rzeczy w życiu warto poczekać.</span>')},1e3)}();//# sourceMappingURL=pn27.890a286a.js.map

//# sourceMappingURL=pn27.890a286a.js.map
