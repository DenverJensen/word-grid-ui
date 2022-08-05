import { useState, useEffect } from "react";
import {
    Box,
    Center,
    Text,
    ListItem,
    UnorderedList,
    ChakraProvider,
} from "@chakra-ui/react";

const ResultScreen = ({Words, username}) => {
    
    const [score, setScore] = useState(0);

    useEffect(() => {
        getScore();
    }, []);
    const getScore = () => {
        {
            let pts = 0;
            Words.map((word) => {
                switch (word.length) {
                    case 3:
                        pts = pts + 1;
                        setScore(pts);
                        break;
                    case 4:
                        pts = pts + 2;
                        setScore(pts);
                        break;
                    case 5:
                        pts = pts + 4;
                        setScore(pts);
                        break;
                    case 6:
                        pts = pts + 6;
                        setScore(pts);
                        break;
                    case 7:
                        pts = pts + 8;
                        setScore(pts);
                        break;
                    case 8:
                        pts = pts + 10;
                        setScore(pts);
                        break;
                    default:
                        pts = pts + 15;
                        setScore(pts);
                        break;
                }
            });
        }
    };
    return (
        <ChakraProvider>
            <Box pt={50}>
                <Center>
                    <Text
                        bgGradient="linear(to-l,orange.500, orange.200  )"
                        bgClip="text"
                        fontSize="5xl"
                        fontWeight="extrabold"
                    >
                        {username.toUpperCase()} WINS!
                    </Text>
                </Center>

                <Center mt="10">
                    <Text
                        bg="blue.300"
                        bgClip="text"
                        fontSize="2xl"
                        fontWeight="extrabold"
                    >
                        Words found
                    </Text>
                </Center>
                <Center>
                    <Box width="25%">
                        <Center
                            border="2px"
                            borderColor="orange.200"
                            bg="orange.50"
                            borderRadius="lg"
                        >
                            <UnorderedList m={4}>
                                {Words.map((word, index) => (
                                    <ListItem
                                        fontSize="lg"
                                        fontWeight="bold"
                                        key={word}
                                        id={index + 1}
                                    >
                                        <Text bg="blue.200" bgClip="text">
                                            {word}
                                        </Text>
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        </Center>
                    </Box>
                </Center>
            </Box>
            <Center>
                <Text fontWeight="bold" fontSize="lg" m={10}>
                    Your Score is <span className="text-warning">{score}</span>{" "}
                    pts
                </Text>
            </Center>
        </ChakraProvider>
    );
};
export default ResultScreen;
