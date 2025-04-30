const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 545,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false, // Disable sandbox to allow Node.js modules in preload
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('start-timer', () => {
    if (mainWindow) {
      // Wait a short time before navigating to give the sound time to play
      setTimeout(() => {
        mainWindow.loadFile('timer-choose.html');
      }, 300); // 300ms delay
    }
  });
  
  ipcMain.on('start-countdown', (event, duration) => {
    console.log(`Navigating to timer-go.html with duration: ${duration} seconds`);
  
    if (mainWindow) {
        const url = `file://${__dirname}/timer-go.html?duration=${duration}`;
        mainWindow.loadURL(url);
      
    }
  });
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();

  })
  ipcMain.on('go-back-to-choose', () => {
    console.log('Received go-back-to-choose event');
    if (mainWindow) {
      mainWindow.loadFile('timer-choose.html');
    }
  });
  ;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

