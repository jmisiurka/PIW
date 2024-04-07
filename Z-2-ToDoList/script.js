"use strict";

// most recently removed task
let lastRemoved;

// retrieve most recently removed task
const undoRemove = () => {
    if (lastRemoved == null) {
        return;
    }
    lastRemoved.task.hidden = lastRemoved.list.classList.contains("hidden");

    lastRemoved.list.appendChild(lastRemoved.task);
    lastRemoved = null;
};

let taskToBeRemoved;

const moveToTrash = (task) => {
    const modal = document.getElementById("delete-modal");
    const taskText = document.getElementById("task-delete");
    taskText.innerText = task.querySelector(".task-text").innerText;
    taskToBeRemoved = { task: task, list: task.parentElement };
    modal.hidden = false;
    modal.showModal();
};

const trashModal = (confirmation) => {
    const modal = document.getElementById("delete-modal");

    if (confirmation) {
        lastRemoved = taskToBeRemoved;
        taskToBeRemoved.task.remove();
    }

    modal.close();
};

const addTask = () => {
    const taskInput = document.getElementById("task-text");
    const taskText = taskInput.value;

    if (taskText == "") {
        return;
    }

    const selection = document.getElementById("list-selector");

    const list = document.getElementById(selection.value);

    const newTask = document.createElement("li");
    newTask.classList.add("task");
    newTask.classList.add("list-group-item");

    // separated to make only this react on clicking
    const taskTextSpan = document.createElement("span");
    taskTextSpan.innerText = taskText;
    taskTextSpan.classList.add("task-text");
    newTask.appendChild(taskTextSpan);

    // date is separated to remove it easier
    const date = document.createElement("span");
    date.classList.add("date");
    newTask.appendChild(date);

    // remove task button
    const removeButton = document.createElement("button");
    removeButton.innerText = "X";
    removeButton.classList.add("btn");
    removeButton.classList.add("btn-danger");
    removeButton.addEventListener("click", () => {
        moveToTrash(newTask);
    });
    newTask.appendChild(removeButton);

    // initial css
    newTask.classList += "task-todo";
    taskTextSpan.addEventListener("click", () => {
        if (newTask.classList.contains("task-todo")) {
            // add finish date to task
            date.innerText =
                " - finished on " + new Date().toLocaleDateString();

            // change css
            newTask.classList.remove("task-todo");
            newTask.classList.add("task-done");
        } else {
            // remove finish date from task
            const date = newTask.querySelector(".date");
            date.innerText = "";

            // change css
            newTask.classList.remove("task-done");
            newTask.classList.add("task-todo");
        }
    });

    newTask.hidden = list.classList.contains("hidden");

    list.appendChild(newTask);
};

const hideList = (listNumber) => {
    const list = document.getElementById("tasks-" + listNumber.toString());

    const items = Array.from(list.querySelectorAll("li"));

    if (list.classList.contains("shown")) {
        items.forEach((item) => (item.hidden = true));

        list.classList.remove("shown");
        list.classList.add("hidden");
    } else {
        items.forEach((item) => (item.hidden = false));

        list.classList.remove("hidden");
        list.classList.add("shown");
    }
};

const applyFilter = () => {
    const searchInput = document.getElementById("search").value;

    const list1 = Array.from(
        document.getElementById("tasks-1").querySelectorAll("li")
    );
    const list2 = Array.from(
        document.getElementById("tasks-2").querySelectorAll("li")
    );
    const list3 = Array.from(
        document.getElementById("tasks-3").querySelectorAll("li")
    );

    const caseInsensitive = document.getElementById("case").checked;

    console.log(caseInsensitive);

    const allTasks = list1.concat(list2).concat(list3);

    if (caseInsensitive) {
        allTasks.forEach((task) => {
            if (
                task
                    .querySelector(".task-text")
                    .innerText.toLowerCase()
                    .startsWith(searchInput.toLowerCase())
            ) {
                task.hidden = false;
            } else {
                task.hidden = true;
            }
        });
    } else {
        allTasks.forEach((task) => {
            if (
                task
                    .querySelector(".task-text")
                    .innerText.startsWith(searchInput)
            ) {
                task.hidden = false;
            } else {
                task.hidden = true;
            }
        });
    }
};

/*
Lab 2
JavaScript
W repozytorium utworzyć nowy katalog, a w nim 2-3 pliki: index.html, script.js i style.css (if neded)
Do napisania jest prosta stronka z ToDo listą.
ZROBIONE    +0.5 - strona posiada pole do wpisania i przycisk, który po kliknięciu dodaje nową pozycję do listy. Pozycja musi być niepusta!
ZROBIONE    +0.5 - Klikając na pozycję na liście oznaczamy ją jako zrobioną i wyszarzamy oraz przekreślamy tekst. Ponowne kliknięcie odszarza pozycję i odskreśla
ZROBIONE    +0.5 - (kont. poprzedniego) Po kliknięciu pojawia się data kiedy zadanie zostało wykonane (tj. kliknięte)
ZROBIONE    +0.5 - Każda pozycja ma przycisk X, kliknięcie go usuwa pozycję z listy
ZROBIONE    +0.5 - (kont. poprzedniego) Usuwany obiekt trafia do kosza. Możemy zawsze cofnąć usunięcie (takie ctrl+Z), ale tylko jeden wstecz!
ZROBIONE    +0.5 - (kont. przed-poprzedniego) Pojawia się modal, któy pyta, czy na pewno usunąć element. W modalu jest napisane: Czy na pewno chcesz usunąc zadanie o treści: ... <-- tu jest tekst taska
ZROBIONE    +1.0 - Dodajemy kolorowanie i formatowanie, może być bootstrap lub inne (można samemu zdefiniować). Wedle uznania. Oceniane subiektywnie.
ZROBIONE    "+0.5 - Mamy możliwość posiadania kilku list. Przy dodawania wpisu precyzujemy do której listy chcemy dodać. Kliknięcie na nagłówek listy powoduje jej zwinięcie.
            Listy mogą być predefiniowane (np. mało pilne, pilne, na wczoraj) lub dynamiczne, tj. użytkownik może sobie dodawać nowe listy."
ZROBIONE    +0.5 - Pole do dynamicznego wyszukiwania w listach, tzn wpisuję po literce i każdy znak aktualizuje listę. Nie zapomnieć o przełączniku (np. checkbox) case-insensitive
BRAK        -1.0 - Niezgodność z zalecanym stylem, np. brak średników, brak "use strict", nieuzasadnione "=="
*/