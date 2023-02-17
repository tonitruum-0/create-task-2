const DOMSelectors = {
  numField: document.getElementById("numberField"),
  submitBtn: document.getElementById("submit"),
  err: document.getElementById("err"),
};

let result;
let arr = [];
let fact;
let i = 0;

DOMSelectors.submitBtn.addEventListener("click", main);
function main(e) {
  e.preventDefault();
  let num = DOMSelectors.numField.value;
  if (num === "" || num < 1) {
    add();
    return;
  } else {
    remove();
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
      DOMSelectors.numField.value = "";
    }
  }
}

function isEven(num) {
  if (num % 2 === 0) {
    return "even";
  } else {
    return "odd";
  }
}

async function numFact(num) {
  try {
    let api_url = `http://numbersapi.com/${num}?json`;
    let response = await fetch(api_url);
    result = await response.json();
    return result.text;
  } catch (error) {
    alert("Error caught: check console");
    console.error(error);
  }
}

class array {
  constructor(num, evenOdd, fact) {
    this.Number = num;
    this.EvenOrOdd = evenOdd;
    this.Fact = fact;
    this.Created = "false";
  }
}

function createCards() {
  arr.forEach((a) => {
    if (a.Created === "false") {
      a.Created = "true";
      document.getElementById("container").insertAdjacentHTML("afterbegin", `<div class=card><p class="num text">${a.Number} - ${a.EvenOrOdd}</p><p class="fact text">${a.Fact}</p></div>`);
    }
  });
}

function add() {
  DOMSelectors.err.style.opacity = "1";
  DOMSelectors.err.style.transition = "1s ease";
  DOMSelectors.err.addEventListener("transitionend", remove);
  DOMSelectors.numField.value = "";
}

function remove() {
  DOMSelectors.err.style.opacity = "0";
  DOMSelectors.err.style.transition = "1s ease";
}
