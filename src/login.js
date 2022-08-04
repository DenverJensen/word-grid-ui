import { Input, Button } from "@mui/material";
import { useState } from "react";

const Login = ({
    connection,
    playerCount,
    setPlayerCount,
    setUsername,
    setLetters,
}) => {
    const [user, setUser] = useState("");
    const [msg, setMsg] = useState("");
    const handleStartGame = (e) => {
        connection
            .invoke("Numplayers")
            .catch((err) => console.error(err.toString()));
        connection.on("NumPlayersCount", (playerCount) => {
            if (playerCount === 1) {
                setMsg("Waiting for player 2.");
            }
            if (playerCount === 2) {
                setPlayerCount(2);
                connection
                    .invoke("GetLetters")
                    .catch((err) => console.error(err.toString()));
            }
        });
        connection.on("SendRandomLetters", (letters) => {
            setLetters(letters);
        });
    };
    return (
        <>
            <div className="container">
                <h1 className="title">Nerdle</h1>
                <h6 className="mt-4">Enter a username</h6>
                <Input
                    variant="outlined"
                    type="text"
                    onChange={(e) => {
                        setUser(e.target.value);
                        setUsername(e.target.value);
                    }}
                />
                <div className="mt-4">
                    <Button
                        className="options mt-4"
                        variant="contained"
                        onClick={handleStartGame}
                        disabled={!user}
                    >
                        start game
                    </Button>
                    <h6 className="text-danger mt-4">{msg}</h6>
                </div>
            </div>
        </>
    );
};

export default Login;
