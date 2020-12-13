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

import { ipcRenderer, contextBridge } from 'electron';

// https://www.electronjs.org/docs/api/context-bridge#contextbridge
// https://github.com/electron/electron/issues/21437


contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: () => ipcRenderer.send('do-a-thing')
  }
)

// https://github.com/electron/electron/issues/21437#issuecomment-573522360

contextBridge.exposeInMainWorld('myapi', {
  request: (data) => ipcRenderer.send("request", {
    data,
  }),
  onResponse: (fn) => {
    // Deliberately strip event as it includes `sender`
    ipcRenderer.on('response', (event, ...args) => fn(...args));
  }
)

// https://stackoverflow.com/questions/44008674/how-to-import-the-electron-ipcrenderer-in-a-react-webpack-2-setup

