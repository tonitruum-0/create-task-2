const DOMSelectors = {
  numField: document.getElementById('numberField'),
  submitBtn: document.getElementById('submit'),
};

let result;

DOMSelectors.submitBtn.addEventListener('click', NaNcheck);

function NaNcheck(e) {
  e.preventDefault();
  let num = DOMSelectors.numField.value;
  if (isNaN(DOMSelectors.numField.value)) {
    document.body.innerHTML += 'pls enter a number';
    DOMSelectors.numField.value = '';
  } else {
    let evenOdd = isEven(num);
    let fact = numFact(num);
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
    let api_url = `http://numbersapi.com/${num}`;
    let response = await fetch(api_url);
    result = await response.json();
    console.log(result);
  } catch (error) {
    alert('Error caught: check console');
    console.error(error);
  }
}
