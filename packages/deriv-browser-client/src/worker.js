let timer;
let data = [];

async function sendToAll () {
  data.push(data.length + 1);

  const clients = await self.clients.matchAll()

  clients.forEach(client => {
    client.postMessage({command: 'updateMessages', messageCount: data.length});
  });
}

timer = setInterval(sendToAll, 1000);

self.addEventListener('install', function(event) {
  event.waitUntil(async function() {
    console.log('Service worker installed');
  }());
});

self.addEventListener('activate', function(event) {
  event.waitUntil(clients.claim());
});

self.addEventListener('message', function () {
  sendToAll();
});
