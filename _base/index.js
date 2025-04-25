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
    const shell = 'bash';
    const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: process.env.HOME,
        env: process.env,
    });

    ptyProcess.onData(data => {
        ws.send(JSON.stringify({ type: 'output', data }));
    });
    ptyProcess.onExit(() => {
        ws.send('## Backend terminal disconnected');
        ws.close();
    });
    ws.on('message', msg => {
        try {
            const { type, data, cols, rows } = JSON.parse(msg);
            if (type === 'input') {
                ptyProcess.write(data);
            } else if (type === 'resize') {
                ptyProcess.resize(cols, rows);
            }
        } catch (err) {
            console.error('Failed to parse message:', err);
        }
    });
    ws.on('close', () => ptyProcess.kill());
});

server.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});
