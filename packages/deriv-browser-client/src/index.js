import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/worker.js').then(function(registration) {
      console.log('Service worker registered with scope: ', registration.scope);

      if (registration.active && !navigator.serviceWorker.controller) {
        console.log('Service worker not active, soft reloading');
        window.location.reload();
        return;
      }

      navigator.serviceWorker.controller?.postMessage?.('test');
    }, function(err) {
      console.log('Service worker registration failed: ', err);
    });
  });
}

navigator.serviceWorker.addEventListener('message', function(event) {
  if (event.data && event.data.command === 'updateMessages') {
    eventEmitter.emit('change', event.data.messageCount);
  }
});

export default eventEmitter;
