import { Grilla } from "./grilla";
export class Estado {
    grid;
    move: number = 0;
    time: number = 0;
    status: string = "";
    constructor(grid: any, move: any, time: any, status: any) {
        this.grid = grid;
        this.move = move;
        this.time = time;
        this.status = status;
    }

    static ready() {
        return new Estado(
            //  [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            0,
            0,
            "listo"
        );
    }

    static start() {
        return new Estado(Grilla.getRandomGrid(), 0, 0, "jugando");
    }
}
