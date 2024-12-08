import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccDeactComponent } from '../acc-deact/acc-deact.component';
@Component({
  selector: 'app-acc-cred',
  standalone: true,
  imports: [CommonModule, FormsModule, AccDeactComponent],
  templateUrl: './acc-cred.component.html',
  styleUrl: './acc-cred.component.css'
})
export class AccCredComponent {
  @Input() showAccount: boolean = false;
  email: string = '';
  pwd1: string = '';
  pwd2: string = '';
  pwd3: string = '';
  cred1: boolean = false;
  cred2: boolean = false;
  cred3: boolean = false;

  imageSrc: string | ArrayBuffer | null = null;
  showDeactivation: boolean = false;

  closeAccount() {
    this.showAccount = false;
  }

  oldpwd(): void {
    this.cred2 = !this.cred2;
  }

  newpwd(): void {
    this.cred3 = !this.cred3;
  }

  upload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  openDeactivation() {
    this.showDeactivation = true;
  }

  closeDeactivation() {
    this.showDeactivation = false;
  }
}
