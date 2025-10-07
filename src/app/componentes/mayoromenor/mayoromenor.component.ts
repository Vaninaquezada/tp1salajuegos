import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoService } from '../../services/listado.service';
@Component({
  selector: 'app-mayoromenor',
  imports: [CommonModule],
  templateUrl: './mayoromenor.component.html',
  styleUrl: './mayoromenor.component.css',
})
export class MayoromenorComponent {
  listado = inject(ListadoService);
  numero = 0;
  numeroNuevo: any = '?';
  numeroActual = 0;
  incorrectas = 0;
  correctas = 0;
  repondidas = 0;
  jugando = false;
  resultadoText = '';
  resultado = {};
  victoria = '';
  start = 'visible';
  perdiste = '';
  mensaje = '';
  numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  ngOnInit(): void {}

  verificar(seleccion: any) {
    if (this.numeroNuevo === '?') {
      this.numeroNuevo = this.generarnumero();
    }
    this.repondidas++;
    if (this.repondidas === 5) {
      this.jugando = false;
      this.terminarjugo();
    }
    if (seleccion === 'mayor') {
      if (this.numeroActual > this.numeroNuevo) {
        this.correctas++;
        this.mensaje =
          'Correcto ' + this.numeroActual + ' es mayor que ' + this.numeroNuevo;
      } else {
        this.incorrectas++;
        this.mensaje =
          'Incorrecto ' +
          this.numeroActual +
          ' es menor que ' +
          this.numeroNuevo;
      }
    }
    if (seleccion === 'menor') {
      if (this.numeroActual < this.numeroNuevo) {
        this.correctas++;
        this.mensaje =
          'Correcto ' + this.numeroActual + ' es menor que ' + this.numeroNuevo;
      } else {
        this.incorrectas++;
        this.mensaje =
          'Correcto ' + this.numeroActual + ' es mayor que ' + this.numeroNuevo;
      }
    }
    this.numeroActual = this.numeroNuevo;
    this.numero = this.generarnumero();
    while (this.numero === this.numeroActual) {
      this.numero = this.generarnumero();
    }
    this.numeroNuevo = this.numero;
  }
  public generarnumero() {
    console.log(this.numeros);
    let numerosTemp: number[] = [];
    let random = Math.floor(Math.random() * this.numeros.length);
    console.log(random);
    let selected = this.numeros[random];
    console.log(selected);
    this.numeros.forEach((element) => {
      if (element !== selected) {
        numerosTemp.push(element);
      }
    });

    this.numeros = numerosTemp;
    console.log(this.numeros);
    return selected;
  }

  terminarjugo() {
    if (this.incorrectas > 1) {
      this.victoria = 'visible';
      this.resultadoText = 'Perdiste';
    } else {
      this.resultadoText = 'Ganaste';
      this.victoria = 'visible';
    }
    this.resultado = {
      tiempo: 'N/A',
      resultado: this.resultadoText,
      errores: this.incorrectas,
      clicks: 'N/A',
      correctas: this.correctas,
      juego: 'Mayor o Menor',
    };
    this.listado.addResultado(this.resultado);
    this.numero = 0;
    this.numeroNuevo = 0;
    this.numeroActual = 0;
  }

  clickBoton() {
    this.jugando = true;
    this.numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.numero = 0;
    this.start = '';
    this.numeroNuevo = '?';
    this.numeroActual = 0;
    this.incorrectas = 0;
    this.correctas = 0;
    this.repondidas = 0;
    this.perdiste = '';
    this.resultadoText = '';
    this.resultadoText = '';
    this.victoria = '';
    //this.numero = this.generarnumero();

    this.numeroActual = this.generarnumero();
  }
}
