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

contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: () => ipcRenderer.send('do-a-thing')
  }
)

// https://stackoverflow.com/questions/44008674/how-to-import-the-electron-ipcrenderer-in-a-react-webpack-2-setup

//import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
//contextBridge.exposeInMainWorld(
    //"api", {
        //send: (channel, data) => {
        //request: (channel, data) => {
            // whitelist channels
            //let validChannels = ["toMain"];
            //if (validChannels.includes(channel)) {
                //ipcRenderer.send(channel, data);
            //}
        //},
        //receive: (channel, func) => {
        //response: (channel, func) => {
            //let validChannels = ["fromMain"];
            //if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                //ipcRenderer.on(channel, (event, ...args) => func(...args));
            //}
        //}
    //}
//);

