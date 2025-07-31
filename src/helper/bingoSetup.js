import { shuffle } from './util'
const bingoSize = 5

class Bingo {
    constructor() {
        this.bingoArray = [];
        const elements = Array.from({ length: (bingoSize * bingoSize) }, (_, i) => i + 1);
        shuffle(elements)
        for (let i = 0; i < bingoSize; i++) {
            for (let j = 0; j < bingoSize; j++) {
                if (!this.bingoArray[i]) {
                    this.bingoArray[i] = [];
                }
                this.bingoArray[i][j] = new BingoInner(i, j, elements.pop())
            }
        }
        return this.bingoArray;
    }
}

class BingoInner {
    constructor(i, j, value) {
        this.x = i;
        this.y = j;
        this.value = value;
        this.crossed = false;
    }
}

export const IsBingo = (bingo) => {

    function isCrossedPosition(i, j) {
        return bingo[i][j].crossed;
    }

    let count = 0;

    let isLeftDiagonalCrossed = true;
    let isRightDiagonalCrossed = true;

    let ri = 0;
    let rj = bingoSize - 1;

    for (let i = 0; i < bingoSize; i++) {
        let columnCrossed = true;
        let rowCrossed = true;
        for (let j = 0; j < bingoSize; j++) {
            const crossedPosition = isCrossedPosition(i, j)
            rowCrossed = rowCrossed && crossedPosition;
            columnCrossed = columnCrossed && isCrossedPosition(j, i);
            if (i == j) {
                isLeftDiagonalCrossed = isLeftDiagonalCrossed && crossedPosition;
            }
            if (i == ri && j == rj) {
                isRightDiagonalCrossed = isRightDiagonalCrossed && crossedPosition;
                ri++;
                rj--;
            }
        }
        if (rowCrossed) {
            count++;
        }
        if (columnCrossed) {
            count++;
        }
    }
    if (isLeftDiagonalCrossed) {
        count++
    }
    if (isRightDiagonalCrossed) {
        count++;
    }
    return count >= bingoSize;

}

export default Bingo;