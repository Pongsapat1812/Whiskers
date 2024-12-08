import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WritingComponent } from '../../writing/writing/writing.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-icon-c',
  standalone: true,
  imports: [CommonModule, FormsModule, WritingComponent, HttpClientModule],
  templateUrl: './icon-c.component.html',
  styleUrl: './icon-c.component.css'
})
export class IconCComponent {
  showWriting = false;

  constructor(public authService: AuthService) {}

  isAuthorized() {
    return this.authService.isAuthorized();
  }

  openNote() {
    if (this.isAuthorized()) {
      this.showWriting = !this.showWriting;
    }
  }
}
