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
import { ConfirmedValidator } from '../../clases/confirmed-validator';
@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  message: string = '';

  registerForm!: FormGroup;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        passwordR: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      {
        validator: ConfirmedValidator('password', 'passwordR'),
      }
    );
  }

  async onRegister() {
    const { email, password } = this.registerForm.value;
    console.log('onregister');
    try {
      const user = this.authSvc.registro(email!, password!);
      console.log('rty');
      if (await user) {
        //this.authSvc.login(email,password);
        console.log('registrado');
        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      console.log(error);
      this.message = error.message;
    }
  }
}
