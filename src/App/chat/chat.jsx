import { toStringify } from '../../helper/util'
import { useState } from 'react';
import { getChatMessage } from '../../helper/config'
import ShowMessages from './showMessages';
import './chat.css'
const Chat = ({ socket, messages, playerName, playerId }) => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(toStringify(getChatMessage(playerId, playerName, message)));
            setMessage('');
        }
    };
    return (
        <div className='chat-container'>
            <ShowMessages id={playerId} messages={messages} />
            <div className='message'>
                <input className='input border' placeholder='Type Message' value={message} onChange={e => setMessage(e.target.value)} />
                <button className='btn border' disabled={message.length == 0} onClick={sendMessage}> ➤ </button>
            </div>
        </div>
    )
}
export default Chat;