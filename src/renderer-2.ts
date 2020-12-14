// import './app-2'

const sendMessageButton = document.getElementById('send-message');

sendMessageButton.addEventListener('click', event => {
  window.myapi.request('reply', `Send message from second window to renderer via main.`);
  window.close();
});
