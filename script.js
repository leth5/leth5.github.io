import {MD5} from "./md5.js"

const main = document.getElementById('main');
const passwordInput = document.getElementById('password')

const link = 'https://script.google.com/macros/s/AKfycbyjcN9mcEfslsCslVoTrdc4ZQ1TZB3FjIahVzpT1VwEXxesrfeq2w34oaLxEiYN-OdhIw/exec';
const dividerPos = 6;

passwordInput.addEventListener('input', () => checkPassword())

if (localStorage.getItem("password") == "passed") {
    removePasswordField();
    getData();
}

function getData() {
    fetch(link)
    .then(res => res.json())
    .then(data => create(data));
}

function create(data) {

    checkDates(data);

    
    var row = document.createElement('div');
    row.classList.add('row');
    
    var title = document.createElement('div');
    title.classList.add('title');
    title.innerHTML = "";
    row.appendChild(title);
    
    for (let d = 1; d < data.length; d++) {
        var date = new Date(data[d][0]);
        
        var dateDisplay = document.createElement('div');
        dateDisplay.classList.add('date');
        dateDisplay.innerHTML = date.getDate();
        
        row.appendChild(dateDisplay);
    }
    document.body.appendChild(row);

        var divider = document.createElement('div');
    divider.classList.add('divider')
    document.body.appendChild(divider);

    for (let r = 1; r < data[0].length; r++) {
        
        var row = document.createElement('div');
        row.classList.add('row');

        var title = document.createElement('div');
        title.classList.add('title');
        title.innerHTML = data[0][r];
        row.appendChild(title);

        for (let p = 1; p < data.length; p++) {

            let point = document.createElement('button');
            point.classList.add('point');
            let value = data[p][r];
            if (value) {
                point.classList.add('filled');
            }

            if (r >= dividerPos) {
                point.classList.add('secondColor');
            }

            row.appendChild(point);

            point.addEventListener('click', () => {
                let newValue = point.classList.contains('filled') ? 0 : 1;

                call(p, r, newValue)
                
                localStorage.setItem("password", "passed");

                if (newValue) {
                    point.classList.add('filled');
                } else {
                    point.classList.remove('filled');
                }
            });

        }
        
        if (r == dividerPos) {
            var divider = document.createElement('div');
            divider.classList.add('divider')
            document.body.appendChild(divider);
        }

        document.body.appendChild(row);
    }
    
}

function checkPassword() {
    if (MD5(document.getElementById('password').value) == "dd959a1a26196f00da4330a3b3a42b63") {
        localStorage.setItem("password", "passed");
        removePasswordField();
        getData();
    }
}

function removePasswordField() {
    document.getElementById('password').remove();
}

function call(row, column, value) {
    fetch(link, {
        method: 'POST',
        headers: { 'Content-Type': "text/plain;charset=utf-8"},
        redirect: "follow",
        body: JSON.stringify({row: row + 1, column: column + 1, value: value})
    });
}

const millisecondsInADay = 8.64e7;

function checkDates(data) {

    var count = data.length;
    var rows = data[0].length;

    var date = new Date(data[count-1][0]);
    var today = new Date();

    var difference = today - date;
    
    while (difference > millisecondsInADay) {
        date = new Date(date.getTime() + millisecondsInADay);

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var dateString = (date.getDate()) + " " + months[date.getMonth()] + " " + date.getFullYear();

        
        data.push([])

        data[count][0] = dateString;
        call(count, 0, dateString);
        
        for (let i = 0; i < rows; i++) {
            data[count].push(0);
        }

        count += 1;

        difference = today - date;
    }
}