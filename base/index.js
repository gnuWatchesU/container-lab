// server.js
const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');
const pty = require('node-pty');
const path = require('path');

const app = express();
const server = createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', function connection(ws) {
  const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env,
  });

  ptyProcess.onData(data => ws.send(data));
  ws.on('message', msg => ptyProcess.write(msg));
  ws.on('close', () => ptyProcess.kill());
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
