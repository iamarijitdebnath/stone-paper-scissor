import React, { useState,useEffect } from 'react'
import Camera from './Camera/Camera.jsx'
// import './Webcam.css'

function Webcam() {
    const [gestureText, setGestureText] = useState("");
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [currentRound, setCurrentRound] = useState(0);
    const [gameResult, setGameResult] = useState(""); // Stores the result of each round

    // Possible gestures and their meanings
    const gestures = {
        closed_fist: "Stone",
        open_palm: "Paper",
        victory: "Scissors",
    };

    // Define win/lose logic for gestures
    const determineWinner = (playerMove, computerMove) => {
        if (playerMove === computerMove) {
            return "It's a Draw!";
        } else if (
            (playerMove === "Stone" && computerMove === "Scissors") ||
            (playerMove === "Paper" && computerMove === "Stone") ||
            (playerMove === "Scissors" && computerMove === "Paper")
        ) {
            setPlayerScore(playerScore + 1);
            return "You Win!";
        } else {
            setComputerScore(computerScore + 1);
            return "Computer Wins!";
        }
    };

    // Function to play the game each time a gesture is detected
    const playGame = (gesture) => {
        const playerMove = gestures[gesture] || null;
        console.log(playerMove)
        if (!playerMove) return; // Only continue if a valid gesture is detected

        // Generate a random computer move
        const computerGestures = ["Stone", "Paper", "Scissors"];
        const computerMove = computerGestures[Math.floor(Math.random() * 3)];

        // Determine the winner
        const result = determineWinner(playerMove, computerMove);
        setGameResult(result);

        // Update the round counter
        setCurrentRound(currentRound + 1);
    };

    // Play the game each time the gesture changes
    useEffect(() => {
        if (gestureText) {
            playGame(gestureText.toLowerCase());
        }
    }, [gestureText]);

    const reset =()=>{
        setCurrentRound(0);
    }
    return (
        <>
            <div className='content'>
                <div className='left-content'>
                    <div className='videoScreen'>
                        <Camera onGestureChange={setGestureText} />
                    </div>
                </div>
                <div className='right-content'>
                    <div className='scoredetails'>
                        <h1>ScoreCard</h1>
                        <div className='total-rounds'>
                            {currentRound}/5
                        </div>
                        <button onClick={reset}>Reset</button>
                        <div className="score-section">
                            <div className="score-box">
                                <div className="score-label">You</div>
                                <div className="score-value">{playerScore}</div>
                            </div>
                            <div className="score-box">
                                <div className="score-label">PC</div>
                                <div className="score-value">{computerScore}</div>
                            </div>
                        </div>
                        <div className='gesture-display'>
                            <p>Detected Gesture: {gestures[gestureText]? gestures[gestureText]:"Waiting..."}</p>
                            <p>Computer Move: {gameResult ? gameResult : "..."}</p>
                            <p>Round Result: {gameResult}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Webcam