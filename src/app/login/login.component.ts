import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
email: string='';
password: string='';

constructor(private  AS:AuthService, private router:Router) { }
login() {
  // appeler la fct du service
  this.AS.signInWithEmailAndPassword(this.email, this.password)
    .then(() => {
      //action si je suis authentifié
      this.router.navigate(['/member']);
    })
  
}
}
