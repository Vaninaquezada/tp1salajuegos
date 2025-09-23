export class Caja {
    x: number;
    y: number;

    constructor(x: any, y: any) {
        this.x = x;
        this.y = y;
    }

    getTopBox() {
        if (this.y === 0) return null;
        return new Caja(this.x, this.y - 1);
    }

    getRightBox() {
        //  if (this.x === 3) return null;
        if (this.x === 2) return null;
        return new Caja(this.x + 1, this.y);
    }

    getBottomBox() {
        //   if (this.y === 3) return null;
        if (this.y === 2) return null;
        return new Caja(this.x, this.y + 1);
    }

    getLeftBox() {
        if (this.x === 0) return null;
        return new Caja(this.x - 1, this.y);
    }

    getNextdoorBoxes() {
        return [
            this.getTopBox(),
            this.getRightBox(),
            this.getBottomBox(),
            this.getLeftBox()
        ].filter(box => box !== null);
    }

    getRandomNextdoorBox() {
        const nextdoorBoxes = this.getNextdoorBoxes();
        return nextdoorBoxes[Math.floor(Math.random() * nextdoorBoxes.length)];
    }


}
