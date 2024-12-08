import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acc-deact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './acc-deact.component.html',
  styleUrl: './acc-deact.component.css'
})

export class AccDeactComponent {
  email: string = '';

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<string>();

  cancel() {
    this.close.emit();
  }

  deact() {
    if (this.email) {
      this.confirm.emit(this.email);
      this.logout();
      this.close.emit();
    }
  }

  logout() {
    localStorage.removeItem('userToken');
    sessionStorage.removeItem('userToken');
    window.location.href = '/login';
  }
}
