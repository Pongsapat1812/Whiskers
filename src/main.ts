import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([{ path: '', component: AppComponent }]), // Add your routes here
  ],
}).catch(err => console.error(err));
