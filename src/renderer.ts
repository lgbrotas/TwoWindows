import './app';

console.log('renderer.js is so happy to say you 👋 hello....');

window.electron.doThing();

//const electron = window.require('electron');

import { ipcRenderer, BrowserWindow } from 'electron';

// https://github.com/electron/electron/issues/21437#issuecomment-573522360

class LibraryClass {
  classValue: number;
  constructor(myValue = 1) {
    this.classValue = myValue;
    window.myapi.onResponse((args) => {
      if (args.success) this.classValue++;
    });
  }
  send() {
    window.myapi.request(this.classValue);
  }
}

