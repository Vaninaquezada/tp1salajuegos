import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Encuesta } from '../../clases/encuesta';
import { AuthService } from '../../services/auth.service';
import { EncuestaService } from '../../services/encuesta.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encuesta',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css',
})
export class EncuestaComponent {
  public formGroup!: FormGroup;
  mail!: any;
  encuesta: Encuesta = {};

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private enSvc: EncuestaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getmail();
    this.formGroup = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      apellido: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      edad: [
        '',
        [
          Validators.required,
          Validators.min(18),
          Validators.max(99),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      sexo: ['', Validators.required],
      telefono: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      pregunta2: ['', Validators.required],
      pregunta1: ['', Validators.required],
      pregunta3: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  enviar() {
    this.encuesta = {
      pregunta1: '¿Le gusto la pagina?',
      respuesta1: this.formGroup.get('pregunta1')!.value,
      pregunta2: '¿Que juegos que le gustaria ver en la pagina?',
      respuesta2: this.formGroup.get('pregunta2')!.value,
      pregunta3: '¿Cual es su juego favorito?',
      respuesta3: this.formGroup.get('pregunta3')!.value,
      nombre: this.formGroup.get('nombre')!.value,
      apellido: this.formGroup.get('apellido')!.value,
      edad: this.formGroup.get('edad')!.value,
      telefono: this.formGroup.get('telefono')!.value,
      sexo: this.formGroup.get('sexo')!.value,
      user: this.formGroup.get('email')!.value,
    };
    console.log(this.formGroup.get('apellido')!.value);

    this.enSvc.addEncuesta(this.encuesta);
    this.router.navigate(['/home']);
  }
  async getmail() {
    this.mail = this.authSvc.getUsuarioFire()!.email;
  }
}
