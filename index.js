import AdyacentMatrixChessList from "./AdyacentMatrixChessList.js";

const adMatrixList = new AdyacentMatrixChessList();
const startPointInput1 = document.getElementById("start-point-1");
const startPointInput2 = document.getElementById("start-point-2");
const endPointInput1 = document.getElementById("end-point-1");
const endPointInput2 = document.getElementById("end-point-2");
const submitButton = document.getElementById("button-submit");
const body = document.getElementsByTagName("body")[0];
let startPoint = [];
let endPoint = [];

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  let result = document.getElementById("result");
  body.removeChild(result);
  result = document.createElement("h2");
  result.id = "result";
  body.appendChild(result);
  startPoint = [startPointInput1.value, startPointInput2.value];
  endPoint = [endPointInput1.value, endPointInput2.value];
  let matrixGet = adMatrixList.knightMoves(startPoint, endPoint);
  console.log("matrixGet", matrixGet);
  if (typeof matrixGet !== "string") {
    matrixGet.forEach((item) => {
      let pElement = document.createElement("p");
      pElement.textContent = `[${item[0]}, ${item[1]}] `;
      result.appendChild(pElement);
    });
  } else {
    result.textContent = matrixGet;
  }
});
