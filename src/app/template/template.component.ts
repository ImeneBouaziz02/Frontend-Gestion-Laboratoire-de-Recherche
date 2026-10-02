import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})

export class TemplateComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.signOut()
      .then(() => {
        console.log('User logged out');
        this.router.navigate(['/login']); // redirection après logout
      })
      .catch(error => console.error('Logout error:', error));
  }
}