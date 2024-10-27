const listaRegistros = document.getElementById("lista-registros");
const filtroSemana = document.getElementById("filtro-semana");
const filtroMes = document.getElementById("filtro-mes");
const btnVoltarInicio = document.getElementById("btn-voltar-inicio");
let currentEditId = null;

const editDialog = document.getElementById("edit-dialog");
const editDate = document.getElementById("edit-data");
const editTipo = document.getElementById("edit-tipo");
const editObservacao = document.getElementById("edit-observacao");
const saveEditBtn = document.getElementById("save-edit-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");

btnVoltarInicio.addEventListener("click", () => {
    window.location.href = "index.html";
});


filtroSemana.addEventListener("click", () => {
    const records = getRegisterLocalStorage();
    const filteredRecords = filterByWeek(records);
    displayRegisters(filteredRecords);
});

filtroMes.addEventListener("click", () => {
    const records = getRegisterLocalStorage();
    const filteredRecords = filterByMonth(records);
    displayRegisters(filteredRecords);
});

function displayRegisters(records) {
    listaRegistros.innerHTML = records.map(record => `
        <div class="registro">
            <p>${record.data} - ${record.hora} | Tipo: ${record.tipo}
                ${record.dataAlterada ? '<span class="data-modificada"> (Data Modificada)</span>' : ''}
                ${record.edited ? '<span class="editado">(Registro editado)</span>' : ''}
            <p>Obs: ${record.observacao}</p>
            ${record.justificativa ? 
                `<a href="${record.justificativa}" download="${record.justificativaNome}">Download Justificativa</a>` 
                : '<p>No file uploaded.</p>'}
            <button onclick="editRecord(${record.id})">Editar</button>
            <button onclick="deleteRecord(${record.id})">Excluir</button>
        </div>
    `).join("");
}

function filterByWeek(records) {
    const dateAWeekAgo = getDateAWeekAgo();
    return records.filter(record => {
        const recordDate = new Date(record.data.split('/').reverse().join('-'));
        const weekAgoDate = new Date(dateAWeekAgo.split('/').reverse().join('-'));
        return recordDate >= weekAgoDate;
    });
}

function filterByMonth(records) {
    const dateAMonthAgo = getDateAMonthAgo();
    return records.filter(record => {
        const recordDate = new Date(record.data.split('/').reverse().join('-'));
        const monthAgoDate = new Date(dateAMonthAgo.split('/').reverse().join('-'));
        return recordDate >= monthAgoDate;
    });
}

function editRecord(id) {
    const records = getRegisterLocalStorage();
    const record = records.find(rec => rec.id === id);

    if (record) {
        currentEditId = id;

        const editDateInput = document.getElementById("edit-data");
        editDateInput.value = record.data.split('/').reverse().join('-');
        editDateInput.setAttribute("max", getTodayDate());

        document.getElementById("edit-tipo").value = record.tipo;
        document.getElementById("edit-observacao").value = record.observacao;

        editDialog.showModal();
    }
}

function deleteRecord(id) {
    const confirmDelete = confirm("Tem certeza que deseja excluir este registro?");

    if (confirmDelete) {
        const records = getRegisterLocalStorage();
        const updatedRecords = records.filter(record => record.id !== id);

        saveRegisterLocalStorage(updatedRecords);

        displayRegisters(updatedRecords);
    }
}


saveEditBtn.addEventListener("click", () => {
    if (currentEditId === null) return;

    const records = getRegisterLocalStorage();
    const recordIndex = records.findIndex(rec => rec.id === currentEditId);

    if (recordIndex !== -1) {
        const newDate = editDate.value.split('-').reverse().join('/');
        const newTipo = editTipo.value;
        const newObservacao = editObservacao.value;

        records[recordIndex].data = newDate;
        records[recordIndex].tipo = newTipo;
        records[recordIndex].observacao = newObservacao;
        records[recordIndex].edited = true;

        saveRegisterLocalStorage(records);
        displayRegisters(records);
        editDialog.close();
        currentEditId = null;
    }
});

cancelEditBtn.addEventListener("click", () => {
    editDialog.close();
    currentEditId = null;
});


function deleteAlert() {
    alert("O ponto não pode ser excluído!");
}

function getRegisterLocalStorage() {
    return JSON.parse(localStorage.getItem("register")) || [];
}

function saveRegisterLocalStorage(records) {
    localStorage.setItem("register", JSON.stringify(records));
}

function getCurrentDate() { // Retorna a data atual no padrão dd/mm/yyyy
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function getTodayDate() { // Retorna a data atual no padrão yyyy-mm-dd
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getDateAWeekAgo() {
    const today = new Date();
    today.setDate(today.getDate() - 7);
    return formatDate(today);
}

function getDateAMonthAgo() {
    const today = new Date();
    today.setMonth(today.getMonth() - 1);
    return formatDate(today);
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

displayRegisters(getRegisterLocalStorage());