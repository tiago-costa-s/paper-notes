//Seletores

// elementos
const boardElement = document.querySelector("#board");
const colors = document.querySelector(".colors");
// botões
const createNoteBtn = document.querySelector("#create");
const textarea = document.querySelector("textarea");

const colorsBtn = document.querySelectorAll("#add-colors li");
const colorsPen = document.querySelectorAll("#pen-colors li");

//Funções

function atencao() {
    const h3 = document.querySelector("#board-notification");
    const notes = getNoteLs();
    if (notes.length == 0) {
        h3.style.display = "flex";
        console.log(notes)
    } else {
        h3.style.display = "none";
    }
};

window.addEventListener("load", () => {
    atencao();
})

//exibe as notas criadas
function showNotes() {
    cleanNotes();

    getNoteLs().forEach((note) => {
        const noteElement = createNote(note.id, note.content, note.color, note.pen, note.fixed);

        boardElement.appendChild(noteElement);
    })
};

//limpa notas
function cleanNotes() {
    boardElement.replaceChildren([]);
};

//adicionar o objeto nota
function addNote(id, content, color, pen, fixed) {

    const notes = getNoteLs();

    const noteObject = {
        id: genereteId(),
        content: "",
        color: addColor(),
        pen: addColorPen(),
        fixed: false,
    };

    const noteElement = createNote(noteObject.id, noteObject.content, noteObject.color, noteObject.pen);

    boardElement.appendChild(noteElement);

    notes.push(noteObject);

    saveNotesLs(notes);
    atencao();
};

//gera o id
function genereteId() {
    const id = Math.floor(Math.random() * 5000);
    return id;
};

// seleciona a cor da nota
let selected;
let colorSelected = "orange";

colorsBtn.forEach((btn) => {

    btn.addEventListener("click", (e) => {
        //retira a classe selected
        colorsBtn.forEach((btn) => {
            btn.querySelector(".color").classList.remove("selected")
        });
        //adiciona a classe selected
        btn.querySelector(".color").classList.add("selected");
        selected = e.target;
        colorSelected = selected.id;
    });
});

//recebe a cor da nota
function addColor() {
    let color = colorSelected;

    switch (color) {
        case "orange":
            color = "orange-class";
            break;
        case "green":
            color = "green-class";
            break;
        case "yellow":
            color = "yellow-class";
            break;
        case "blue":
            color = "blue-class";
            break;
        case "red":
            color = "red-class";
            break;
        case "pink":
            color = "pink-class";
            break;
        default:
            color = "orange";
    }
    return color;
};

// seleciona a cor da caneta
let penColorSelected;
let selectedColorPen = "blue-Pen";

colorsPen.forEach((pen) => {

    pen.addEventListener("click", (e) => {
        colorsPen.forEach((pen) => {
            pen.querySelector(".bi-pencil-fill").classList.remove("selected-pen");
        });

        pen.querySelector(".bi-pencil-fill").classList.add("selected-pen");

        penColorSelected = e.target;
        selectedColorPen = penColorSelected.id;
    })
});

//recebe a cor da caneta
function addColorPen() {
    let color = selectedColorPen;

    if (color == "blue-pen") {
        color = "blue-pen-class";
    }

    if (color == "black-pen") {
        color = "black-pen-class";
    }

    if (color == "red-pen") {
        color = "red-pen-class";
    }

    if (color == "light-blue-pen") {
        color = "light-blue-pen-class";
    }

    return color;
};

addColorPen();

//cria o elemento note
function createNote(id, content, color, pen, fixed) {

    const noteElement = document.createElement("div");
    noteElement.classList.add(`note`, `${color}`);

    const textarea = document.createElement("textarea");
    textarea.classList.add(`${pen}`);
    textarea.value = content;
    textarea.placeholder = "Adicione um texto...";

    noteElement.appendChild(textarea);

    const pinIcon = document.createElement("i");
    pinIcon.classList.add(...["bi", "bi-pin-fill"]);
    noteElement.appendChild(pinIcon);

    const xCircleIcon = document.createElement("i");
    xCircleIcon.classList.add(...["bi", "bi-x-circle-fill"]);

    noteElement.appendChild(xCircleIcon);

    if (fixed) {
        noteElement.classList.add("note", "fixed");
    }

    //Eventos do elemento 
    //remove nota
    noteElement.querySelector(".bi-x-circle-fill").addEventListener("click", () => {
        removeNoteLs(id, noteElement);
        atencao()
    });

    //fixa nota
    noteElement.querySelector(".bi-pin-fill").addEventListener("click", () => {
        fixedNoteLs(id);
    });

    //insere o texto a nota
    noteElement.querySelector("textarea").addEventListener("keyup", (e) => {
        const noteContent = e.target.value;

        insertText(id, noteContent);
    });

    return noteElement;
};

//insere o texto a nota
function insertText(id, newContent) {
    const notes = getNoteLs();

    const targetNote = notes.filter((note) => note.id === id)[0];
    targetNote.content = newContent;

    saveNotesLs(notes);
};

//fixar a nota 
function fixedNoteLs(id) {
    const notesFixed = getNoteLs();

    const targetNotesFixed = notesFixed.filter((note) => note.id === id)[0];
    targetNotesFixed.fixed = !targetNotesFixed.fixed;

    saveNotesLs(notesFixed);

    showNotes();
};

//Eventos
createNoteBtn.addEventListener("click", () => {
    addNote();
});

//Localstorage
//Adiciona a nota na localstorage
function saveNotesLs(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
};

//pega a nota na localstorage
function getNoteLs() {
    const notesLs = JSON.parse(localStorage.getItem("notes") || "[]");

    return notesLs;
};

//remove a nota da localstorage e no doom
function removeNoteLs(id, element) {
    const notes = getNoteLs().filter((note) => note.id !== id);

    saveNotesLs(notes);

    boardElement.removeChild(element);
};

getNoteLs();

//start aplication
showNotes(); 
