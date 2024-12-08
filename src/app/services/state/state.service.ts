import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Cat {
  name: string;
  attribute: string;
  imgSrc: string;
  song: string;
  signatureSongId: string;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private sourceReady = new BehaviorSubject<boolean>(false);
  private sourceChoose = new BehaviorSubject<Cat | null>(null);
  private sourceSecF = new BehaviorSubject<boolean>(true);
  private sourceCurrentSong = new BehaviorSubject<string | null>(null);
  private soundStateSubject = new BehaviorSubject<boolean>(false);
  private logoutSubject = new BehaviorSubject<boolean>(false);

  ready$ = this.sourceReady.asObservable();
  choose$ = this.sourceChoose.asObservable();
  showSecF$ = this.sourceSecF.asObservable();
  currentSongName$ = this.sourceCurrentSong.asObservable();
  soundState$ = this.soundStateSubject.asObservable();
  logout$ = this.logoutSubject.asObservable();

  setReady(ready: boolean) {
    this.sourceReady.next(ready);
  }

  setChoose(cat: Cat | null) {
    this.sourceChoose.next(cat);
  }

  setShowSecF(showSecF: boolean) {
    this.sourceSecF.next(showSecF);
  }

  setCurrentSong(songName: string | null) {
    this.sourceCurrentSong.next(songName);
  }

  setSoundState(isMuted: boolean) {
    this.soundStateSubject.next(isMuted);
  }

  logout() {
    this.logoutSubject.next(true);
    this.setCurrentSong(null);
    this.setSoundState(true);
  }
}
