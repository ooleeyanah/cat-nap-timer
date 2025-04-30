let originalDuration = 0;
let timeLeft = 0;
let timerInterval = null;
// Start timer & text
function startTimer(duration) {
  clearInterval(timerInterval); 

  timeLeft = duration;
  const countdownEl = document.getElementById('countdown');

  countdownEl.textContent = `${timeLeft} seconds remaining`;

  timerInterval = setInterval(() => {
    timeLeft--;

    if (timeLeft > 0) {
      countdownEl.textContent = `${timeLeft} seconds remaining`;
    } else {
      clearInterval(timerInterval);
      countdownEl.textContent = "Wake up!";

      // Play Cat-Meowing.mp3 when the timer is done
      const endSound = new Audio(window.electron.getSoundPath('Cat-Meowing.mp3'));
      endSound.play().catch(err => console.error('Sound play error:', err));
    }
  }, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  originalDuration = parseInt(params.get('duration'), 10);

  if (isNaN(originalDuration)) {
    document.getElementById('countdown').textContent = 'Invalid timer duration.';
    return;
  }

  // Back to choose
  const backBtn = document.getElementById('goBackBtn');
  backBtn.addEventListener('click', () => {
    console.log('Back to Choose button clicked');
    const clickSound = new Audio(window.electron.getSoundPath()); // Define clickSound here
    clickSound.play().catch(err => console.error('Sound play error:', err));

    setTimeout(() => {
      window.electron.send('go-back-to-choose');
    }, 300);
  });

  startTimer(originalDuration);

  // Restart
  const restartBtn = document.getElementById('restartBtn');
  restartBtn.addEventListener('click', () => {
    console.log('Restart button clicked');
    const clickSound = new Audio(window.electron.getSoundPath()); // Define clickSound here
    clickSound.play().catch(err => console.error('Sound play error:', err));

    startTimer(originalDuration);
  });
});
