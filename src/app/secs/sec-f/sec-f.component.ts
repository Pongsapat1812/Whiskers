import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { StateService } from '../../services/state/state.service';
import { catsA } from '../../cats/cat-a';
import { catsB } from '../../cats/cat-b';
import { catsC } from '../../cats/cat-c';
import { catsD } from '../../cats/cat-d';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sec-f',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './sec-f.component.html',
  styleUrl: './sec-f.component.css'
})
export class SecFComponent implements OnInit {
  cats = [...catsA, ...catsB, ...catsC, ...catsD];
  choosebtn: boolean[] = new Array(this.cats.length).fill(false);
  showSecF: boolean = true;
  youtubePlayer: YT.Player | null = null;

  constructor(
    public AuthService: AuthService,
    private StateService: StateService
  ) { }

  ngOnInit() {
    this.StateService.showSecF$.subscribe(showSecF => {
      this.showSecF = showSecF;
    });

    this.AuthService.authorized$.subscribe(isAuthorized => {
      if (isAuthorized) {
        this.resetSelections();
      }
    });
  }

  resetSelections() {
    this.choosebtn.fill(false);
    this.StateService.setChoose(null);
  }

  isAuthorized() {
    return this.AuthService.isAuthorized();
  }

  choose(cat: any, index: number) {
    this.choosebtn = this.choosebtn.map(() => false);
    this.choosebtn[index] = true;
    this.StateService.setChoose(cat);
    this.StateService.setCurrentSong(cat.song);
    this.playSong(cat.signatureSongId, index);
  }

  playSong(videoId: string, index: number) {
    if (!videoId) {
      console.error('Video ID not found for the selected cat');
      return;
    }

    if (this.youtubePlayer) {
      this.youtubePlayer.pauseVideo();
      this.youtubePlayer.loadVideoById('');
    }

    this.youtubePlayer = new YT.Player(`youtube-player-${index}`, {
      height: '1',
      width: '1',
      videoId: videoId,
      events: {
        'onReady': (event: YT.PlayerEvent) => {
          event.target.playVideo();
          event.target.setVolume(5);
        }
      }
    });
  }

  trackByCatId(index: number, cat: any): any {
    return cat.name;
  }

  ready() {
    if (!this.isAuthorized()) {
      return;
    }
    if (this.choosebtn.some(btn => btn)) {
      this.StateService.setReady(true);
      this.StateService.setShowSecF(false);
    }
  }
}

