const WebSocket = require('ws');
const crypto = require('crypto');
const { logInfo, toJson, toStringify } = require('../../helper/util');
const { MESSAGE_TYPE, initializePlayer } = require('../../helper/config');
const wss = new WebSocket.Server({ port: 8080, host: '0.0.0.0' });
const clientSocket = new Map(); //EACH CLIENT IS A PLAYER
const messages = [];

logInfo('SOCKECT SERVER STARTED...')

function getNextPlayer(currentPlayerId) {
  const players = [...clientSocket.keys()];
  const nextPlayerIdIndex = players.indexOf(currentPlayerId) + 1;
  const modifiedNextPlayerIdIndex = nextPlayerIdIndex >= players.length ? nextPlayerIdIndex - players.length : nextPlayerIdIndex;
  return players[modifiedNextPlayerIdIndex] || currentPlayerId;
}

function handleMessage(jsonMessage, ws, client) { // CURRENT CLIENT == ws
  switch (jsonMessage.type) {
    case MESSAGE_TYPE.CHAT: {
      if (ws === client) {
        messages.push(jsonMessage)
      }
      client.send(toStringify(messages));
      break;
    }
    case MESSAGE_TYPE.BINGO_PLAY: {
      if (client !== ws) {
        jsonMessage.message = { nextPlayerId: getNextPlayer(jsonMessage.id), value: jsonMessage.message };
        client.send(toStringify(jsonMessage));
      }
      break;
    }
    case MESSAGE_TYPE.IS_BINGO: {
      if (client !== ws) {
        client.send(toStringify(jsonMessage));
      }
      break;
    }
  }
}

wss.on('connection', ws => {
  logInfo('🟢' + ' CLIENT CONNECTED');

  ws.id = crypto.randomUUID();
  ws.send(toStringify(initializePlayer(ws.id)));
  clientSocket.set(ws.id, ws);

  ws.on('message', message => {
    const jsonMessage = toJson(message)
    logInfo('RECEIVED: ', jsonMessage);

    // BROAD CAST TO EVERY CLIENT
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        handleMessage(jsonMessage, ws, client)
      }
    });

  });

  ws.on('close', () => {
    clientSocket.delete(ws.id);
    logInfo('🔴' + ' CLIENT DISCONNECTED')
  });

});