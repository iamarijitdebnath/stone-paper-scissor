import React, { useCallback } from 'react'
import Camera from './Camera/Camera.jsx'

function Webcam() {
    const [gestureText, setGestureText] = React.useState(null);

    const [isGameStarted, setIsGameStarted] = React.useState(false);
    const [isGamePaused, setIsGamePaused] = React.useState(false);

    const [computerScore, setComputerScore] = React.useState(0);
    const [userScore, setUserScore] = React.useState(0);

    const [logs, setLogs] = React.useState([]);

    React.useEffect(() => {
        if(gestureText != null) {
            switch(gestureText){
                case "Open Palm":
                    whoWins("PAPER");
                    break;
                case "Closed Fist":
                    whoWins("STONE");
                    break;
                case "Victory":
                    whoWins("SCISSOR");
                    break;
                default:
                    break;
            }
        }
    }, [gestureText]);

    const reset = () => {
        setComputerScore(0);
        setUserScore(0);
    }

    const start = () => {
        setIsGameStarted(true)
        setIsGamePaused(false)
    } 

    const stop = () => {
        setIsGamePaused(true)
    }


    React.useEffect(() => {
        if(userScore == 5 || computerScore == 5) {
            alert("Reset");
        }
    }, [userScore, computerScore]);

    const whoWins = (userChoice) => {
        var options = ["STONE", "PAPER", "SCISSOR"];
        var computerChoice = options[Math.floor((Math.random() * options.length))]

        if(userChoice == computerChoice){

        } else if(userChoice == "STONE") {
            if(computerChoice == "PAPER") {
                setComputerScore((score) => score + 1)
            } else if(computerChoice == "SCISSOR") {
                setUserScore((score) => score + 1);
            }
        } else if(userChoice == "PAPER") {
            if(computerChoice == "SCISSOR") {
                setComputerScore((score) => score + 1)
            } else if(computerChoice == "STONE") {
                setUserScore((score) => score + 1);
            }
        } else if(userChoice == "SCISSOR") {
            if(computerChoice == "STONE") {
                setComputerScore((score) => score + 1)
            } else if(computerChoice == "PAPER") {
                setUserScore((score) => score + 1);
            }
        } 
        setLogs((oldLogs) => [...oldLogs, `User choosed ${userChoice} & Computer choosed ${computerChoice}`])
    }

    return (
        <div className="h-screen grid grid-cols-12 gap-8 p-8 bg-gray-800">

            <div className="col-span-8 border border-2 border-gray-400 overflow-hidden rounded-lg">
                <div className="h-full flex justify-center items-center bg-black">
                    {
                        (isGameStarted == true && isGamePaused == false) ? (
                            <Camera onGestureChange={setGestureText} />
                        ) : (isGamePaused == true) ? (
                            <span className="text-2xl text-gray-50">The Game Is Paused</span>
                        ) : (
                            <span className="text-2xl text-gray-50">Click start to start the game</span>
                        )
                    }
                </div>
            </div>

            <div className="flex flex-col col-span-4 border border-2 border-gray-400 overflow-hidden rounded-lg">
                <div className="flex py-4">
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <h3 className="text-gray-50 text-4xl">{userScore}</h3>
                        <h5 className="text-gray-50">User</h5>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <h3 className="text-gray-50 text-4xl">{computerScore}</h3>
                        <h5 className="text-gray-50">Computer</h5>
                    </div>
                </div>

                {
                    (isGameStarted == false || isGamePaused == true)  ? (
                        <div 
                            onClick={start}
                            className="h-[50px] flex justify-center items-center text-medium text-gray-50 bg-gray-700 cursor-pointer hover:bg-gray-500">
                            Start
                        </div>
                    ) : (
                        <div onClick={stop} className="h-[50px] flex justify-center items-center text-medium text-gray-50 bg-gray-700 cursor-pointer hover:bg-gray-500">
                            Stop
                        </div>
                    )
                }
                

                <div onClick={reset} className="h-[50px] flex justify-center items-center text-medium text-gray-50 bg-gray-700 cursor-pointer hover:bg-gray-500">
                    Restart
                </div>

                <div className="flex-1">
                    <div className="h-full p-4 bg-gray-900">
                        {
                            logs.map((log, index) => (
                                <div key={index} className="text-gray-400 text-sm mb-2">
                                    { log }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Webcam