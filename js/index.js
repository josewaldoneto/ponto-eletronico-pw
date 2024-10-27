const btnBaterPonto = document.getElementById("btn-bater-ponto");
const dialogPonto = document.getElementById("dialog-ponto");
const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");
const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");
const btnDialogFechar = document.getElementById("btn-dialog-fechar");
const dataInput = document.getElementById("data-ponto");

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

function DDMMYYYY(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}

btnBaterPonto.addEventListener("click", () => {
    dialogPonto.showModal();
    
    document.getElementById("dialog-data").textContent = `Data: ${getCurrentDate()}`;
    document.getElementById("dialog-hora").textContent = `Hora: ${getCurrentHour()}`;

    const dataInput = document.getElementById("data-ponto");
    dataInput.setAttribute("max", getTodayDate());

    const lastRegisterDate = localStorage.getItem("lastDateRegister") || "N/A";
    const lastRegisterType = localStorage.getItem("lastTypeRegister") || "N/A";
    document.getElementById("dialog-last-register").textContent = `Último registro: ${lastRegisterDate} - ${lastRegisterType}`;
});

btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

const btnVerRelatorio = document.getElementById("btn-ver-relatorio");

btnVerRelatorio.addEventListener("click", () => {
    window.location.href = "relatorio.html";
});

function showAlert(message, type) {
    const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");
    const alertMessage = divAlertaRegistroPonto.querySelector("p");

    alertMessage.textContent = message;
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
    const selectedDate = dataInput.value ? DDMMYYYY(dataInput.value) : getCurrentDate();
    const registerType = document.getElementById("tipos-ponto").value;
    const observacao = document.getElementById("observacao").value;
    const justificativa = document.getElementById("arquivo-justificativa").files[0] || null;
    const dataAlterada = selectedDate !== getCurrentDate();

    let fileData = null;
    if (justificativa) {
        fileData = await getFileData(justificativa);
    }

    let location;
    try {
        location = await getCurrentPosition();
    } catch (error) {
        console.error("Erro ao obter localização:", error);
        showAlert("Erro: Não foi possível obter a localização.", "error");
        dialogPonto.close();
        return;
    }

    const pontoDados = {
        "data": selectedDate,
        "hora": getCurrentHour(),
        "localizacao": location ? `Lat: ${location.latitude}, Lng: ${location.longitude}` : "Localização indisponível",
        "tipo": registerType,
        "observacao": observacao,
        "justificativa": fileData,
        "justificativaNome": justificativa ? justificativa.name : "",
        "id": Date.now(),
        "dataAlterada": dataAlterada
    };

    saveRegisterLocalStorage(pontoDados);
    showAlert("Ponto registrado com sucesso!", "success");

    localStorage.setItem("lastTypeRegister", registerType);
    localStorage.setItem("lastDateRegister", pontoDados.data);
    localStorage.setItem("lastTimeRegister", pontoDados.hora);

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


function saveRegisterLocalStorage(register) {
    const registerList = getRegisterLocalStorage();
    registerList.push(register);
    localStorage.setItem("register", JSON.stringify(registerList));
}

function getRegisterLocalStorage() {
    return JSON.parse(localStorage.getItem("register")) || [];
}

function getFileData(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}