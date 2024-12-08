import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { AuthenLogComponent } from '../../authen/authen-log/authen-log.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sec-a',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AuthenLogComponent],
  templateUrl: './sec-a.component.html',
  styleUrls: ['./sec-a.component.css']
})
export class SecAComponent {
  @ViewChild(AuthenLogComponent) AuthenLogComponent!: AuthenLogComponent;

  constructor(public AuthService: AuthService) { }

  openLogin() {
    this.AuthenLogComponent.openLogin();
  }
}
