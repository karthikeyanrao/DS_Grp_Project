const container = document.getElementById("complaints");
const filter = document.getElementById("filter");

async function loadComplaints() {
    const res = await fetch("/complaints");
    const data = await res.json();
    render(data);
}

function render(data) {
    container.innerHTML = "";
    const selected = filter.value;

    data
      .filter(c => selected === "All" || c.category === selected)
      .forEach(c => {
        container.innerHTML += `
            <div class="notice-card">
                <h3>${c.category}</h3>
                <p><b>Room:</b> ${c.room}</p>
                <p>${c.description}</p>
                <small>${c.timestamp}</small>
            </div>
        `;
      });
}

filter.addEventListener("change", loadComplaints);
loadComplaints();
