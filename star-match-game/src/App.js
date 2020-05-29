import React, { useState } from 'react';
import Game from "./components/Game";

const StarMatch = () => {
    const [gameId, setGameId] = useState(1);
    const updateGameId = () => { setGameId(gameId + 1); };

    return (<Game key={gameId} StartNewGame={updateGameId} />);
};

export default function App() {
    return (
        <StarMatch />
    );
}
