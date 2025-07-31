const WebSocket = require('ws');
const { logInfo, toJson, toStringify } = require('../helper/util');
const wss = new WebSocket.Server({ port: 8080, host: '0.0.0.0' });
const clientSocket = [];
const messages = [];

logInfo('SOCKECT SERVER STARTED...')

function getNextPlayer(message) {
  const currentPlayerId = message.id;
  const nextPlayerIdIndex = clientSocket.indexOf(currentPlayerId) + 1;
  const modifiedNextPlayerIdIndex = nextPlayerIdIndex >= clientSocket.length ? nextPlayerIdIndex - clientSocket.length : nextPlayerIdIndex;
  return clientSocket[modifiedNextPlayerIdIndex] || currentPlayerId;
}

wss.on('connection', ws => {
  logInfo('🟢' + ' CLIENT CONNECTED');
  ws.on('message', message => {
    const jsonMessage = toJson(message)
    logInfo('RECEIVED: ', jsonMessage);
    (clientSocket.indexOf(jsonMessage.id) === -1) && (clientSocket.push(jsonMessage.id))

    // ADD EACH MESSAGES
    jsonMessage?.isChat && (messages.push(jsonMessage))

    // BROAD CAST TO EVERY CLIENT
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        if (jsonMessage?.isChat) {
          client.send(toStringify(messages));
        } else {
          if (client !== ws) {
            jsonMessage.nextPlayerId = getNextPlayer(jsonMessage);
            client.send(toStringify(jsonMessage));
          }
        }
      }
    });

  });

  ws.on('close', () => logInfo('🔴' + ' CLIENT DISCONNECTED'));
});