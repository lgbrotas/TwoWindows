import { ipcRenderer, contextBridge, BrowserWindow} from 'electron';
import path from 'path';

console.log('preload.js says 🎉hoooraay!');

// Get versions
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  // Packages version
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(
      `${type}-version`,
      process.versions[type as keyof typeof process.versions],
    );
  }
});

// https://github.com/electron/electron/issues/21437#issuecomment-573522360

contextBridge.exposeInMainWorld('myapi', {
  request: (data) => ipcRenderer.send("request", {
    data,
  }),
  onResponse: (fn) => {
    // Deliberately strip event as it includes `sender`
    ipcRenderer.on('response', (event, ...args) => fn(...args));
  }
})

// https://www.electronjs.org/docs/api/context-bridge#contextbridge
// https://github.com/electron/electron/issues/21437


//contextBridge.exposeInMainWorld(
//  'electron',
//  {
//    doThing: () => ipcRenderer.send('do-a-thing')
//  }
//)


// https://www.electronjs.org/docs/all#api-objects


let secondWindow;

// https://www.electronjs.org/docs/all#behavior-changed-sending-non-js-objects-over-ipc-now-throws-an-exception
// Sending non-serializable objects throws an "object could not be cloned" error

//contextBridge.exposeInMainWorld('electron', {
  //openNewWindow: () => {
    //secondWindow = new BrowserWindow({width: 1000, height: 1200});  
  //}
//});


//const openSecondWindow = (): BrowserWindow => {
  //const win = new BrowserWindow({width: 1000, height: 1200 });
  //return win;
//}

//contextBridge.exposeInMainWorld('electron', {
  //openNewWindow: () => ipcRenderer.send('open-second-window', openSecondWindow());
//});

//contextBridge.exposeInMainWorld('electron', {
  //openNewWindow: () => secondWindow = new BrowserWindow({width: 1000, height: 1200});
//});

contextBridge.exposeInMainWorld('electron', {
  openNewWindow: () => ({
    return new BrowserWindow({width: 1000, height: 1200 });
  })
});
