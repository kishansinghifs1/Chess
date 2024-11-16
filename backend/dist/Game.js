"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const messages_1 = require("./messages");
const chess_js_1 = require("chess.js");
const messages_2 = require("./messages");
const messages_3 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess;
        this.moves = [];
        this.starttime = new Date();
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        if (this.moveCount % 2 == 0 && socket != this.player1) {
            return;
        }
        if (this.moveCount % 2 == 1 && socket != this.player2) {
            return;
        }
        try {
            this.board.move(move);
        }
        catch (e) {
            console.log(e);
            return;
        }
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: messages_2.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? "black" : "white"
                }
            }));
            this.player2.send(JSON.stringify({
                type: messages_2.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? "black" : "white"
                }
            }));
            return;
        }
        if (this.board.moves().length % 2 == 0) {
            this.player2.send(JSON.stringify({
                type: messages_3.MOVE,
                payload: move
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: messages_3.MOVE,
                payload: move
            }));
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
exports.Game = Game;
