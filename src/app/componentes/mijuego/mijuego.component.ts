import { Component, inject } from '@angular/core';
import { Grilla } from '../../clases/miJuego/grilla';
import { Caja } from '../../clases/miJuego/caja';

import { Estado } from '../../clases/miJuego/estado';
import { Lista } from '../../clases/lista';
import { CommonModule } from '@angular/common';
import { ListadoService } from '../../services/listado.service';
//import { ListadoService } from '../../services/listado.service';
@Component({
  selector: 'app-mijuego',
  imports: [CommonModule],
  templateUrl: './mijuego.component.html',
  styleUrl: './mijuego.component.css',
})
export class MijuegoComponent {
  listado = inject(ListadoService);
  resultado!: Lista;
  estado!: Estado;
  tickId!: any;
  boton: string = '';
  contenido = new Array(9);
  // contenido = new Array(16);
  mensaje: string = '';
  victoria: string = '';
  grupoCajas: Caja[];
  start: string;
  contador: any;

  constructor() {
    this.nuevoJuego(Estado.ready());
    this.grupoCajas = [];
    //   this.contenido = [, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    this.contenido = [9, 1, 2, 3, 4, 5, 6, 7, 8];
    this.boton = 'Jugar';
    this.start = 'visible';
  }

  ngOnInit(): void {}

  nuevoJuego(state: Estado) {
    this.estado = state;
    this.tickId = null;
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.estado.time = this.estado.time + 1;
  }

  setState(newState: any) {
    this.estado = newState;
    this.render();
  }

  handleClickBox(index: any) {
    let caja = this.grupoCajas[index];
    let nextdoorBoxes = caja.getNextdoorBoxes();

    let blankBox = nextdoorBoxes.find(
      (nextdoorBox: any) =>
        this.estado.grid[nextdoorBox!.y][nextdoorBox!.x] === 0
    );
    if (blankBox) {
      let newGrid = Grilla.swapBoxes(this.estado.grid, caja, blankBox);
      if (Grilla.isSolved(newGrid)) {
        clearInterval(this.tickId!);
        this.setState({
          grid: newGrid,
          move: this.estado.move + 1,
          time: this.estado.time,
          status: 'gano',
        });
      } else {
        this.setState({
          grid: newGrid,
          move: this.estado.move + 1,
          time: this.estado.time,
          status: this.estado.status,
        });
      }
    }
  }

  render() {
    this.contador = 0;
    //  for (let i = 0; i < 4; i++) {
    for (let i = 0; i < 3; i++) {
      //    for (let j = 0; j < 4; j++) {
      for (let j = 0; j < 3; j++) {
        if (this.estado.status === 'jugando') {
          let caja = new Caja(j, i);
          this.grupoCajas.push(caja);
          this.boton = 'Reiniciar';
        }
        this.contenido[this.contador] =
          this.estado.grid[i][j] === 0 ? '' : this.estado.grid[i][j].toString();
        this.contador++;
      }
    }

    if (this.estado.status === 'listo') {
      this.boton = 'Jugar';
      this.start = 'visible';
    }
    if (this.estado.status === 'jugando') this.boton = 'Reiniciar';

    if (this.estado.status === 'gano') {
      this.boton = 'Jugar';
      this.victoria = 'visible';

      this.resultado = {
        tiempo: this.estado.time.toString() + ' seg',
        resultado: 'Gano',
        errores: 'N/A',
        clicks: this.estado.move.toString(),
        correctas: 'N/A',
        juego: 'Rompecabezas',
      };
      this.listado.addResultado(this.resultado);
    }
  }

  clickBoton() {
    clearInterval(this.tickId!);
    this.tickId = setInterval(this.tick, 1000);
    this.setState(Estado.start());
    this.start = '';
    this.victoria = '';
    this.render();
  }

  ordenar() {
    let grid = [
      [1, 2, 3],
      [4, 5, 0],
      [7, 8, 6],
    ];
    this.setState({
      grid: grid,
      move: this.estado.move + 1,
      time: this.estado.time,
      status: this.estado.status,
    });
  }
}
