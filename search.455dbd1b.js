!function(){var o={};o=JSON.parse('{"strains":[{"strain":"Bacillus subtilis","no":"VN2351","isolation":{"year":"2020","place":"Laboratory A"},"growthConditions":{"temperature":"37\xb0C","conditions":"aerobic"}},{"strain":"Escherichia coli","no":"VN4823","isolation":{"year":"2018","place":"Hospital B"},"growthConditions":{"temperature":"30\xb0C","conditions":"anaerobic"}},{"strain":"Staphylococcus aureus","no":"VN1135","isolation":{"year":"2021","place":"Research Facility C"},"growthConditions":{"temperature":"25\xb0C","conditions":"aerobic"}},{"strain":"Pseudomonas aeruginosa","no":"VN7462","isolation":{"year":"2019","place":"Laboratory D"},"growthConditions":{"temperature":"37\xb0C","conditions":"anaerobic"}},{"strain":"Saccharomyces cerevisiae","no":"VN6715","isolation":{"year":"2017","place":"Hospital E"},"growthConditions":{"temperature":"30\xb0C","conditions":"aerobic"}},{"strain":"Lactobacillus acidophilus","no":"VN9124","isolation":{"year":"2022","place":"Laboratory F"},"growthConditions":{"temperature":"35\xb0C","conditions":"aerobic"}},{"strain":"Mycobacterium tuberculosis","no":"VN3856","isolation":{"year":"2019","place":"Hospital G"},"growthConditions":{"temperature":"37\xb0C","conditions":"aerobic"}},{"strain":"Aspergillus niger","no":"VN5672","isolation":{"year":"2021","place":"Research Facility H"},"growthConditions":{"temperature":"28\xb0C","conditions":"aerobic"}},{"strain":"Salmonella enterica","no":"VN7381","isolation":{"year":"2018","place":"Laboratory I"},"growthConditions":{"temperature":"42\xb0C","conditions":"anaerobic"}},{"strain":"Penicillium chrysogenum","no":"VN2468","isolation":{"year":"2020","place":"Hospital J"},"growthConditions":{"temperature":"25\xb0C","conditions":"aerobic"}},{"strain":"Streptococcus pyogenes","no":"VN5839","isolation":{"year":"2022","place":"Laboratory K"},"growthConditions":{"temperature":"37\xb0C","conditions":"aerobic"}},{"strain":"Neisseria meningitidis","no":"VN7243","isolation":{"year":"2019","place":"Hospital L"},"growthConditions":{"temperature":"35\xb0C","conditions":"aerobic"}},{"strain":"Yersinia pestis","no":"VN9265","isolation":{"year":"2021","place":"Research Facility M"},"growthConditions":{"temperature":"28\xb0C","conditions":"anaerobic"}},{"strain":"Candida albicans","no":"VN4376","isolation":{"year":"2018","place":"Laboratory N"},"growthConditions":{"temperature":"37\xb0C","conditions":"aerobic"}},{"strain":"Bacillus anthracis","no":"VN6512","isolation":{"year":"2020","place":"Hospital O"},"growthConditions":{"temperature":"25\xb0C","conditions":"anaerobic"}},{"strain":"Clostridium difficile","no":"VN8187","isolation":{"year":"2022","place":"Laboratory P"},"growthConditions":{"temperature":"37\xb0C","conditions":"anaerobic"}},{"strain":"Mycobacterium leprae","no":"VN2935","isolation":{"year":"2019","place":"Hospital Q"},"growthConditions":{"temperature":"33\xb0C","conditions":"aerobic"}},{"strain":"Escherichia coli","no":"VN6719","isolation":{"year":"2021","place":"Research Facility R"},"growthConditions":{"temperature":"37\xb0C","conditions":"aerobic"}},{"strain":"Streptococcus pneumoniae","no":"VN4392","isolation":{"year":"2018","place":"Laboratory S"},"growthConditions":{"temperature":"35\xb0C","conditions":"aerobic"}},{"strain":"Aspergillus fumigatus","no":"VN5234","isolation":{"year":"2020","place":"Hospital T"},"growthConditions":{"temperature":"28\xb0C","conditions":"aerobic"}},{"strain":"Escherichia coli","no":"VN1234","isolation":{"year":"2022","place":"Laboratory U"},"growthConditions":{"temperature":"37\xb0C","conditions":"aerobic"}},{"strain":"Escherichia coli","no":"VN5678","isolation":{"year":"2019","place":"Hospital V"},"growthConditions":{"temperature":"35\xb0C","conditions":"aerobic"}},{"strain":"Escherichia coli","no":"VN9101","isolation":{"year":"2021","place":"Research Facility W"},"growthConditions":{"temperature":"37\xb0C","conditions":"anaerobic"}},{"strain":"Escherichia coli DH5alpha","no":"VN1123","isolation":{"year":"2018","place":"Laboratory X"},"growthConditions":{"temperature":"35\xb0C","conditions":"anaerobic"}},{"strain":"Aspergillus flavus","no":"VN4567","isolation":{"year":"2022","place":"Laboratory Y"},"growthConditions":{"temperature":"28\xb0C","conditions":"aerobic"}},{"strain":"Aspergillus niger","no":"VN8910","isolation":{"year":"2019","place":"Hospital Z"},"growthConditions":{"temperature":"25\xb0C","conditions":"aerobic"}},{"strain":"Aspergillus fumigatus","no":"VN1112","isolation":{"year":"2021","place":"Research Facility AA"},"growthConditions":{"temperature":"30\xb0C","conditions":"aerobic"}},{"strain":"Candida albicans","no":"VN1314","isolation":{"year":"2020","place":"Laboratory BB"},"growthConditions":{"temperature":"37\xb0C","conditions":"aerobic"}},{"strain":"Candida glabrata","no":"VN1516","isolation":{"year":"2019","place":"Hospital CC"},"growthConditions":{"temperature":"35\xb0C","conditions":"aerobic"}},{"strain":"Bacillus cereus","no":"VN1920","isolation":{"year":"2021","place":"Research Facility DD"},"growthConditions":{"temperature":"30\xb0C","conditions":"aerobic"}},{"strain":"Bacillus thuringiensis","no":"VN2122","isolation":{"year":"2020","place":"Laboratory EE"},"growthConditions":{"temperature":"37\xb0C","conditions":"aerobic"}},{"strain":"Bacillus megaterium","no":"VN2324","isolation":{"year":"2019","place":"Hospital FF"},"growthConditions":{"temperature":"35\xb0C","conditions":"aerobic"}},{"strain":"Bacillus licheniformis","no":"VN2526","isolation":{"year":"2022","place":"Research Facility GG"},"growthConditions":{"temperature":"28\xb0C","conditions":"aerobic"}}]}');let i=o.strains;console.log(i);let e=document.getElementById("searchInput"),t=document.getElementById("searchForm"),n=document.getElementById("searchBtn"),a=document.getElementById("strainsContainer"),r=document.getElementById("modal");document.getElementById("modalContent");let s=document.getElementById("modalStrainInfo"),c=document.querySelector(".close");function l(){let o=e.value.trim().toLowerCase();console.log(o);let i=d(o);a.innerHTML="",i.forEach(o=>{let i=document.createElement("div");i.classList.add("strain");let e=document.createElement("p");e.textContent=`${o.strain} ${o.no}`,e.classList.add("strain-info"),i.appendChild(e),i.addEventListener("click",()=>{(function(o){r.style.display="block",s.innerHTML="";let i=document.createElement("h2");i.textContent=`${o.strain} ${o.no}`,s.appendChild(i);let e=document.createElement("ul"),t=o.isolation;if(t){let o=document.createElement("li");o.textContent=`Isolation Year: ${t.year}, Place: ${t.place}`,e.appendChild(o)}let n=o.growthConditions;if(n){let o=document.createElement("li");o.textContent=`Growth Temperature: ${n.temperature}, Conditions: ${n.conditions}`,e.appendChild(o)}s.appendChild(e),// Add Listeners
c.addEventListener("click",p),window.addEventListener("click",u),document.addEventListener("keydown",b)})(o)}),a.appendChild(i)})}function d(o){let e=i.filter(i=>{let e=i.strain.trim().toLowerCase(),t=i.no.trim().toLowerCase();return e.includes(o)||t.includes(o)});return e}function p(){r.style.display="none",// Remove Listeners
c.removeEventListener("click",p),window.removeEventListener("click",u),document.removeEventListener("keydown",b)}function u(o){o.target===r&&p()}function b(o){"Escape"===o.key&&p()}n.addEventListener("click",o=>{o.preventDefault(),l()}),t.addEventListener("submit",o=>{o.preventDefault(),l()}),console.log(d("bacillus"))}();//# sourceMappingURL=search.455dbd1b.js.map

//# sourceMappingURL=search.455dbd1b.js.map