import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const SAVED_TIME = 'videoplayer-current-time';

player.on(
  'timeupdate',
  throttle(function (e) {
    let playedTime = e.seconds;
    localStorage.setItem(SAVED_TIME, playedTime);
  }, 1000)
);

const localStoredPlaytime = localStorage.getItem(SAVED_TIME);

if (localStoredPlaytime) {
  player.setCurrentTime(localStoredPlaytime);
}
