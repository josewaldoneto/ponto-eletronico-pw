const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

const btnBaterPonto = document.getElementById("btn-bater-ponto");
btnBaterPonto.addEventListener("click", register);

const dialogPonto = document.getElementById("dialog-ponto");

const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
})

const dialogData = document.getElementById("dialog-data");
dialogData.textContent = "Data: " + getCurrentDate();

const dialogHora = document.getElementById("dialog-hora");
dialogHora.textContent = "Hora: " + getCurrentHour();

diaSemana.textContent = getWeekDay();
diaMesAno.textContent = getCurrentDate();

function getWeekDay() {
    const date = new Date();
    let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return days[date.getDay()];
}

function getCurrentHour() {
    // Considerar os métodos abaixo para incluir zeros em numeros < 10
    // padStart()
    // slice()
    // formatos de hora considerando o locale do usuário
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0')
}


function getCurrentDate() {
    // Alterar a solução para considerar padStart ou slice
    // Considerar formatos diferentes da data, conforme localização
    // do usuário dd/mm/aaaa, mm/dd/aaaa, aaaa/mm/dd, aaaa.mm.dd
    // Verificar se no Date() há algum método que possa auxiliar
    // locale
    const date = new Date();
    let month = date.getMonth();
    let day = date.getDate();

    return String(day).padStart(2, '0') + "/" + String(month).padStart(2, '0') + "/" + date.getFullYear();
}

function printCurrentHour() {
    horaMinSeg.textContent = getCurrentHour();
}

function register() {
    // Abrir <dialog> com, no mínimo, 4 botões
    dialogPonto.showModal();
}

setInterval(printCurrentHour, 1000);