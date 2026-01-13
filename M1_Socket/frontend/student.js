let mySessionComplaints = [];

document.getElementById("complaintForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const complaint = {
        room: room.value,
        category: category.value,
        description: description.value
    };

    const res = await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(complaint)
    });

    if (res.ok) {
        mySessionComplaints.push(complaint);
        renderMyComplaints();
        e.target.reset();
    }
});

function renderMyComplaints() {
    const div = document.getElementById("myComplaints");
    div.innerHTML = "";

    mySessionComplaints.forEach(c => {
        div.innerHTML += `
            <div class="notice-card">
                <h3>${c.category}</h3>
                <p><b>Room:</b> ${c.room}</p>
                <p>${c.description}</p>
            </div>
        `;
    });
}
