const DOMSelectors = {
  numField: document.getElementById(
    'numberField'
  ),
  submitBtn: document.getElementById('submit'),
  err: document.getElementById('err'),
  dup: document.getElementById('dup'),
};

let result;
let arr = [];
let fact;
let i = 0;
let usedArr = [];

DOMSelectors.submitBtn.addEventListener('click', main);
function main(e) {
  e.preventDefault();
  let num = DOMSelectors.numField.value;
  if (num === '' || num < 1) {
    add(DOMSelectors.err);
    return;
  } else {
    if (isNaN(DOMSelectors.numField.value)) {
      add(DOMSelectors.err);
    } else {
      let evenOdd = isEven(num);
      numFact(num)
        .then(function (response) {
          arr.push(
            new array(num, evenOdd, response)
          );
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
  try {
    let api_url = `http://numbersapi.com/${num}?json`;
    let response = await fetch(api_url);
    result = await response.json();
    return result.text;
  } catch (error) {
    alert('Error caught: check console');
    console.error(error);
  }
}

function createCards() {
  arr.forEach((a) => {
    if (!a.Created) {
      a.Created = true;
      for (let item of usedArr) {
        if (item.Fact === a.Fact) {
          numFact(a.Number).then((a.Fact = result.text));
          add(DOMSelectors.dup);
          createCards();
          return;
        }
      }
      insertHTML(a.Number, a.EvenOrOdd, a.Fact);
      usedArr.push(new array(a.Number, a.EvenOrOdd, a.Fact));
    }
  });
}

class array {
  constructor(num, evenOdd, fact) {
    this.Number = num;
    this.EvenOrOdd = evenOdd;
    this.Fact = fact;
    this.Created = false;
  }
}

function add(specifier) {
  specifier.style.opacity = '1';
  specifier.style.transition = '1s ease';
  specifier.addEventListener(
    'transitionend',
    remove
  );
  DOMSelectors.numField.value = '';
}

function remove(e) {
  e.target.style.opacity = '0';
  e.target.style.transition = '1s ease';
}

function insertHTML(num, eoo, fact) {
  document
    .getElementById('container')
    .insertAdjacentHTML(
      'afterbegin',
      `<div class=card><p class="num text">${num} - ${eoo}</p><p class="fact text">${fact}</p></div>`
    );
}
