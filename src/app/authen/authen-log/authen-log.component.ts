import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-authen-log',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './authen-log.component.html',
  styleUrl: './authen-log.component.css'
})
export class AuthenLogComponent {
  showLogin = false;
  isLogin = true;
  email: string = '';
  password: string = '';
  showCredential: boolean = false;

  constructor(private AuthService: AuthService) { }

  openLogin() {
    this.showLogin = true;
    this.isLogin = true;
  }

  closeLogin() {
    this.showLogin = false;
  }

  auth() {
    this.isLogin = !this.isLogin;
    this.email = '';
    this.password = '';
  }

  submit() {
    if (this.isLogin) {
      this.AuthService.login(this.email, this.password);
    }
    this.email = '';
    this.password = '';
    this.closeLogin();
  }

  toggle(): void {
    this.showCredential = !this.showCredential;
  }
}
