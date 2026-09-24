const video = document.getElementById('my-video');
const playBtn = document.getElementById('play-btn');
const seekBar = document.getElementById('seek-bar');
const timeDisplay = document.getElementById('time-display');
const muteBtn = document.getElementById('mute-btn');

// Format seconds into mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Toggle Play & Pause
function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
    playBtn.textContent = 'Pause';
  } else {
    video.pause();
    playBtn.textContent = 'Play';
  }
}

playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

// Set up seek bar range when metadata loads
video.addEventListener('loadedmetadata', () => {
  seekBar.max = video.duration;
  timeDisplay.textContent = `0:00 / ${formatTime(video.duration)}`;
});

// Keep track of playback progression
video.addEventListener('timeupdate', () => {
  seekBar.value = video.currentTime;
  timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration || 0)}`;
});

// Scrubbing / seeking
seekBar.addEventListener('input', () => {
  video.currentTime = seekBar.value;
});

// Toggle Mute
muteBtn.addEventListener('click', () => {
  video.muted = !video.muted;
  muteBtn.textContent = video.muted ? 'Unmute' : 'Mute';
});
