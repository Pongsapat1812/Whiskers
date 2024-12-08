import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-icon-a',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './icon-a.component.html',
  styleUrl: './icon-a.component.css'
})
export class IconAComponent implements OnInit, OnDestroy {
  target: string[] = ['#a'];
  private authSubscription: Subscription | null = null;

  constructor(private AuthService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.AuthService.authorized$.subscribe((isAuthorized) => {
      this.target = isAuthorized ? ['#f', '#g'] : ['#a'];
    });
  }

  async onClick(event: Event) {
    event.preventDefault();
    for (const id of this.target) {
      const targetElement = document.querySelector(id);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
