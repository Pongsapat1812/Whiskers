import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Feedback {
    feedback: string;
    timestamp: string;
}

@Injectable({
    providedIn: 'root',
})
export class FeedbackService {
    private apiUrl = 'http://localhost:3000/feedbacks';

    constructor(private http: HttpClient) { }

    getFeedbacks(): Observable<Feedback[]> {
        return this.http.get<Feedback[]>(this.apiUrl);
    }

    addFeedback(feedback: string): Observable<void> {
        return this.http.post<void>(this.apiUrl, { feedback });
    }
}
