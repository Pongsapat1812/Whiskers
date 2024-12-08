import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { AuthenLogComponent } from '../../authen/authen-log/authen-log.component';
import { AccCredComponent } from '../../accs/acc-cred/acc-cred.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-icon-b',
  standalone: true,
  imports: [CommonModule, AuthenLogComponent, AccCredComponent, HttpClientModule],
  templateUrl: './icon-b.component.html',
  styleUrl: './icon-b.component.css'
})
export class IconBComponent implements OnInit, OnDestroy {
  @ViewChild(AuthenLogComponent) AuthenLogComponent!: AuthenLogComponent;
  openAccount: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private AuthService: AuthService) {}

  ngOnInit() {
    this.subscription = this.AuthService.authorized$.subscribe(isAuthorized => {
      if (!isAuthorized) {
        this.openAccount = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openLogin() {
    if (this.AuthService.isAuthorized()) {
      this.openAccount = !this.openAccount;
    } else {
      this.AuthenLogComponent.openLogin();
    }
  }

  logout() {
    this.AuthService.logout();
    this.openAccount = false;
  }
}
