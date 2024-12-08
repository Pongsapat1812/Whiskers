import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-authen-reg',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './authen-reg.component.html',
  styleUrls: ['./authen-reg.component.css']
})
export class AuthenRegComponent {
  showLogin = false;
  showRegis = false;
  email: string = '';
  password: string = '';
  feedbackMessage: string = '';

  constructor(private AuthService: AuthService) { }

  closeRegis() {
    this.showRegis = false;
  }

  closeLogin() {
    this.showLogin = false;
  }

  auth(form: string) {
    if (form === 'login') {
      this.showRegis = false;
      this.showLogin = true;
    } else if (form === 'register') {
      this.showLogin = false;
      this.showRegis = true;
    }
  }

  submit() {
    this.AuthService.register(this.email, this.password).then(() => {
      this.email = '';
      this.password = '';
      this.closeRegis();
      this.feedbackMessage = 'Registration successful! Please log in.';
    }).catch((error) => {
      this.feedbackMessage = error || 'Registration failed. Please try again.';
    });

  }

}
