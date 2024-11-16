import { WebSocket } from "ws";
import { INIT_GAME } from "./messages";
import { Chess } from 'chess.js'
import { GAME_OVER } from "./messages";
import { MOVE } from "./messages";
export class Game{
    public player1 : WebSocket;
    public player2 : WebSocket;
    public board : Chess;
    private moves : string[];
    private starttime : Date;
    private moveCount = 0;
  constructor(player1 : WebSocket , player2 : WebSocket){
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess;
    this.moves =[] ;
    this.starttime = new Date();
    this.player1.send(JSON.stringify({
        type : INIT_GAME,
        payload : {
            color : "white"
        }
    }))
    this.player2.send(JSON.stringify({
        type : INIT_GAME,
        payload : {
            color : "black"
        }
    }))
  }
  public makeMove(socket : WebSocket , move : {from :string ; to : string ;}){
    if(this.moveCount % 2 == 0 && socket != this.player1){
        return;
    }
    if(this.moveCount % 2 == 1 && socket != this.player2){
        return;
    }
    try{
        this.board.move(move)
    }
    catch(e){
        console.log(e);
        return ;
    }
    if(this.board.isGameOver()){
        this.player1.send(JSON.stringify({
            type : GAME_OVER,
            payload : {
               winner : this.board.turn() === 'w' ? "black" : "white"
            }
        }))
        this.player2.send(JSON.stringify({
            type : GAME_OVER,
            payload : {
               winner : this.board.turn() === 'w' ? "black" : "white"
            }
        }))
        return
    }
    if(this.board.moves().length % 2 == 0){
        this.player2.send(JSON.stringify({
            type : MOVE ,
            payload : move 
        })) 
    }
    else{
        this.player1.send(JSON.stringify({
            type : MOVE ,
            payload : move 
        })) 
    }
    this.moveCount++;
    //validation
    //is it this user move
    //is the move valid
    //update the board
    //push the move
    //check if the game is over
    //send the update board to the both players

  }
}