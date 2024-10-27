const listaRegistros = document.getElementById("lista-registros");
const filtroSemana = document.getElementById("filtro-semana");
const filtroMes = document.getElementById("filtro-mes");
const btnVoltarInicio = document.getElementById("btn-voltar-inicio");

btnVoltarInicio.addEventListener("click", () => {
    window.location.href = "index.html";
});


filtroSemana.addEventListener("click", () => displayRegisters(filterByPeriod("week")));
filtroMes.addEventListener("click", () => displayRegisters(filterByPeriod("month")));

function displayRegisters(records) {
    listaRegistros.innerHTML = records.map(record => `
        <div class="registro">
            <p>${record.data} - ${record.hora} | Tipo: ${record.tipo}</p>
            <p>Obs: ${record.observacao}</p>
            <button onclick="editRecord(${record.id})">Editar</button>
            <button onclick="deleteAlert()">Excluir</button>
        </div>
    `).join("");
}

function filterByPeriod(period) {
    const today = new Date();
    return getRegisterLocalStorage().filter(record => {
        const recordDate = new Date(record.data);
        return period === "week" 
            ? recordDate >= new Date(today.setDate(today.getDate() - 7)) 
            : recordDate >= new Date(today.setMonth(today.getMonth() - 1));
    });
}

function editRecord(id) {
    const records = getRegisterLocalStorage();
    const record = records.find(rec => rec.id === id);
    if (record && record.editavel) {
        record.observacao = prompt("Nova observação:", record.observacao);
        saveRegisterLocalStorage(records);
        displayRegisters(records);
    }
}

function deleteAlert() {
    alert("O ponto não pode ser excluído!");
}

function getRegisterLocalStorage() {
    return JSON.parse(localStorage.getItem("register")) || [];
}

function saveRegisterLocalStorage(records) {
    localStorage.setItem("register", JSON.stringify(records));
}

displayRegisters(getRegisterLocalStorage());
