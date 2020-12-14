const {
  contextBridge,
  ipcRenderer
} = require("electron")
contextBridge.exposeInMainWorld(
  "api", {
      send: (channel, data) => {
          ipcRenderer.invoke(channel, data).catch(e => console.log(e))
      },
      receive: (channel, func) => {
        ipcRenderer.invoke(channel, (event, ...args) => func(...args)).catch(e => console.log(e))
      }
  }
)