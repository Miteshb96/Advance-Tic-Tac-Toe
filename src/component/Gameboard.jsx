export default function Gameboard({inputHandler, board}) {
    return (
        <ol id="game-board">
            {
                board.map((row, rowIndex) => {
                    return <li key={rowIndex}>
                        <ol>
                            {
                                row.map((playerSymb, colIndex) => {
                                    return <li key={colIndex}>
                                        <button 
                                            onClick={() => inputHandler(rowIndex, colIndex)}
                                            disabled={!(playerSymb === null)}
                                        > {playerSymb} </button>
                                    </li>
                                })
                            }
                        </ol>
                    </li>
                })
            }
        </ol>
    )
}