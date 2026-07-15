const main = document.getElementById('main');

fetch('https://script.google.com/macros/s/AKfycby9yBvR_sKZSMt1pXjhcgstOQB6m6WtTIjD1IZnjVvwOCTZMSBQipA_u-cY8Qdascg3/exec')
  .then(res => res.json())
  .then(data => console.log(data))
  .then(data => create(data));


function create(data) {
    var element = document.createElement('div');
    element.innerHTML = '123';
    document.body.appendChild(element);
}

function call() {
    fetch('https://script.google.com/macros/s/AKfycbxrUd5dTze3FjQb8NBouYCla2sBdMTgroNsxCxHP4E7C91ZlFhFZ2rT42NQEX0W2mH48A/exec', {
        method: 'POST',
        headers: { 'Content-Type': "text/plain;charset=utf-8"},
        redirect: "follow",
        body: JSON.stringify(['test1'])
    });
}

