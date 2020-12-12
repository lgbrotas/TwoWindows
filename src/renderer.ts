import './app';

console.log('renderer.js is so happy to say you 👋 hello....');

window.electron.doThing();

//const electron = window.require('electron');

//import { ipcRenderer, BrowserWindow } from 'electron';

//ipcRenderer.on('messageFromMain', (event, message) => {
//  console.log(`This is the message from the second window sent via main: ${message}`);
//});

//async () => {
//  const result = await ipcRenderer.invoke('my-invokable-ipc', "this is my message")
  // ...
//}
