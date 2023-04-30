const DOMSelectors = {
  numField: document.getElementById('numberField'),
  submitBtn: document.getElementById('submit'),
  err: document.getElementById('err'),
  dup: document.getElementById('dup'),
  random: document.getElementById('random'),
};

let usedArr = [];

DOMSelectors.random.addEventListener('click', random);
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
      numFact(num).then(function (response) {
        let tempArr = new array(num, evenOdd, response);

        createCards(tempArr, false, undefined);
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
    let result = await response.json();
    return result.text;
  } catch (error) {
    alert('Error caught: check console');
    console.error(error);
  }
}

function random(e) {
  e.preventDefault();
  let num = Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100);
  createCards(undefined, true, num);
}

function createCards(arr, random, num) {
  if (random) {
    numFact(num).then(function (response) {
      let evenOdd = isEven(num);
      for (let item of usedArr) {
        if (item.Fact === response) {
          add(DOMSelectors.dup);
          return;
        }
      }
      arr = new array(num, evenOdd, response);
      insertHTML(arr.Number, arr.EvenOrOdd, arr.Fact);
      usedArr.push(new array(arr.Number, arr.EvenOrOdd, arr.Fact));
    });
  } else {
    for (let item of usedArr) {
      if (item.Fact === arr.Fact) {
        add(DOMSelectors.dup);
        return;
      }
    }
    insertHTML(arr.Number, arr.EvenOrOdd, arr.Fact);
    usedArr.push(new array(arr.Number, arr.EvenOrOdd, arr.Fact));
  }
}

class array {
  constructor(num, evenOdd, fact) {
    this.Number = num;
    this.EvenOrOdd = evenOdd;
    this.Fact = fact;
  }
}

function add(specifier) {
  specifier.style.opacity = '1';
  specifier.style.transition = '1s ease';
  specifier.addEventListener('transitionend', remove);
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
