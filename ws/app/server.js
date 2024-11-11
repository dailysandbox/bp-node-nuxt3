const uWS = require('uWebSockets.js');
const { v4 } = require('uuid');

const port = 9001;
const app = uWS.App();

app.ws('/:channel', {
  compression: 0,
  maxPayloadLength: 16 * 1024 * 1024,
  idleTimeout: 60,

  upgrade: (res, req, context) => {
    let data = {
      id: v4()
    };

    //upgrade to websocket
    res.upgrade(
      data,
      req.getHeader('sec-websocket-key'),
      req.getHeader('sec-websocket-protocol'),
      req.getHeader('sec-websocket-extensions'), //3 headers are used to setup websocket
      context // also used to setup websocket
    );
  },

  open: ws => {
    console.log('A new client connected!');
    ws.send('Welcome to the uWebSockets.js server!');
  },

  message: (ws, message, isBinary) => {
    const messageString = Buffer.from(message).toString();
    console.log(`Received: ${messageString}`);
    ws.send(`Hello, you sent -> ${messageString}`, isBinary);
  },

  ping: ws => {
    //console.log(`ping ${ws.id}`);
  },

  pong: ws => {
    //console.log(`pong ${ws.id}`);
  },

  close: (ws, code, message) => {
    console.log('A client disconnected');
  }
});

app.get('/', (res, req) => {
  res.writeStatus('200 OK').end('ws server is up and running =)');
});

app.listen(port, token => {
  token
    ? console.log(`Listening to port ${port}`)
    : console.log(`Failed to listen to port ${port}`);
});