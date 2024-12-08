import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { StateService } from '../../services/state/state.service';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms';    // Import FormsModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-icon-e',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './icon-e.component.html',
  styleUrl: './icon-e.component.css'
})
export class IconEComponent {
  constructor(
    public AuthService: AuthService,
    private StateService: StateService
  ) {}

  isAuthorized() {
    return this.AuthService.isAuthorized();
  }

  logout() {
    this.AuthService.logout();
    this.StateService.logout();
  }
}
