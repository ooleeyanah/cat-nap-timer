window.addEventListener('DOMContentLoaded', () => {
  console.log('Renderer loaded');

  const soundPath = window.electron.getSoundPath();
  console.log('Sound path:', soundPath); // Debug log to confirm the path

  const buttons = document.querySelectorAll('button');

  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault(); // prevent immediate action
      const buttonId = button.id;
      console.log(`Button ${buttonId} clicked`);

      // Create a new Audio object for each click
      const clickSound = new Audio(soundPath);
      clickSound.play()
        .then(() => console.log('Sound played successfully'))
        .catch(err => console.error('Sound play error:', err));

      // Delay the action
      setTimeout(() => {
        // Perform different actions based on button ID
        switch (buttonId) {
          case 'startBtn':
            console.log('Sending start-timer');
            window.electron.send('start-timer');
            break;

          case 'goBackBtn':
            console.log('Sending go-back-to-choose');
            window.electron.send('go-back-to-choose');
            break;

          case 'restartBtn': // Add this case for the restart button
            console.log('Sending restart-timer');
            window.electron.send('restart-timer');
            break;

          case 'startCountdownBtn':
            const duration = 60; // Replace with actual value if dynamic
            console.log('Sending start-countdown with', duration);
            window.electron.send('start-countdown', duration);
            break;

          default:
            console.log('No action defined for this button');
        }
      }, 300);
    });
  });
});