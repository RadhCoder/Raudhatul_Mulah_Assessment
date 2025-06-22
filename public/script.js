document.addEventListener("DOMContentLoaded", () => {
  fetch("/data")
    .then(res => res.json())
    .then(({ table1, table2 }) => {
      const table1El = document.getElementById("table1");
      table1.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${row.id}</td><td>${row.value}</td>`;
        table1El.appendChild(tr);
      });

      document.getElementById("alpha").textContent = table2.alpha;
      document.getElementById("beta").textContent = table2.beta;
      document.getElementById("charlie").textContent = table2.charlie;
    })
    .catch(err => {
      console.error("Error loading data:", err);
    });
});
