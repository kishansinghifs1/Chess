import { WebSocketServer } from 'ws';
import { GameManager } from './Gamemanager';
import { INIT_GAME } from './messages';
import { Chess } from 'chess.js'
const wss = new WebSocketServer({ port: 8080 });
const gamemanager = new GameManager();


wss.on('connection', function connection(ws) {
  gamemanager.adduser(ws)
  ws.on("disconnect", () => gamemanager.removeuser(ws))

});