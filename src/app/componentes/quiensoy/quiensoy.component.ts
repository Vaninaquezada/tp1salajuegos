import { Component } from '@angular/core';
import { GitService } from '../../services/git.service';
@Component({
  selector: 'app-quiensoy',
  imports: [],
  templateUrl: './quiensoy.component.html',
  styleUrl: './quiensoy.component.css',
})
export class QuiensoyComponent {
  datos: any;
  constructor(private gitSvc: GitService) {
    this.datos = {
      name: '',
      avatar_url: '',
      login: '',
    };
  }
  ngOnInit(): void {
    this.gitSvc.getGitHubInfo().subscribe((resultado: any) => {
      setTimeout(() => {
        next: this.datos = resultado;
        console.log(this.datos);
      }, 1000);
    });
  }
}
