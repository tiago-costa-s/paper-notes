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

//exibe as notas criadas
function showNotes() {

    getNoteLs().forEach((note) => {

        const noteElement = createNote(note.id, note.content, note.color, note.pen, note.fixed);

        boardElement.appendChild(noteElement);
    })
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
    console.log(noteObject);

    const noteElement = createNote(noteObject.id, noteObject.content, noteObject.color, noteObject.pen);

    boardElement.appendChild(noteElement);

    notes.push(noteObject);

    console.log(notes);

    saveNotesLs(notes);
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

        // console.log(colorSelected);
    });
});

//recebe a cor da nota
function addColor() {
    let color = colorSelected;

    if (color == "orange") {
        color = "orange-class";
    }

    if (color == "green") {
        color = "green-class";
    }

    if (color == "yellow") {
        color = "yellow-class";
    }

    if (color == "blue") {
        color = "blue-class"
    }

    if (color == "red") {
        color = "red-class"
    }

    if (color == "yellow") {
        color == "yellow-class"
    }

    if (color == "pink") {
        color = "pink-class"
    }
    return color;
};

// seleciona a cor da caneta
let penColorSelected;
let selectedColorPen = "blue-Pen";

colorsPen.forEach((pen) => {

    pen.addEventListener("click", (e) => {
        colorsPen.forEach((pen) => {
            pen.querySelector(".bi-pen-fill").classList.remove("selected-pen");
        });

        pen.querySelector(".bi-pen-fill").classList.add("selected-pen");

        penColorSelected = e.target;
        selectedColorPen = penColorSelected.id;

        console.log(selectedColorPen)
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

    //Eventos do elemento 
    //remove nota
    noteElement.querySelector(".bi-x-circle-fill").addEventListener("click", () => {
        removeNoteLs(id, noteElement);
    });

    //fixa nota
    noteElement.querySelector(".bi-pin-fill").addEventListener("click", () => {
        console.log("FIXAR");
        pinIcon.classList.toggle("fixed");
    });

    return noteElement;
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

    console.log(notes)
    saveNotesLs(notes);

    boardElement.removeChild(element);
};

//fixar a nota e salvar na localstorage e no doom

function fixedNoteLs() {
    const nota = getNoteLs();
};

getNoteLs();

//start aplication
showNotes(); 