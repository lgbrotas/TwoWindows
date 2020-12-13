import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

let mainWindow;

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#242424',
    show: false,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.webContents.openDevTools();

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Show window when its ready to
  mainWindow.on('ready-to-show', () => mainWindow.show());
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


// https://stackoverflow.com/questions/44008674/how-to-import-the-electron-ipcrenderer-in-a-react-webpack-2-setup


//ipcMain.on("toMain", (event, args) => {
  //fs.readFile("./sample.pdf", (error, data) => {
    // Do something with file contents
    // Send result back to renderer process
    //mainWindow.webContents.send("fromMain", data);
  //});
//});

ipcMain.handle('my-invokable-ipc', async (event, ...args) => {
  const result = await somePromise(...args);
  return result;
})


// https://github.com/electron/electron/issues/21437#issuecomment-573522360

ipcMain.on("request", (IpcMainEvent, args) => {
    // Use node module (ie. "fs");
    // perhaps save value of args.data to file with a timestamp

    mainWindow.webContents.send("response", {
        success: true
    });
});
