import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImagenService } from '../../services/imagen.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-preguntados',
  imports: [CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css',
})
export class PreguntadosComponent {
  imagen: string;
  cantPreguntas: number;
  estiloImagen: {};
  pregunta: any;
  respuesta4: string;
  respuesta3: string;
  respuesta2: string;
  respuesta1: string;
  npreguntas: any = [];
  erradas: number;
  preguntas_hechas = 0;
  preguntas_correctas = 0;
  suspender_botones = false;
  base_preguntas: any;
  interprete_bp: any;
  estilo1: string;
  estilo2: string;
  estilo3: string;
  estilo4: string;
  categoria: string;
  preguntaActual: string;

  numero: any;
  puntaje = '';
  yellowd = 'yellow';
  posibles_respuestas: any;
  estilos: [any, any, any, any];
  btn_correspondiente: [string, string, string, string];
  victoria = '';
  start = 'visible';
  perdiste = '';
  opcion = 'Siguiente';
  resultadoText = '';
  resultado = {};
  img: any[] = [];
  im: any;
  constructor(private httpClient: HttpClient, private svcImg: ImagenService) {
    this.httpClient.get('assets/json/preguntas.json').subscribe((data) => {
      this.interprete_bp = data;
    });

    this.imagen = '';
    this.respuesta1 = '';
    this.respuesta2 = '';
    this.respuesta3 = '';
    this.respuesta4 = '';
    this.estilo1 = '';
    this.estilo2 = '';
    this.cantPreguntas = 1;
    this.estilo3 = '';
    this.estilo4 = '';
    this.pregunta = '';
    this.erradas = 0;
    this.categoria = '';
    this.preguntaActual = '';
    this.numero = '';

    this.estiloImagen = '';
    this.estilos = [this.estilo1, this.estilo2, this.estilo3, this.estilo4];
    this.posibles_respuestas = [];
    this.btn_correspondiente = [
      this.respuesta4,
      this.respuesta1,
      this.respuesta2,
      this.respuesta3,
    ];

    setTimeout(() => {
      this.escogerPreguntaAleatoria();
    }, 300);
  }

  ngOnInit(): void {}

  desordenarRespuestas(pregunta: any) {
    this.posibles_respuestas = [
      pregunta.respuesta,
      pregunta.incorrecta1,
      pregunta.incorrecta2,
      pregunta.incorrecta3,
    ];
    this.posibles_respuestas.sort(() => Math.random() - 0.5);

    this.respuesta1 = this.posibles_respuestas[0];
    this.respuesta2 = this.posibles_respuestas[1];
    this.respuesta3 = this.posibles_respuestas[2];
    this.respuesta4 = this.posibles_respuestas[3];
  }

  reiniciar() {
    this.cantPreguntas++;
    this.suspender_botones = false;
    for (let index = 0; index < this.estilos.length; index++) {
      this.estilos[index] = 'white';
    }
    if (this.cantPreguntas > 5) {
      this.ckeckJuego();
    } else {
      this.escogerPreguntaAleatoria();
    }
    if (this.cantPreguntas === 5) {
      this.opcion = 'Finalizar';
    } else {
      this.opcion = 'Siguiente';
    }
  }

  escogerPreguntaAleatoria() {
    let n = 0;
    n = Math.floor(Math.random() * this.interprete_bp.length);
    // n = 0

    while (this.npreguntas.includes(n)) {
      n++;
      if (n >= this.interprete_bp.length) {
        n = 0;
      }
      if (this.npreguntas.length === this.interprete_bp.length) {
        this.npreguntas = [];
      }
    }
    this.npreguntas.push(n);
    this.preguntas_hechas++;

    this.escogerPregunta(n);
  }

  oprimir_btn(i: number) {
    if (this.suspender_botones) {
      return;
    }

    this.suspender_botones = true;
    if (this.posibles_respuestas[i] == this.pregunta.respuesta) {
      this.preguntas_correctas++;
      this.estilos[i] = 'lightgreen';
    } else {
      this.estilos[i] = 'pink';
      this.erradas++;
    }
    for (let j = 0; j < 4; j++) {
      if (this.posibles_respuestas[j] == this.pregunta.respuesta) {
        this.estilos[j] = 'lightgreen';
        break;
      }
    }
  }

  escogerPregunta(n: any) {
    this.pregunta = this.interprete_bp[n];
    console.log('id ' + this.pregunta.id);
    this.getImage(this.pregunta.id);
    this.categoria = this.pregunta.categoria;
    this.preguntaActual = this.pregunta.pregunta;

    this.numero = n;
    let pc = this.preguntas_correctas;
    if (this.preguntas_hechas > 1) {
      this.puntaje = pc + '/' + (this.preguntas_hechas - 1);
    } else {
      this.puntaje = '';
    }
    this.desordenarRespuestas(this.pregunta);
    //if (this.pregunta.imagen) {
    // this.imagen = this.pregunta.imagen;
    //  this.estiloImagen = { height: '200px', width: '100%' };
    // } else {
    console.log('this.ierwrmagen ' + this.img[0].largeImageUR);
    // this.imagen = this.img[0].largeImageUR;

    console.log('this.imagen ' + this.imagen);
    //   this.estiloImagen = { "height": '0px', "width": '0px' };
    this.estiloImagen = { height: '200px', width: '100%' };
    // }
  }

  ckeckJuego() {
    if (this.erradas > 2) {
      this.perdiste = 'visible';
      this.resultadoText = 'Perdiste';
    } else {
      this.resultadoText = 'Ganaste';
      this.victoria = 'visible';
    }
    this.resultado = {
      tiempo: 'N/A',
      resultado: this.resultadoText,
      errores: this.erradas,
      clicks: 'N/A',
      correctas: this.preguntas_correctas,
      juego: 'Preguntados',
    };
  }
  clickBoton() {
    this.cantPreguntas = 0;
    this.reiniciar();
    this.puntaje = '';
    this.numero = '';
    this.erradas = 0;
    this.perdiste = '';
    this.victoria = '';
    this.start = '';
    this.preguntas_correctas = 0;
  }
  async getImg(imagen: any) {
    this.img = imagen;
  }
  getImage(id: string) {
    this.svcImg.getImgById(id).subscribe((data) => {
      this.im = data;
      console.log('imagenes ' + JSON.stringify(data));
      console.log('imagenes ', this.im);
      //  this.img.push(this.im.hits);
      this.imagen = this.im.hits[0].webformatURL;
      this.estiloImagen = { height: '300px', width: '100%' };
      this.getImg(this.im.hits);
    });
  }
}
