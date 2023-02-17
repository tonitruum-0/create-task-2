const DOMSelectors = {
    numField: document.getElementById('numberField'),
    submitBtn: document.getElementById('submit'),
    err: document.getElementById('err'),
};

let result;
let arr = [];
let fact;
let i = 0;

DOMSelectors.submitBtn.addEventListener('click', NaNcheck);
function NaNcheck(e) {
    e.preventDefault();
    let num = DOMSelectors.numField.value;
    if (num === '') {
        add();
        return;
    } else {
        if (isNaN(DOMSelectors.numField.value)) {
            add();
        } else {
            let evenOdd = isEven(num);
            numFact(num)
                .then(function (response) {
                    arr.push(new array(num, evenOdd, response));
                    createCards();
                })
                .catch(function (error) {
                    console.error(error);
                });
            DOMSelectors.numField.value = '';
        }
    }
}

function isEven(num) {
    if (num % 2 === 0) {
        return 'even';
    } else {
        return 'odd';
    }
}

async function numFact(num) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `http://numbersapi.com/${num}`);
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(
                    new Error(
                        'Request failed. Returned status of ' + xhr.status
                    )
                );
            }
        };
        xhr.onerror = function () {
            reject(new Error('Request failed. Network error'));
        };
        xhr.send();
    });
}

class array {
    constructor(num, evenOdd, fact) {
        this.Number = num;
        this.EvenOrOdd = evenOdd;
        this.Fact = fact;
    }
}

function createCards() {
    document.getElementById(
        'container'
    ).innerHTML += `<div class=card><p class="num text">${arr[i].Number} - ${arr[i].EvenOrOdd}</p><p class="fact text">${arr[i].Fact}</p></div>`;
    i++;
}

function add() {
    DOMSelectors.err.style.opacity = '1';
    DOMSelectors.err.style.transition = '1s ease';
    DOMSelectors.err.addEventListener('transitionend', remove);
    DOMSelectors.numField.value = '';
}

function remove() {
    DOMSelectors.err.style.opacity = '0';
    DOMSelectors.err.style.transition = '1s ease';
}
