import { useEffect, useState } from 'react';
import './wordBoard.css';
import {
    Box,
    Button,
    Center,
    Flex,
    Grid,
    Heading,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';

const GameBoard = ({ Letters, username }) => {
    const [SelectedTiles, setSelectedTiles] = useState([]);
    const [CurrentTile, setCurrentTile] = useState({
        letter: null,
        TileIndex: null,
    });
    const [AvailableTiles, setAvailableTiles] = useState([]);
    const [Message, setMessage] = useState();
    const [ConfirmedWords, setConfirmedWords] = useState([
        'test',
        'words',
        'here',
    ]);
    const [SelectedLetters, setSelectedLetters] = useState([]);
    const [wordBuild, setwordBuild] = useState('');

    useEffect(() => {
        setTiles();
    }, [CurrentTile]);

    const handleTileClick = (letter, index) => {
        console.log(username);
        for (let i in SelectedTiles) {
            if (SelectedTiles[i] === index) {
                setMessage('Tile Already Selected');
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
                setMessage('');
            } else {
                setMessage('Invalid Tile');
            }
        } else {
            setCurrentTile({ letter, TileIndex: index });
            setSelectedTiles([index, ...SelectedTiles]);
            setwordBuild(wordBuild + letter);
            setMessage('');
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
                setAvailableTiles([])
                break;
        }
        return;
    };

    const colorStyle = (index) => {
        if (index === CurrentTile.TileIndex) {
            return 'green';
        }
        for (let i in SelectedTiles) {
            if (SelectedTiles[i] === index) {
                return 'dodgerblue';
            }
        }
        for (let i in AvailableTiles) {
            if (AvailableTiles[i] === index) {
                return 'lightgreen';
            }
        }
        return 'lightblue';
    };

    const handleReset = () => {
        console.log('reset');
        setSelectedTiles([]);
        setCurrentTile({
            letter: null,
            TileIndex: null,
        });
        setSelectedLetters([]);
        setwordBuild("")
        setTiles()
    };

    const handleSubmitWord = () => {
        console.log(wordBuild);
    };

    return Letters ? (
        <>
            <Grid templateColumns={'1fr 1fr 1fr'}>
                <Box>
                    {ConfirmedWords.length > 0 && (
                        <Box pt={50}>
                            <Center>
                                <Heading>Confired Words</Heading>
                            </Center>
                            {ConfirmedWords.map((word, index) => (
                                <Center
                                    className={'word-list'}
                                    fontSize="lg"
                                    fontWeight="bold"
                                    key={word}
                                    id={word}
                                >
                                    <Box p={'1px'}>{word}</Box>
                                </Center>
                            ))}
                        </Box>
                    )}
                </Box>
                <Box className="board-container">
                    {Letters.map((letter, index) => (
                        <Box
                            className={'board-tile '}
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
                        <Grid pt={200} templateColumns={'1fr'} gap={20}>
                            <Button
                                colorScheme={'blue'}
                                onClick={() => {
                                    handleSubmitWord();
                                }}
                            >
                                Submit Word
                            </Button>
                            <Button
                                colorScheme={'red'}
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
                    <Center textColor={'red'} fontWeight={'bold'}>
                        {Message}
                    </Center>
                    <Center>
                        <Heading color={'dodgerblue'}>
                            <Text as="u">{wordBuild}</Text>
                        </Heading>
                    </Center>
                </Box>
                <Box></Box>
            </Grid>
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
