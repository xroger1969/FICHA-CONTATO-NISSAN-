// Função para salvar os contatos no localStorage
function saveContacts() {
    const table = document.getElementById("contacts-table").getElementsByTagName('tbody')[0];
    const rows = Array.from(table.rows).map(row => ({
        name: row.cells[0].innerText,
        email: row.cells[1].innerText,
        phone: row.cells[2].innerText,
        vehicle: row.cells[3].innerText,
        observations: row.cells[4].innerText,
    }));
    localStorage.setItem("contacts", JSON.stringify(rows));
}

// Função para carregar os contatos do localStorage
function loadContacts() {
    const table = document.getElementById("contacts-table").getElementsByTagName('tbody')[0];
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    storedContacts.forEach(contact => {
        const newRow = table.insertRow();
        newRow.insertCell(0).innerText = contact.name;
        newRow.insertCell(1).innerText = contact.email;
        newRow.insertCell(2).innerText = contact.phone;
        newRow.insertCell(3).innerText = contact.vehicle;
        newRow.insertCell(4).innerText = contact.observations;
    });
}

// Função para adicionar um novo contato
function addContact() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const vehicle = document.getElementById("vehicle").value;
    const observations = document.getElementById("observations").value;

    if (name && email && phone) {
        const table = document.getElementById("contacts-table").getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();

        newRow.insertCell(0).innerText = name;
        newRow.insertCell(1).innerText = email;
        newRow.insertCell(2).innerText = phone;
        newRow.insertCell(3).innerText = vehicle;
        newRow.insertCell(4).innerText = observations;

        document.getElementById("contact-form").reset();
        saveContacts();
    } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
    }
}

// Função para exportar a lista para Word
function exportToWord() {
    const table = document.getElementById("contacts-table");
    const rows = Array.from(table.rows);
    let content = `<h1>Ficha de Contato Nissan</h1><table border="1" style="border-collapse:collapse;">`;

    rows.forEach(row => {
        content += "<tr>";
        Array.from(row.cells).forEach(cell => {
            content += `<td style="padding:8px;">${cell.innerText}</td>`;
        });
        content += "</tr>";
    });

    content += "</table>";

    const blob = new Blob(['\ufeff' + content], {
        type: "application/msword"
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Contatos_Nissan.doc";
    link.click();
}

// Função para apagar todos os contatos definitivamente
function deleteAllContacts() {
    const confirmation = confirm("Tem a certeza de que deseja eliminar todos os contactos permanentemente?");
    if (confirmation) {
        const tableBody = document.querySelector("#contacts-table tbody");
        tableBody.innerHTML = ""; // Limpar tabela
        localStorage.removeItem("contacts"); // Limpar localStorage
        alert("Todos os contatos foram eliminados definitivamente.");
    }
}