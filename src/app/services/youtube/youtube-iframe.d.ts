declare namespace YT {
  export class Player {
    constructor(element: string | HTMLElement, options: object);
    loadVideoById(videoId: string): void;
    playVideo(): void;
    pauseVideo(): void;
    setVolume(volume: number): void;
  }

  export interface PlayerEvent {
    target: Player;
  }
}
