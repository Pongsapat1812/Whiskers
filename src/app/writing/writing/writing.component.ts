import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-writing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.css']
})
export class WritingComponent {
  @Input() isAuthorized: boolean = false;
  @Input() showWriting: boolean = false;

  fromInput = '';
  toInput = '';
  messageInput = '';
  feedback = '';

  constructor(private http: HttpClient) { }
  closeNote() {
    this.showWriting = false;
  }

  submitMessage() {
    console.log('Message Submitted:', {
      from: this.fromInput,
      message: this.messageInput,
      to: this.toInput,
    });
    this.fromInput = '';
    this.messageInput = '';
    this.toInput = '';
  }

  submitFeedback() {
    const payload = {
      feedback: this.feedback,
    };

    this.http.post('http://localhost:3000/feedback', payload).subscribe({
      next: (response) => {
        console.log('Feedback saved successfully:', response);
        this.feedback = ''; 
        this.showWriting = false;
      },
      error: (error) => {
        console.error('Error saving feedback:', error);
      },
    });
  }

}
