import React from "react";

const PlayAgain = (props) => {
    return (
        <div className="game-done">
            <p>&nbsp;</p>
            <button class="btn btn-info btn-lrg m-3" onClick={props.OnClick}>Play Again</button>
            <p className="message" style={{ color: props.GameStatus === 'lost' ? 'red' : 'green' }}>
                {props.GameStatus === 'lost' ? 'Game Over' : 'Good Job'}
            </p>
        </div>
    );
};

export default PlayAgain;
