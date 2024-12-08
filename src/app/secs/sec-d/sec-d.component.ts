import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { catsA } from '../../cats/cat-a';
import { catsB } from '../../cats/cat-b';
import { catsC } from '../../cats/cat-c';
import { catsD } from '../../cats/cat-d';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-sec-d',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './sec-d.component.html',
  styleUrl: './sec-d.component.css'
})
export class SecDComponent {
  cats = [...catsA, ...catsB, ...catsC, ...catsD];

  constructor(public AuthService: AuthService) { }
}
