var field = [];
var appEl = document.getElementById("app");
var rows = 15;
var places = 15;
var color = 'green';


/**
 * получить первоначальный статус
 * @returns boolean
 */
function getState() {
    let i = Math.random() * 10;
    if (i >= 4) {
        return true;
    }
    return false;
}

function isAnyoneAlive(field) {
    field.forEach((el) => {
        if (el.state) {
            return true;
        }
    });
    return false;
}

function getColor() {
    switch (color) {
        case "green": {
            color = "blue";
            return color;
        }
        case "blue": {
            color = "red";
            return color;
        }
        case "red": {
            color = "brown";
            return color;
        }
        case "brown": {
            color = "green";
            return color;
        }
    }
}


/**
 *
 * @param x, y, state
 * returns count
 */
function getNumOfAliveNeighbours(x, y) {
    let count = 0;
    for (let i = x - 1; i < x + 2; i++) {
        for (let j = y - 1; j < y + 2; j++) {
            if (j == y && i == x) {
                continue;
            }
            let cell = field.find((el) => el.x == i && el.y == j);
            if (cell != undefined && cell.state) {
                count++;
            }
        }
    }
    return count;
}

/**
 * получить новое состояние
 * @param field
 * @return field
 */
function getNewState(field) {
    field.forEach((el) => {
        let count = getNumOfAliveNeighbours(el.x, el.y);
        //если ячейка жива
        if (el.state && (count > 3 || count < 2)) {
            el.state = false;
        }

        //если ячейка мертва
        else if (count == 3) {
            el.state = true;
        }
    });
    return field;
}


/**
 *
 * @param field
 * @param htmlElement
 * первоначальное формирование поля
 * returns void
 */
function drawField(field, htmlElement) {
    var table = document.createElement('table');
    table.setAttribute('width', '600px');
    table.setAttribute('height', '800px');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < places; j++) {
            let td = document.createElement('td');
            let cell = {x: i, y: j, state: getState()}
            field.push(cell);
            if (cell.state) {
                td.setAttribute('bgcolor', color);
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    htmlElement.appendChild(table);
}

function getNewField(field, htmlElement) {
    var table = document.createElement('table');
    getColor();
    table.setAttribute('width', '600px');
    table.setAttribute('height', '800px');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < places; j++) {
            let td = document.createElement('td');
            if (field.find(cell => cell.x == i && cell.y == j).state) {
                td.setAttribute('bgcolor', color);
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    htmlElement.appendChild(table);
}

var timer;

/**
 * начинает игру
 */
function start() {
    // каждую секунду
    timer = setInterval(() => {
        // считать новое состояние
        field = getNewState(field);
        // отрисовывать его
        getNewField(field, appEl);
        // если нет живых клеток - вывести алерт
        if (isAnyoneAlive(field)) {
            clearInterval(timer);
            console.log("Every body died! =(");
        }
    }, 300);
}


drawField(field, appEl);
start();
