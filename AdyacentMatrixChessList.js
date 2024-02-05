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
      }
    }
    return arrayAux;
  }

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
    if (arrayStart[0] === arrayEnd[0] && arrayStart[1] === arrayEnd[1]) {
      return arrayStart;
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

    function searchMoves(
      arrayStart,
      arrayEnd,
      result = [],
      minResult = ["", "", "", "", "", "", "", ""]
    ) {
      const auxArray = matrix[arrayStart.charAt(0)][arrayStart.charAt(2)];
      let newArray = [];
      let foundIt = false;
      result = [...result, arrayStart];
      if (result.length >= 7) {
        return result;
      }
      for (let i = 0; i < auxArray.length; i++) {
        if (!result.find((item) => auxArray[i] === item)) {
          if (
            auxArray[i].charAt(0) != arrayEnd[0] ||
            auxArray[i].charAt(2) != arrayEnd[1]
          ) {
            searchMoves(auxArray[i], arrayEnd, [...result], minResult);
          } else {
            foundIt = true;
            newArray = [...result, auxArray[i]];
          }
          if (newArray.length < minResult.length && foundIt) {
            minResult.length = 0;
            minResult.push(...newArray);
            foundIt = false;
          }
        }
      }
      return minResult.map((item) => {
        return [Number(item.charAt(0)), Number(item.charAt(2))];
      });
    }
  }
}
