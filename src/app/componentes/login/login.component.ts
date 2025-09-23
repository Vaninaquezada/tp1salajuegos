import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  message: string = '';
  seleccion: string = '';
  usuario: string = '';
  clave: string = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      //console.log("pagina " );
      const user = await this.authService.login(email!, password!);
      if (user) {
        this.message = 'Bienvenido ' + email;
        console.log('pagina 2' + JSON.stringify(user));
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      }
    } catch (error: any) {
      console.log('pagina error ' + error);

      console.log('error.message ' + error.message);
      /*  if (error instanceof Error) {
  
          console.log("error.message " + error.message);
          console.log("error.name " + error);
        }
        */
      this.message = error.message;
    }
  }
  onChange(seleccion: string) {
    console.log(seleccion);
    this.message = '';
    switch (seleccion) {
      case 'admin':
        this.loginForm.setValue({
          email: 'admin@admin.com',
          password: '111111',
        });
        console.log(this.loginForm.value);

        break;
      case 'usuario':
        this.loginForm.setValue({
          email: 'usuario@usuario.com',
          password: '123456',
        });
        console.log(this.loginForm.value);

        break;
      case 'fulanito':
        this.loginForm.setValue({
          email: 'mail@hola.com',
          password: 'clave123',
        });
        break;
    }
  }
}
