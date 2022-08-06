import { useEffect, useState } from "react";
import "./wordBoard.css";
import Timer from "../timer";
import {
    Box,
    Button,
    Center,
    Grid,
    Heading,
    Spinner,
    Text,
    ListItem,
    UnorderedList,
} from "@chakra-ui/react";
import ResultScreen from "../resultScreen";

const GameBoard = ({ Letters, username, connection }) => {
    const [SelectedTiles, setSelectedTiles] = useState([]);
    const [CurrentTile, setCurrentTile] = useState({
        letter: null,
        TileIndex: null,
    });
    const [AvailableTiles, setAvailableTiles] = useState([]);
    const [Message, setMessage] = useState();
    const [ConfirmedWords, setConfirmedWords] = useState([
        "test",
        "words",
        "here",
    ]);
    const [SelectedLetters, setSelectedLetters] = useState([]);
    const [wordBuild, setwordBuild] = useState("");
    const [timer, setTimer] = useState(10);

    useEffect(() => {
        setTiles();
    }, [CurrentTile]);

    const handleTileClick = (letter, index) => {
        console.log(username);
        for (let i in SelectedTiles) {
            if (SelectedTiles[i] === index) {
                setMessage("Tile Already Selected");
                return;
            }
        }
        if (SelectedTiles.length > 0) {
            let available = false;
            for (let i in AvailableTiles) {
                if (AvailableTiles[i] === index) {
                    available = true;
                }
            }
            if (available) {
                setCurrentTile({ letter, TileIndex: index });
                setSelectedTiles([index, ...SelectedTiles]);
                setwordBuild(wordBuild + letter);
                setMessage("");
            } else {
                setMessage("Invalid Tile");
            }
        } else {
            setCurrentTile({ letter, TileIndex: index });
            setSelectedTiles([index, ...SelectedTiles]);
            setwordBuild(wordBuild + letter);
            setMessage("");
        }
    };

    const setTiles = () => {
        switch (CurrentTile.TileIndex) {
            case 0:
                setAvailableTiles([1, 4, 5]);
                break;
            case 1:
                setAvailableTiles([0, 4, 5, 6, 2]);
                break;
            case 2:
                setAvailableTiles([1, 5, 6, 7, 3]);
                break;
            case 3:
                setAvailableTiles([2, 6, 7]);
                break;
            case 4:
                setAvailableTiles([0, 1, 5, 8, 9]);
                break;
            case 5:
                setAvailableTiles([0, 1, 2, 6, 10, 9, 8, 4]);
                break;
            case 6:
                setAvailableTiles([1, 2, 3, 5, 7, 9, 10, 11]);
                break;
            case 7:
                setAvailableTiles([3, 2, 6, 10, 11]);
                break;
            case 8:
                setAvailableTiles([4, 5, 9, 12, 13]);
                break;
            case 9:
                setAvailableTiles([4, 5, 6, 8, 10, 12, 13, 14]);
                break;
            case 10:
                setAvailableTiles([5, 6, 7, 9, 11, 13, 14, 15]);
                break;
            case 11:
                setAvailableTiles([6, 7, 10, 14, 15]);
                break;
            case 12:
                setAvailableTiles([8, 9, 13]);
                break;
            case 13:
                setAvailableTiles([8, 9, 10, 12, 14]);
                break;
            case 14:
                setAvailableTiles([13, 9, 10, 11, 15]);
                break;
            case 15:
                setAvailableTiles([14, 10, 11]);
                break;
            default:
                setAvailableTiles([]);
                break;
        }
        return;
    };

    const colorStyle = (index) => {
        if (index === CurrentTile.TileIndex) {
            return "green";
        }
        for (let i in SelectedTiles) {
            if (SelectedTiles[i] === index) {
                return "dodgerblue";
            }
        }
        for (let i in AvailableTiles) {
            if (AvailableTiles[i] === index) {
                return "lightgreen";
            }
        }
        return "lightblue";
    };

    const handleReset = () => {
        console.log("reset");
        setSelectedTiles([]);
        setCurrentTile({
            letter: null,
            TileIndex: null,
        });
        setSelectedLetters([]);
        setwordBuild("");
        setTiles();
    };

    const handleSubmitWord = () => {
        console.log(wordBuild);
    };

    return Letters ? (
        <>
            {Letters && timer !== -1 && (
                <>
                    {" "}
                    <Center m={10}>
                        <Timer timer={timer} setTimer={setTimer}></Timer>
                    </Center>
                    <Grid templateColumns={"1fr 1fr 1fr"}>
                        <Box width="50%" m={100}>
                            <Center>
                                <Text
                                    bg="blue.300"
                                    bgClip="text"
                                    fontSize="2xl"
                                    fontWeight="extrabold"
                                >
                                    Words found
                                </Text>
                            </Center>
                            <Center
                                border="2px"
                                borderColor="orange.200"
                                bg="orange.50"
                                borderRadius="lg"
                            >
                                <UnorderedList m={4}>
                                    {ConfirmedWords.map((word) => (
                                        <ListItem
                                            fontSize="lg"
                                            fontWeight="bold"
                                            key={word}
                                        >
                                            <Text bg="blue.200" bgClip="text">
                                                {word}
                                            </Text>
                                        </ListItem>
                                    ))}
                                </UnorderedList>
                            </Center>
                        </Box>
                        <Box className="board-container" mt={50}>
                            {Letters.map((letter, index) => (
                                <Box
                                    className={"board-tile "}
                                    backgroundColor={colorStyle(index)}
                                    fontSize="lg"
                                    fontWeight="bold"
                                    onClick={() => {
                                        handleTileClick(letter, index);
                                    }}
                                    key={index}
                                    id={index}
                                >
                                    <Heading>{letter}</Heading>
                                </Box>
                            ))}
                        </Box>
                        <Box>
                            <Center>
                                <Grid pt={200} templateColumns={"1fr"} gap={20}>
                                    <Button
                                        colorScheme={"blue"}
                                        onClick={() => {
                                            handleSubmitWord();
                                        }}
                                    >
                                        Submit Word
                                    </Button>
                                    <Button
                                        colorScheme={"red"}
                                        onClick={() => {
                                            handleReset();
                                        }}
                                    >
                                        Clear Board
                                    </Button>
                                </Grid>
                            </Center>
                        </Box>
                        <Box></Box>
                        <Box pt={5}>
                            <Center textColor={"red"} fontWeight={"bold"}>
                                {Message}
                            </Center>
                            <Center>
                                <Heading color={"dodgerblue"}>
                                    <Text as="u">{wordBuild}</Text>
                                </Heading>
                            </Center>
                        </Box>
                        <Box></Box>
                    </Grid>
                </>
            )}
            {timer === -1 && (
                <>
                    <ResultScreen
                        Words={ConfirmedWords}
                        username={username}
                        connection={connection}
                    ></ResultScreen>
                </>
            )}
        </>
    ) : (
        <Center>
            <h1>
                <Spinner size="lg">Loading...</Spinner>
            </h1>
        </Center>
    );
};

export default GameBoard;
