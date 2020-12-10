const WebSocket = require('ws');

const createWSServer = server => {
  const wsServer = new WebSocket.Server({server});

  let rooms = {};

  const sendToRoom = (roomId, msg) => {
    let clients = rooms[roomId];
    for(let client of clients) {
      client.send(JSON.stringify(msg));
    }
  };

  wsServer.on('connection', (ws, req) => {
    console.log('connections:' , wsServer.clients.size);
    console.log('ip:', req.connection.remoteAddress);
    console.log('port:', req.connection.remotePort);
    let roomId, nickname;
    ws.on('message', msg => {
      msg = JSON.parse(msg);
      switch(msg.action) {
        case 'add':
          roomId = msg.roomId;
          nickname = msg.nickname;
          if(!rooms[roomId]) {
            rooms[roomId] = [];
          }
          rooms[roomId].push(ws);
          sendToRoom(roomId, {type: 'sys', msg: `${msg.nickname} joins room ${roomId}`, nickname: ''});
          break;
        case 'send': {
          sendToRoom(roomId, {type: 'msg', msg: msg.data, nickname: nickname});
        }
      }
    });
    ws.on('close', () => {
      console.log('onclose');
      sendToRoom(roomId, {type: 'sys', msg: `${nickname} leaves room ${roomId}`, nickname: ''});
    });
    ws.send(JSON.stringify({type: 'status', status: 'connected'}));
  });
};

module.exports = createWSServer;