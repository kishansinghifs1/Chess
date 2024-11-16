import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({
  chess,
  board,
  socket,
  setBoard,
}: {
  chess: any;
  setBoard: any;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<null | Square>(null);

  const handleSquareClick = (sqr: Square, square: { square: Square; type: PieceSymbol; color: Color } | null) => {
    if (!from) {
      // Select the square to move from
      setFrom(sqr);
    } else {
      // Attempt to move the piece
      const moveResult = chess.move({
        from,
        to: sqr,
      });

      if (moveResult) {
        // If the move was successful, update the board state
        setBoard(chess.board());

        // Send the move to the server
        socket.send(
          JSON.stringify({
            type: MOVE,
            payload: {
              move: {
                from,
                to: sqr,
              },
            },
          })
        );

        console.log({
          from,
          to: sqr,
        });
      } else {
        // If the move was not valid, reset the 'from' square
        console.log("Invalid move");
      }

      // Reset the 'from' square after the move
      setFrom(null);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-128 h-128 bg-gray-200 border border-gray-300 rounded">
        {board.map((row, i) => (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const sqr = String.fromCharCode(97 + j) + (8 - i) as Square; // Adjusted to use (8 - i) for correct square notation
              const squareColor = (i + j) % 2 === 0 ? 'bg-gray-100' : 'bg-gray-500';

              return (
                <div
                  onClick={() => handleSquareClick(sqr, square)}
                  key={j}
                  className={`w-16 h-16 ${squareColor} border border-gray-300`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {square ? (
                      <img
                        className="w-[70%] h-[70%] object-contain" // Set image size to 80% of the square
                        src={`/${square.color === "b" ? square.type : `${square.type.toUpperCase()} copy`}.jpg`}
                        alt={`${square.color}-${square.type}`}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};