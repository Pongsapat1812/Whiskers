import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-sec-b',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './sec-b.component.html',
  styleUrl: './sec-b.component.css'
})
export class SecBComponent {
  constructor(public authService: AuthService) { }
}
