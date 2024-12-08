import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { StateService } from '../../services/state/state.service';
import { ChatService } from '../../services/chat/chat.service';
import { Subscription } from 'rxjs';
import { catsA } from '../../cats/cat-a';
import { catsB } from '../../cats/cat-b';
import { catsC } from '../../cats/cat-c';
import { catsD } from '../../cats/cat-d';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sec-g',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './sec-g.component.html',
  styleUrls: ['./sec-g.component.css']
})
export class SecGComponent implements OnInit, OnDestroy {
  ready = false;
  choose: any = null;
  selectedSong: string | null = null;
  showSecF = true;
  private subscriptions: Subscription[] = [];

  youtubePlayer: YT.Player | null = null;
  showVideo = false;

  messages: any[] = [];
  newMessage = '';
  roomId = 'default-room';
  currentUser = '';

  constructor(
    public authService: AuthService,
    private stateService: StateService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.stateService.ready$.subscribe((ready) => {
        this.ready = ready;
      }),
      this.stateService.choose$.subscribe((choose) => {
        this.choose = choose;
        if (this.choose) {
          this.selectedSong = this.choose.song;
          this.playSong(this.selectedSong);
        }
      }),
      this.stateService.showSecF$.subscribe((showSecF) => {
        this.showSecF = showSecF;
      }),
      this.authService.authorized$.subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          this.back();
        }
      }),
      this.stateService.logout$.subscribe(() => {
        this.stopVideo();
      })
    );

    this.chatService.getMessages(this.roomId).subscribe((messages) => {
      this.messages = messages;
    });

    const user = this.authService.getUser();
    if (user) {
      this.currentUser = user.email || '';
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.stopVideo();
  }

  back() {
    this.stateService.setReady(false);
    this.stateService.setChoose(null);
    this.stateService.setShowSecF(true);
    this.showVideo = false;
  }

  openSettings() {
    if (this.choose) {
      this.selectedSong = this.choose.song;
      this.playSong(this.selectedSong);
      this.showVideo = true;
    }
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.roomId, this.currentUser, this.newMessage).subscribe(
        (message) => {
          console.log('Message sent successfully:', message);
          this.messages.push(message);
          this.newMessage = '';
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );
    }
  }

  playSong(song: string | null) {
    if (!song) {
      console.error('No song selected to play!');
      return;
    }

    const songDetails = this.findSongInCats(song);
    if (!songDetails) {
      console.error('Song not found:', song);
      return;
    }

    const videoId = songDetails.signatureSongId;

    if (this.youtubePlayer) {
      this.youtubePlayer.pauseVideo();
      this.youtubePlayer.loadVideoById(videoId);
    } else {
      this.youtubePlayer = new YT.Player('youtube-player-sec-g', {
        height: '360', 
        width: '640',
        videoId: videoId,
        events: {
          onReady: (event: YT.PlayerEvent) => {
            event.target.playVideo();
          },
        },
      });
    }
  }

  private stopVideo() {
    if (this.youtubePlayer) {
      this.youtubePlayer.pauseVideo();
      this.youtubePlayer.loadVideoById('');
      this.youtubePlayer = null;
    }
    this.showVideo = false;
  }
  private findSongInCats(songName: string | null) {
    const allCats = [...catsA, ...catsB, ...catsC, ...catsD];
    return allCats.find((cat) => cat.song === songName);
  }
}
