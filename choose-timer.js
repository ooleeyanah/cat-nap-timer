window.addEventListener('DOMContentLoaded', () => {
  console.log('Timer Choose page loaded');

  const soundPath = window.electron.getSoundPath();
  const clickSound = new Audio(soundPath);
  clickSound.load();

  const timerButtons = document.querySelectorAll('.timer-btn');

  timerButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();

      const duration = parseInt(button.getAttribute('data-time'), 10);
      console.log(`Timer button clicked: ${duration} seconds`);

      clickSound.play().catch(err => console.error('Sound play error:', err));

      setTimeout(() => {
        window.electron.send('start-countdown', duration);
      }, 300); // Delay action to allow sound to finish
    });
  });
});
