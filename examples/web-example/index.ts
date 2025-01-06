import { Focusse } from 'focusse';

// Initialize the Focusse instance
const modal = document.getElementById('modal');
const focusLock = new Focusse(modal!);

// Event listener to activate focus lock on the modal
document.getElementById('open-modal')?.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'block';
    focusLock.activate();
  }
});

// Event listener to deactivate focus lock and close the modal
document.getElementById('close-modal')?.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'none';
    focusLock.deactivate();
  }
});
