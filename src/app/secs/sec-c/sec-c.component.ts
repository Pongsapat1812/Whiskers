import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sec-c',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './sec-c.component.html',
  styleUrl: './sec-c.component.css'
})
export class SecCComponent {
  constructor(public AuthService: AuthService) { }
}
