import { Component } from '@angular/core';
import { ListadoService } from '../../services/listado.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgFor } from '@angular/common';
@Component({
  selector: 'app-listados',
  imports: [DatePipe, NgFor, AsyncPipe],
  templateUrl: './listados.component.html',
  styleUrl: './listados.component.css',
})
export class ListadosComponent {
  lista: Observable<any[]>;
  constructor(private listado: ListadoService) {
    this.lista = this.listado.getListas();
    console.log(this.lista);
  }
}
