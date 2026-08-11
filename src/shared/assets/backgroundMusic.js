import animaBackingTrack1 from 'assets/backgound_music/anima-backing-track-1.mp3';
import anima432BackingTrack1 from 'assets/backgound_music/anima432-backing-track-1.mp3';

export const backgroundMusicTracks = [
  {
    key: 'animaBackingTrack1',
    drumKey: 'Anima',
    title: 'Anima Backing Track #1',
    src: animaBackingTrack1,
  },
  {
    key: 'anima432BackingTrack1',
    drumKey: 'Anima432',
    title: 'Anima 432Hz Backing Track #1',
    src: anima432BackingTrack1,
  },
];

export const getBackgroundMusicTrackForDrum = drumKey =>
  backgroundMusicTracks.find(track => track.drumKey === drumKey) || null;
