import { Caja } from "./caja";
export class Grilla {
    static swapBoxes(grid: number[][], box1: Caja, box2: any) {
        let temp = grid[box1.y][box1.x];
        grid[box1.y][box1.x] = grid[box2.y][box2.x];
        grid[box2.y][box2.x] = temp;

        return grid;
    };

    static isSolved(grid: number[][]) {
        return (
            grid[0][0] === 1 &&
            grid[0][1] === 2 &&
            grid[0][2] === 3 &&
            grid[1][0] === 4 &&
            grid[1][1] === 5 &&
            grid[1][2] === 6 &&
            grid[2][0] === 7 &&
            grid[2][1] === 8 &&
            grid[2][2] === 0
            /*  grid[0][0] === 1 &&
              grid[0][1] === 2 &&
              grid[0][2] === 3 &&
              grid[0][3] === 4 &&
              grid[1][0] === 5 &&
              grid[1][1] === 6 &&
              grid[1][2] === 7 &&
              grid[1][3] === 8 &&
              grid[2][0] === 9 &&
              grid[2][1] === 10 &&
              grid[2][2] === 11 &&
              grid[2][3] === 12 &&
              grid[3][0] === 13 &&
              grid[3][1] === 14 &&
              grid[3][2] === 15 &&
              grid[3][3] === 0
              */
        );
    };

    static getRandomGrid(): any {
        //let grid = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];
        let grid = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
        //   let blankBox = new Caja(3, 3);
        let blankBox = new Caja(2, 2);
        for (let i = 0; i < 1000; i++) {
            const randomNextdoorBox = blankBox.getRandomNextdoorBox();
            Grilla.swapBoxes(grid, blankBox, randomNextdoorBox);
            blankBox = randomNextdoorBox!;
        }

        if (Grilla.isSolved(grid)) return this.getRandomGrid();
        return grid;
    };
}
