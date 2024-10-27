const btnBaterPonto = document.getElementById("btn-bater-ponto");
const dialogPonto = document.getElementById("dialog-ponto");
const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");
const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");
const btnDialogFechar = document.getElementById("btn-dialog-fechar");

const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");
diaSemana.textContent = getWeekDay();
diaMesAno.textContent = getCurrentDate();
updateClock();

function updateClock() {
    horaMinSeg.textContent = getCurrentHour();
    setTimeout(updateClock, 1000);
}

btnBaterPonto.addEventListener("click", () => {
    dialogPonto.showModal();
    document.getElementById("dialog-data").textContent = `Data: ${getCurrentDate()}`;
    document.getElementById("dialog-hora").textContent = `Hora: ${getCurrentHour()}`;
    document.getElementById("dialog-last-register").textContent = `Último registro: ${localStorage.getItem("lastDateRegister") || "N/A"}`;
});

btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

const btnVerRelatorio = document.getElementById("btn-ver-relatorio");

btnVerRelatorio.addEventListener("click", () => {
    window.location.href = "relatorio.html";
});

function showAlert(message, type) {
    divAlertaRegistroPonto.querySelector("p").textContent = message;
    divAlertaRegistroPonto.style.backgroundColor = type === "success" ? "green" : "red";
    divAlertaRegistroPonto.classList.add("show");

    setTimeout(() => {
        divAlertaRegistroPonto.classList.remove("show");
    }, 3000);
}

btnDialogBaterPonto.addEventListener("click", saveRegister);

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position.coords),
                (error) => reject(error)
            );
        } else {
            reject(new Error("Geolocation not supported by this browser."));
        }
    });
}

async function saveRegister() {
    const registerType = document.getElementById("tipos-ponto").value;
    const observacao = document.getElementById("observacao").value;
    const justificativa = document.getElementById("arquivo-justificativa").files[0] || null;

    let location;
    try {
        location = await getCurrentPosition();
    } catch (error) {
        console.error("Erro ao obter localização:", error);
        showAlert("Erro: Não foi possível obter a localização.", "error");
        return;
    }

    const pontoData = {
        "data": getCurrentDate(),
        "hora": getCurrentHour(),
        "localizacao": location ? `Lat: ${location.latitude}, Lng: ${location.longitude}` : "Localização indisponível",
        "tipo": registerType,
        "observacao": observacao,
        "justificativa": justificativa ? justificativa.name : "",
        "id": Date.now()
    };

    saveRegisterLocalStorage(pontoData);
    showAlert("Ponto registrado com sucesso!", "success");

    localStorage.setItem("lastTypeRegister", registerType);
    localStorage.setItem("lastDateRegister", pontoData.data);
    localStorage.setItem("lastTimeRegister", pontoData.hora);

    dialogPonto.close();
}

function getWeekDay() {
    const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return days[new Date().getDay()];
}

function getCurrentHour() {
    const date = new Date();
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function getCurrentDate() {
    return new Date().toLocaleDateString("pt-BR");
}

function saveRegisterLocalStorage(register) {
    const registerList = getRegisterLocalStorage();
    registerList.push(register);
    localStorage.setItem("register", JSON.stringify(registerList));
}

function getRegisterLocalStorage() {
    return JSON.parse(localStorage.getItem("register")) || [];
}