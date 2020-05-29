import React, { useState, useEffect } from "react";
import utils from "../math-utils";
import PlayAgain from "./PlayAgain";
import StarsDisplay from "./StarDisplay";
import PlayNumber from "./PlayNumber";


// CUSTOM HOOK
const useGameState = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
    const [candidateNumbers, setCandidateNumbers] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        // this will be done with the component is done rendering....w/o condition.
        //console.log('StarMatch done rendering...');

        if (secondsLeft > 0 && availableNumbers.length > 0) {
            // every time the component re-renders itself, we remove the previous timer.
            // we are cleaning up previous hooks.
            let timerId = setTimeout(() => { setSecondsLeft(secondsLeft - 1) }, 1000);
            return () => { clearTimeout(timerId); };
        }
    });

    const SetGameState = (newCandidateNumbers) => {
        if (utils.sum(newCandidateNumbers) !== stars) {
            setCandidateNumbers(newCandidateNumbers);
        }
        else {
            const newAvailableNumbers = availableNumbers.filter(n => !newCandidateNumbers.includes(n));
            setStars(utils.randomSumIn(newAvailableNumbers, 9));
            setAvailableNumbers(newAvailableNumbers);
            setCandidateNumbers([]);
        }
    };

    // return and expose the things the game component needs as **an object**.
    return { stars, availableNumbers, candidateNumbers, secondsLeft, SetGameState };
};


const Game = (props) => {
    // deconstruct the response of our custom hook
    const { stars, availableNumbers, candidateNumbers, secondsLeft, SetGameState } = useGameState();

    // global variables
    const areCandidatesWrong = utils.sum(candidateNumbers) > stars;
    const gameStatus = (availableNumbers.length === 0)
        ? 'won'
        : (secondsLeft === 0) ? 'lost' : 'active';

    const NumberStatus = (number) => {
        if (!availableNumbers.includes(number)) {
            return 'used';
        }

        if (candidateNumbers.includes(number)) {
            return areCandidatesWrong ? 'wrong' : 'candidate';
        }

        return 'available';
    };

    const OnNumberClick = (number, currentStatus) => {
        if (currentStatus === 'used' || gameStatus !== 'active') {
            return;
        }

        let newCandidateNumbers = (currentStatus === 'available') ? candidateNumbers.concat(number) : candidateNumbers.filter(n => n !== number);

        SetGameState(newCandidateNumbers);
    };

    return (
        <div className="game mt-5">
            <h3 class="text-center">How to play</h3>

            <hr />

            <p>
                The goal is to pick 1 or more numbers that sum to the number of stars.
                If you see 4 stars, you can click the 4, or click the 3 & 1 buttons. As long as
                the buttons you've clicked match the number of stars you see, you've succeeded!
            </p>

            <p>
                <span class="text-info">You have 10 seconds to match all the numbers!</span>
            </p>

            <div className="body">
                <div className="left">
                    {
                        gameStatus !== 'active' ? <PlayAgain GameStatus={gameStatus} OnClick={props.StartNewGame} />
                            : <StarsDisplay CountOfStars={stars} />
                    }
                </div>
                <div className="right">
                    {
                        utils.range(1, 9).map(number =>
                            <PlayNumber
                                key={number}
                                Number={number}
                                Status={NumberStatus(number)}
                                OnClick={OnNumberClick}
                            />)
                    }
                </div>
            </div>
            <h4 class="text-info text-center my-5">
                Time Remaining: {secondsLeft}
            </h4>
        </div>
    );
};


export default Game;