import { toStringify, debounce } from '../../helper/util'
import { useState, useCallback } from 'react';
import ShowMessages from './showMessages';
import './chat.css'
const Chat = ({ socket, messages, playerName, playerId }) => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        const dateTime = new Date();
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(toStringify({ id: playerId, dateTime: dateTime, playerName: playerName, isChat: true, message: message }));
            setMessage('');
        }
    };
    const handleSetMessage = useCallback(
        debounce((value) => {
            setMessage(value)
        }, 1000),
        []
    );
    return (
        <div className='container'>
            <ShowMessages id={playerId} messages={messages} />
            <div className='message'>
                <input className='input border' placeholder='Type Message' value={message} onChange={e => setMessage(e.target.value)} />
                <button className='btn border' disabled={message.length == 0} onClick={sendMessage}> ➤ </button>
            </div>
        </div>
    )
}
export default Chat;