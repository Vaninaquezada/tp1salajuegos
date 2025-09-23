import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../../clases/usuario';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  user$!: Observable<Usuario>;
  usuario$!: Observable<Usuario>;
  usuario!: any;
  constructor(private authSvc: AuthService, private router: Router) {
    this.user$ = this.authSvc.user$;

    this.authSvc.user$.subscribe((usuario) => {
      this.usuario = usuario;
    });
  }
  async logOut() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
