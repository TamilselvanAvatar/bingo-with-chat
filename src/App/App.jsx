import { useEffect, useState } from 'react';
import Chat from './chat/chat';
import { logInfo, toJson, toStringify } from '../helper/util';
import Bingo from './bingo/bingo';
import BingoSetup from '../helper/bingoSetup'
import { IsBingo } from '../helper/bingoSetup'

const App = ({ playerName, playerId }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isBingo, setIsBingo] = useState(false);
    const [bingo, setBingo] = useState(new BingoSetup())
    const [bingoPlayer, setBingoPlayer] = useState(playerName);
    const [otherPlay, setOtherPlay] = useState(false);

    useEffect(() => {
        // WEBSOCKET SERVER URL
        const ws = new WebSocket('ws://localhost:8080'); /* ws://localhost:8080 OR wss://devtunnel.ms */

        // ON RECEIVING MESSAGE
        ws.onmessage = (event) => {
            console.log('Received:', event.data);
            const data = toJson(event.data)
            if (Array.isArray(data)) {
                setMessages(data);
            } else {
                if (data.isBingoPlay) {
                    if (data.value) {
                        setCrossSelectElement(data.value, false)
                    }
                    if (data.nextPlayerId == playerId) {
                        setOtherPlay(false);
                    }
                }
                if (data.isBingo) {
                    setBingoPlayer(data.playerName);
                    setIsBingo(true)
                }
            }
        };

        // ON CONNECTION OPEN
        ws.onopen = () => {
            logInfo('WEBSOCKET CONNECTED ✔')
        };

        // ON CONNECTION CLOSE
        ws.onclose = () => {
            logInfo('WEBSOCKET DISCONNECTED 👋')
        };

        setSocket(ws);

        console.log(bingo)

        return () => { ws.close() };

    }, []);

    useEffect(() => {
        const isBingo = IsBingo(bingo);
        setIsBingo(isBingo)
    }, [bingo])

    useEffect(() => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(toStringify({ id: playerId, playerName: playerName, isBingo: isBingo }));
        }
    }, [isBingo])

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
        if (forDifferentPlayer && socket && socket.readyState === WebSocket.OPEN) {
            setOtherPlay(true)
            socket.send(toStringify({ id: playerId, playerName: playerName, isBingoPlay: true, value: crossElement }));
        }
    }

    const style = { fontStyle: 'italic', color: 'white', fontSize: 'bold', paddingTop: '10px', width: '75%', margin: 'auto' }

    return (
        <>
            <h2 style={{ ...style, color: 'green' }}>Player: {playerName}</h2>
            {otherPlay && <h2 style={{ ...style, color: 'red' }}>Other Player Choosing...</h2>}
            {isBingo && <h2 style={style}>{`${bingoPlayer} Win Bingo 🎉🎉`}</h2>}
            <Bingo bingo={bingo} otherPlay={otherPlay} setCrossSelectElement={setCrossSelectElement} />
            <Chat messages={messages} socket={socket} playerId={playerId} playerName={playerName} />
        </>
    );
};

export default App;