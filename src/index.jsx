import React, { useState } from "react";
import ReactDOM from "react-dom";

function Square({ value, onClick }) {
    return (
        <button onClick={onClick} style={{ fontSize: "24px" }}>
            {value}
        </button>
    );
}

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (i) => {
        if (squares[i] || calculateWinner(squares)) return;
        const newSquares = squares.slice();
        newSquares[i] = xIsNext ? "X" : "O";
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    };

    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={() => handleClick(i)} />;
    };

    const winner = calculateWinner(squares);
    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`;

    return (
        <div>
            <div>{status}</div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gridTemplateRows: "repeat(3, 1fr)",
                    gap: "5px",
                    aspectRatio: "1 / 1",
                    height: "200px",
                }}
            >
                {Array(9)
                    .fill()
                    .map((_, i) => renderSquare(i))}
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default function Game() {
    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <Board />
        </div>
    );
}

ReactDOM.render(<Game />, document.getElementById("root"));
