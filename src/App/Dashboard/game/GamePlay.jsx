import { useEffect, useRef, useState } from 'react';
import Chat from '../../chat/chat';
import { logInfo, toJson, toStringify } from '../../../helper/util';
import Bingo from '../../bingo/bingo';
import BingoSetup from '../../../helper/bingoSetup'
import { IsBingo } from '../../../helper/bingoSetup'
import { MESSAGE_TYPE, getBingoMessage, isBingoMessage } from '../../../helper/config'

const WEB_SOCKET_CLIENT_URL = import.meta.env.VITE_WEB_SOCKET_CLIENT_URL;

const GamePlay = ({ playerName }) => {
    const [socket, setSocket] = useState(null);
    const [playerId, setPlayerId] = useState();
    const [messages, setMessages] = useState([]);
    const [isBingo, setIsBingo] = useState(false);
    const [bingo, setBingo] = useState(new BingoSetup())
    const [bingoPlayer, setBingoPlayer] = useState(playerName);
    const [otherPlay, setOtherPlay] = useState(false);
    const [startGame, setStartGame] = useState(true);
    const hasCurretRef = useRef(false);
    const playerIdRef = useRef(playerId);

    useEffect(() => {

        if (hasCurretRef.current) { return }
        hasCurretRef.current = true; // To Avoid TWO Web Socket Connection

        // WEBSOCKET SERVER URL
        const ws = new WebSocket(WEB_SOCKET_CLIENT_URL); /* ws://localhost:8080 OR wss://devtunnel.ms */

        // ON RECEIVING MESSAGE
        ws.onmessage = (event) => {
            console.log('Received:', event.data);
            const data = toJson(event.data)
            handleMessages(data);
        }

        // ON CONNECTION OPEN
        ws.onopen = () => {
            logInfo('WEBSOCKET CONNECTED ✅')
        };

        // ON CONNECTION CLOSE
        ws.onclose = () => {
            logInfo('WEBSOCKET DISCONNECTED  (🔌) 👋')
        };

        setSocket(ws);

        console.log(bingo)

        return () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };

    }, []);

    useEffect(() => {
        playerIdRef.current = playerId
    }, [playerId])

    useEffect(() => {
        setIsBingo(IsBingo(bingo));
    }, [bingo])

    useEffect(() => {
        if (playerName === bingoPlayer && socket && socket.readyState === WebSocket.OPEN) {
            socket.send(toStringify(isBingoMessage(playerId, playerName)));
        }
    }, [isBingo])

    const handleMessages = (data) => {
        switch (data.type) {
            case MESSAGE_TYPE.BINGO_PLAY: {
                const { value, nextPlayerId } = data.message;
                if (value) {
                    setCrossSelectElement(value, false)
                }
                if (nextPlayerId === playerIdRef.current) {
                    setOtherPlay(false);
                }
                break;
            }
            case MESSAGE_TYPE.INIT: {
                setPlayerId(data.message);
                break;
            }
            case MESSAGE_TYPE.IS_BINGO: {
                setBingoPlayer(data.playerName);
                setIsBingo(true)
                break;
            }
            default: {
                Array.isArray(data) && (setMessages(data))
            }
        }
    }

    const setCrossSelectElement = (crossElement, forDifferentPlayer = true) => {
        // const element = bingo.flat().find(e => e.value === crossElement);
        // element.crossed = true
        // setBingo(toJson(toStringify(bingo)));
        setBingo(prev =>
            prev.map(row =>
                row.map(cell =>
                    cell.value === crossElement
                        ? { ...cell, crossed: true }
                        : cell
                )
            )
        );
        if (forDifferentPlayer && !isBingo && socket && socket.readyState === WebSocket.OPEN) {
            setOtherPlay(true)
            socket.send(toStringify(getBingoMessage(playerId, playerName, crossElement)));
        }
    }

    const style = { fontStyle: 'italic', color: 'white', fontSize: 'bold', paddingTop: '10px', width: '75%', margin: 'auto' }

    return (
        <>
            <h2 style={{ ...style, color: 'green' }}>Player: {playerName}</h2>
            {otherPlay && !isBingo && <h2 style={{ ...style, color: 'red' }}>Other Player Choosing...</h2>}
            {isBingo && <h2 style={style}>{`${bingoPlayer} Win Bingo 🎉🎉`}</h2>}
            <Bingo bingo={bingo} otherPlay={otherPlay} startGame={startGame} setCrossSelectElement={setCrossSelectElement} />
            <Chat messages={messages} socket={socket} playerId={playerId} playerName={playerName} />
        </>
    );
};

export default GamePlay;