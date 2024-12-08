import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingComponent } from '../../setting/setting/setting.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-icon-d',
  standalone: true,
  imports: [CommonModule, FormsModule, SettingComponent, HttpClientModule],
  templateUrl: './icon-d.component.html',
  styleUrl: './icon-d.component.css'
})
export class IconDComponent {
  showSetting = false;

  constructor(public authService: AuthService) {}

  isAuthorized() {
    return this.authService.isAuthorized();
  }

  openSetting() {
    if (this.isAuthorized()) {
      this.showSetting = !this.showSetting;
    }
  }
}
