import { ChessBoard } from "../components/ChessBoard";
import { Button } from "../components/Button";
import { useSocket } from "../hooks/useSocket.ts";
import { useState } from "react";
import { useEffect } from "react";
export const INIT_GAME = "init_game"
import { Chess } from 'chess.js'
export const MOVE = "move"
export const GAME_OVER = "game_over"
export const Game = () => {
    const socket =  useSocket();
    const [chess , setChess] = useState(new Chess());
    const [board , setBoard] = useState(chess.board());
    const [started , setStarted] = useState(false);
    useEffect(() => {
           if (!socket) {
            return;
              } 
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        // console.log(message);
        switch (message.type) {
          case INIT_GAME:
            setBoard(chess.board());
            setStarted(true);
            console.log("Game initialized");
            break;
          case MOVE:
            const move = message.payload;
            chess.move(move);
            setBoard(chess.board());
            console.log("Move made");
            break;
          case GAME_OVER:
            console.log("Game over");
            break;
        }
      };
    }, [socket]);
    if(!socket) return <div>Conecting...</div>
    return (
        <div className="flex justify-center">
          <div className="pt-8 max-w-screen-lg w-full">
            <div className="grid grid-cols-8 gap-4 w-full">
              <div className="col-span-4 bg-red-200 w-full flex justify-center">
                <ChessBoard chess ={chess} setBoard = {setBoard} socket={socket} board={board} />
              </div>
              <div className="h-56">
               { !started && <Button
                 onClick={() => {
                  socket.send(JSON.stringify({
                    type: INIT_GAME,
                  }));
                }}>Play</Button>
              }
              </div>
            </div>
          </div>
        </div>
      );
    }