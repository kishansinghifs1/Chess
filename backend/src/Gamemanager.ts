import { WebSocket } from "ws";
import { INIT_GAME } from "./messages";
import { MOVE } from "./messages";
import { Game } from "./Game";
import { Chess } from 'chess.js'

export class GameManager{
    private games : Game[];
    private pendinguser : WebSocket | null ;
    private users : WebSocket[] ;
    constructor(){
        this.games = [];
        this.pendinguser = null;
        this.users = [];
    }
    adduser(socket : WebSocket){
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeuser(socket : WebSocket){
        this.users = this.users.filter(user => user != socket );
    }
    private addHandler(socket : WebSocket){
        socket.on("message",(data) => {
            const message = JSON.parse(data.toString());
            if(message.type === INIT_GAME){
                if(this.pendinguser){
                    //start a new game
                    const game = new Game(this.pendinguser , socket);
                    this.games.push(game);
                    this.pendinguser = null;
                }else{
                    this.pendinguser = socket;
                }
            }
    
            if(message.type === MOVE){
                   const game = this.games.find(game => game.player1 === socket || game.player2 === socket );
                   if(game){
                    game.makeMove(socket , message.payload.move);
                   }
            }
        })
    }
}