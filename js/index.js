const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

const btnBaterPonto = document.getElementById("btn-bater-ponto");
btnBaterPonto.addEventListener("click", register);

const btnRegistrarAusencia = document.getElementById("btn-registrar-ausencia");
btnRegistrarAusencia.addEventListener("click", showAbsenceDialog);

const dialogPonto = document.getElementById("dialog-ponto");
const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

const dialogAusencia = document.getElementById("dialog-ausencia");
const btnDialogFecharAusencia = document.getElementById("btn-dialog-fechar-ausencia");
btnDialogFecharAusencia.addEventListener("click", () => {
    dialogAusencia.close();
});

const btnDialogRegistrarAusencia = document.getElementById("btn-dialog-registrar-ausencia");
btnDialogRegistrarAusencia.addEventListener("click", registerAbsence);

const dialogData = document.getElementById("dialog-data");
const dialogHora = document.getElementById("dialog-hora");
const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");

diaSemana.textContent = getWeekDay();
diaMesAno.textContent = getCurrentDate();
printCurrentHour();
setInterval(printCurrentHour, 1000);

let registerLocalStorage = getRegisterLocalStorage();

function register() {
    dialogData.textContent = "Data: " + getCurrentDate();
    dialogHora.textContent = "Hora: " + getCurrentHour();
    
    let lastRegisterText = "Último registro: " + localStorage.getItem("lastDateRegister") + " - " + localStorage.getItem("lastTimeRegister") + " | " + localStorage.getItem("lastTypeRegister");
    document.getElementById("dialog-last-register").textContent = lastRegisterText;

    dialogPonto.showModal();
}

function showAbsenceDialog() {
    dialogAusencia.showModal();
}

function registerAbsence() {
    const justificativa = document.getElementById("justificativa").value;
    const uploadFile = document.getElementById("upload-file").files[0];
    
    if (!justificativa) {
        alert("Por favor, insira uma justificativa.");
        return;
    }

    let absence = {
        "data": getCurrentDate(),
        "hora": getCurrentHour(),
        "justificativa": justificativa,
        "file": uploadFile ? uploadFile.name : null
    };

    saveAbsenceLocalStorage(absence);
    dialogAusencia.close();
    showAlert("Ausência registrada com sucesso!", "success");
}

function showAlert(message, type) {
    divAlertaRegistroPonto.querySelector("p").textContent = message;
    divAlertaRegistroPonto.classList.remove("hidden");
    divAlertaRegistroPonto.classList.add("show");
    
    if (type === "error") {
        divAlertaRegistroPonto.querySelector("p").style.backgroundColor = "rgb(255, 0, 0)";
    } else {
        divAlertaRegistroPonto.querySelector("p").style.backgroundColor = "rgb(0, 255, 0)";
    }

    setTimeout(() => {
        divAlertaRegistroPonto.classList.remove("show");
        divAlertaRegistroPonto.classList.add("hidden");
    }, 5000);
}

function saveAbsenceLocalStorage(absence) {
    let absences = getAbsenceLocalStorage();
    absences.push(absence);
    localStorage.setItem("absences", JSON.stringify(absences));
}

function getAbsenceLocalStorage() {
    let absences = localStorage.getItem("absences");
    return absences ? JSON.parse(absences) : [];
}

function saveRegisterLocalStorage(register) {
    registerLocalStorage.push(register);
    localStorage.setItem("register", JSON.stringify(registerLocalStorage));
}

function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");
    return registers ? JSON.parse(registers) : [];
}

function getWeekDay() {
    const today = new Date();
    return today.toLocaleString("pt-BR", { weekday: 'long' });
}

function getCurrentDate() {
    const today = new Date();
    return today.toLocaleDateString("pt-BR");
}

function getCurrentHour() {
    const today = new Date();
    return today.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function printCurrentHour() {
    horaMinSeg.textContent = getCurrentHour();
}