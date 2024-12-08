import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AuthenLogComponent } from '../../authen/authen-log/authen-log.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackService } from '../../services/feedback/feedback.service';

// Define an interface to match the structure of feedback data
interface Feedback {
  feedback: string;
  timestamp: string;
}

@Component({
  selector: 'app-sec-e',
  standalone: true,
  imports: [CommonModule, FormsModule, AuthenLogComponent, HttpClientModule],
  providers: [FeedbackService],
  templateUrl: './sec-e.component.html',
  styleUrls: ['./sec-e.component.css'],
})
export class SecEComponent implements OnInit {
  @ViewChild(AuthenLogComponent) AuthenLogComponent!: AuthenLogComponent;
  feedbacks: Feedback[] = [];

  constructor(
    public AuthService: AuthService,
    private feedbackService: FeedbackService
  ) { }

  ngOnInit(): void {
    this.fetchFeedbacks(); 
  }

  openLogin() {
    this.AuthenLogComponent.openLogin();
  }

  fetchFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (feedbacks) => {
        this.feedbacks = feedbacks; 
      },
      (error) => {
        console.error('Error fetching feedbacks:', error); 
      }
    );
  }
}
