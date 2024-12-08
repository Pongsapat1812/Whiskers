import { Component, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { AccCredComponent } from './accs/acc-cred/acc-cred.component';
import { AccDeactComponent } from './accs/acc-deact/acc-deact.component';
import { AuthenLogComponent } from './authen/authen-log/authen-log.component';
import { AuthenRegComponent } from './authen/authen-reg/authen-reg.component';
import { IconAComponent } from './icons/icon-a/icon-a.component';
import { IconBComponent } from './icons/icon-b/icon-b.component';
import { IconCComponent } from './icons/icon-c/icon-c.component';
import { IconDComponent } from './icons/icon-d/icon-d.component';
import { IconEComponent } from './icons/icon-e/icon-e.component';
import { SecAComponent } from './secs/sec-a/sec-a.component';
import { SecBComponent } from './secs/sec-b/sec-b.component';
import { SecCComponent } from './secs/sec-c/sec-c.component';
import { SecDComponent } from './secs/sec-d/sec-d.component';
import { SecEComponent } from './secs/sec-e/sec-e.component';
import { SecFComponent } from './secs/sec-f/sec-f.component';
import { SecGComponent } from './secs/sec-g/sec-g.component';
import { SecHComponent } from './secs/sec-h/sec-h.component';
import { WritingComponent } from './writing/writing/writing.component';
import { SettingComponent } from './setting/setting/setting.component';
import { FeedbackService } from './services/feedback/feedback.service';
import { ChatService } from './services/chat/chat.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AccCredComponent, AuthenLogComponent, AuthenRegComponent,
    IconAComponent, IconBComponent, IconCComponent, IconDComponent, IconEComponent,
    SecAComponent, SecBComponent, SecCComponent, SecDComponent, SecEComponent, SecFComponent, SecGComponent, SecHComponent,
    WritingComponent, SettingComponent,HttpClientModule
  ],
  providers: [FeedbackService,ChatService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hello, whiskers';
}