import Vertex from "./Vertex.js";

export default class AdyacentMatrixChessList {
  constructor() {
    this.matrix = this.buildEdges();
  }

  buildEdges() {
    const arrayAux = [];

    for (let i = 0; i < 8; i++) {
      arrayAux[i] = [];
      for (let j = 0; j < 8; j++) {
        arrayAux[i][j] = [];
        if (i - 2 >= 0) {
          if (j - 1 >= 0) {
            arrayAux[i][j] = [...arrayAux[i][j], `${i - 2}-${j - 1}`];
          }
          if (j + 1 <= 7) {
            arrayAux[i][j] = [...arrayAux[i][j], `${i - 2}-${j + 1}`];
          }
        }
        if (i - 1 >= 0) {
          if (j - 2 >= 0) {
            arrayAux[i][j] = [...arrayAux[i][j], `${i - 1}-${j - 2}`];
          }
          if (j + 2 <= 7) {
            arrayAux[i][j] = [...arrayAux[i][j], `${i - 1}-${j + 2}`];
          }
        }
        if (i + 1 <= 7) {
          if (j - 2 >= 0) {
            arrayAux[i][j] = [...arrayAux[i][j], `${i + 1}-${j - 2}`];
          }
          if (j + 2 <= 7) {
            arrayAux[i][j] = [...arrayAux[i][j], `${i + 1}-${j + 2}`];
          }
        }
        if (i + 2 <= 7) {
          if (j - 1 >= 0) {
            arrayAux[i][j] = [...arrayAux[i][j], `${i + 2}-${j - 1}`];
          }
          if (j + 1 <= 7) {
            arrayAux[i][j] = [...arrayAux[i][j], `${i + 2}-${j + 1}`];
          }
        }

        // i-2 j-1--
        // i-2 j+1--
        // i-1 j-2--
        // i-1 j+2--
        // i+1 j-2--
        // i+1 j+2--
        // i+2 j-1--
        // i+2 j+1--
      }
    }
    return arrayAux;
  }

  // buildEdges() {
  //   const arrayAux = [];

  //   for (let i = 0; i < 8; i++) {
  //     arrayAux[i] = [];
  //     for (let j = 0; j < 8; j++) {
  //       arrayAux[i][j] = [];
  //       if (i - 2 >= 0) {
  //         if (j - 1 >= 0) {
  //           arrayAux[i][j] = [...arrayAux[i][j], [i - 2, j - 1]];
  //         }
  //         if (j + 1 <= 7) {
  //           arrayAux[i][j] = [...arrayAux[i][j], [i - 2, j + 1]];
  //         }
  //       }
  //       if (i - 1 >= 0) {
  //         if (j - 2 >= 0) {
  //           arrayAux[i][j] = [...arrayAux[i][j], [i - 1, j - 2]];
  //         }
  //         if (j + 2 <= 7) {
  //           arrayAux[i][j] = [...arrayAux[i][j], [i - 1, j + 2]];
  //         }
  //       }
  //       if (i + 1 <= 7) {
  //         if (j - 2 >= 0) {
  //           arrayAux[i][j] = [...arrayAux[i][j], [i + 1, j - 2]];
  //         }
  //         if (j + 2 <= 7) {
  //           arrayAux[i][j] = [...arrayAux[i][j], [i + 1, j + 2]];
  //         }
  //       }
  //       if (i + 2 <= 7) {
  //         if (j - 1 >= 0) {
  //           arrayAux[i][j] = [...arrayAux[i][j], [i + 2, j - 1]];
  //         }
  //         if (j + 1 <= 7) {
  //           arrayAux[i][j] = [...arrayAux[i][j], [i + 2, j + 1]];
  //         }
  //       }

  //       // i-2 j-1--
  //       // i-2 j+1--
  //       // i-1 j-2--
  //       // i-1 j+2--
  //       // i+1 j-2--
  //       // i+1 j+2--
  //       // i+2 j-1--
  //       // i+2 j+1--
  //     }
  //   }
  //   return arrayAux;
  // }

  knightMoves(arrayStart, arrayEnd) {
    const matrix = this.matrix;
    if (this.matrix.length <= 0) {
      return null;
    }
    if (!validateEnteredValue(arrayStart)) {
      return "start Value is wrong";
    }

    if (!validateEnteredValue(arrayEnd)) {
      return "End Value is wrong";
    }

    const result = searchMoves(
      `${String(arrayStart[0])}-${String(arrayStart[1])}`,
      arrayEnd
    );
    return result;

    function validateEnteredValue(arrayItems) {
      if (
        arrayItems[0] < 0 ||
        arrayItems[0] > 7 ||
        arrayItems[1] < 0 ||
        arrayItems[1] > 7
      ) {
        return false;
      }
      return true;
    }

    function searchMoves(arrayStart, arrayEnd, result = []) {
      const auxArray = matrix[arrayStart.charAt(0)][arrayStart.charAt(2)];
      let minResult = [];
      let minCount = Infinity;
      let newArray = [];
      let foundIt = false;
      console.log("arrayStart", arrayStart);
      // console.log("auxArray", auxArray);
      result = [...result, arrayStart];
      console.log("result", result);
      console.log("1nd", result.length);
      if (result.length >= 7) {
        console.log("enter salida");
        return result;
      }
      for (let i = 0; i < auxArray.length; i++) {
        console.log("auxiliar", i, "---", auxArray[i]);
        auxArray[i] === "6-5" && console.warn("Is here", i, "---");
        if (!result.find((item) => auxArray[i] === item)) {
          console.log(arrayEnd[0], "*", arrayEnd[1]);
          console.log(auxArray[i].charAt(0), "*", auxArray[i].charAt(2));
          if (
            auxArray[i].charAt(0) != arrayEnd[0] ||
            auxArray[i].charAt(2) != arrayEnd[1]
          ) {
            // console.log("enter");
            newArray = [...searchMoves(auxArray[i], arrayEnd, [...result])];
          } else {
            console.warn("Found it");
            foundIt = true;
            newArray = [...result, auxArray[i]];
          }
          console.log("2nd", newArray.length);
          if (newArray.length < minCount && foundIt) {
            minResult = [...newArray];
            minCount = newArray.length;
            foundIt = false;
            console.log("saveMin", minResult);
          }
        } else {
          console.log("carajo");
        }
      }
      return minResult;
    }
  }
}
