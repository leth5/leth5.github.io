import {MD5} from "./md5.js"

const main = document.getElementById('main');
const passwordInput = document.getElementById('password')

const link = 'https://script.google.com/macros/s/AKfycbyg8nGYvoqVCrziF8I1KxFVFyL9q2ALyV2rDgRq5eABW0txyoe0bH_U7iFDfna7MsGVPQ/exec';

passwordInput.addEventListener('input', () => checkPassword())

checkPassword();

function getData() {
    fetch(link)
    .then(res => res.json())
    .then(data => create(data));
}

function create(data) {
    
    for (let r = 0; r < data[0].length; r++) {
        var row = document.createElement('div');
        row.classList.add('row');
        row.innerHTML = data[0][r];

        for (let p = 1; p < data.length; p++) {
            let point = document.createElement('button');
            point.classList.add('point');
            let value = data[p][r];
            point.innerHTML = value;
            if (value) {
                point.classList.add('filled');
            }
            row.appendChild(point);

            point.addEventListener('click', () => {
                
                let newValue = Math.abs(1 - point.innerHTML);
                call(p, r, newValue)
                point.innerHTML = newValue;

                if (newValue) {
                    point.classList.add('filled');
                } else {
                    point.classList.remove('filled');
                }
            });
        }


        document.body.appendChild(row);
    }
    
}

function checkPassword() {
    if (MD5(document.getElementById('password').value) == "dd959a1a26196f00da4330a3b3a42b63") {
        document.getElementById('password').remove();
        getData();
    }
}

function call(row, column, value) {
    fetch(link, {
        method: 'POST',
        headers: { 'Content-Type': "text/plain;charset=utf-8"},
        redirect: "follow",
        body: JSON.stringify({row: row + 1, column: column + 1, value: value})
    });
}

