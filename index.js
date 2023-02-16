const DOMSelectors = {
  numField: document.getElementById("numberField"),
  submitBtn: document.getElementById("submit"),
};

let result;

DOMSelectors.submitBtn.addEventListener("click", NaNcheck);

function NaNcheck(e) {
  e.preventDefault();
  if (isNaN(DOMSelectors.numField.value)) {
    document.body.innerHTML += "pls enter a number";
    DOMSelectors.numField.value = "";
  } else {
    isEven(DOMSelectors.numField.value);
  }
}

async function isEven(num) {
  try {
    let api_url = `https://api.isevenapi.xyz/api/iseven/${num}/`;
    let response = await fetch(api_url);
    result = await response.json();
    document.body.innerHTML += result.iseven;
  } catch (error) {
    alert("Error caught: check console");
    console.error(error);
  }
}
