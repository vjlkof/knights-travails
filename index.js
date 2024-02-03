import AdyacentMatrixChessList from "./AdyacentMatrixChessList.js";

const adMatrixList = new AdyacentMatrixChessList();

console.log("matrix", adMatrixList.matrix);

console.error(adMatrixList.knightMoves([0, 0], [7, 7]));
