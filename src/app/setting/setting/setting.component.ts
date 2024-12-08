import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '../../services/state/state.service';
import { Subscription } from 'rxjs';
import { catsA } from '../../cats/cat-a';
import { catsB } from '../../cats/cat-b';
import { catsC } from '../../cats/cat-c';
import { catsD } from '../../cats/cat-d';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setting',
  imports: [FormsModule, CommonModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit, OnDestroy {
  @Input() isAuthorized: boolean = false;
  @Input() showSetting: boolean = false;

  private currentSongName: string | null = null;
  private currentSongId: string | null = null;

  private youtubePlayer: YT.Player | null = null;
  private songSubscription: Subscription | null = null;
  private songStateSubscription: Subscription | null = null;
  private logoutSubscription: Subscription | null = null;

  videoStarted: boolean = false;
  volume: number = 5;

  constructor(private StateService: StateService) {}

  ngOnInit() {
    this.subscribeToStateChanges();
  }

  ngOnDestroy() {
    this.cleanupSubscriptions();
    if (this.youtubePlayer) this.stopVideo();
  }

  private subscribeToStateChanges() {
    this.songSubscription = this.StateService.currentSongName$.subscribe(songName => {
      this.currentSongName = songName;
      const song = this.findSongInCats(songName);
      this.currentSongId = song ? song.signatureSongId : null;

      if (this.videoStarted) {
        this.startVideo();
      }
    });

    this.songStateSubscription = this.StateService.soundState$.subscribe(isMuted => {
      if (isMuted) {
        this.stopVideo();
      } else {
        this.startVideo();
      }
    });

    this.logoutSubscription = this.StateService.logout$.subscribe(() => {
      this.stopVideo();
      this.currentSongName = null;
      this.currentSongId = null;
      this.videoStarted = false;
    });
  }

  private cleanupSubscriptions() {
    if (this.songSubscription) this.songSubscription.unsubscribe();
    if (this.songStateSubscription) this.songStateSubscription.unsubscribe();
    if (this.logoutSubscription) this.logoutSubscription.unsubscribe();
  }

  closeSetting() {
    this.showSetting = false;
  }

  startVideo() {
    if (this.currentSongId) {
      if (this.youtubePlayer) {
        this.youtubePlayer.loadVideoById(this.currentSongId);
        this.youtubePlayer.playVideo();
        this.youtubePlayer.setVolume(this.volume);
      } else {
        this.initializePlayer();
      }
      this.StateService.setSoundState(false);
      this.videoStarted = true;
    } else {
      console.warn('No song selected to play!');
    }
  }

  private initializePlayer() {
    if (this.currentSongId) {
      this.youtubePlayer = new YT.Player('youtube-player', {
        videoId: this.currentSongId,
        height: '1',
        width: '1',
        events: {
          'onReady': (event: YT.PlayerEvent) => {
            event.target.playVideo();
            event.target.setVolume(this.volume);
          },
          'onStateChange': (event: YT.PlayerEvent) => {}
        }
      });
    }
  }

  private stopVideo() {
    if (this.youtubePlayer) {
      (this.youtubePlayer as any).stopVideo();
      (this.youtubePlayer as any).destroy();
      this.youtubePlayer = null;
      this.videoStarted = false;
    }
  }

  adjustVolume() {
    if (this.youtubePlayer) {
      this.youtubePlayer.setVolume(this.volume);
    }
  }

  private findSongInCats(songName: string | null) {
    const allCats = [...catsA, ...catsB, ...catsC, ...catsD];
    return allCats.find(cat => cat.song === songName);
  }
}