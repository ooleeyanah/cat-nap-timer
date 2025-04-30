const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  getSoundPath: (filename = 'Sweet-UI-Click.wav') => {
    // Use an absolute path to the sound file
    return path.join(__dirname, 'sounds', filename);
  }
});

