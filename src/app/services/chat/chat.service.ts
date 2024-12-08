import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    getMessages(roomId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/chats/${roomId}`);
    }

    sendMessage(roomId: string, sender: string, message: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/chats`, { roomId, sender, message });
    }
}
