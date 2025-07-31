import { toJson } from '../../helper/util'
import { useState } from 'react'
import './chat.css'
export default ({ id, messages }) => {
    const [show, setShow] = useState(false);
    const isSameId = (currentId) => currentId === id;
    const messagesList = toJson(messages) || [];
    const boxStyle = (id) => {
        return {
            borderRadius: '5px',
            marginTop: '5px',
            marginBottom: '5px',
        }
    }
    const playerMessage = (id) => {
        const sameId = isSameId(id);
        return {
            backgroundColor: sameId ? '#6aff488b' : '#f55ed961',
            textAlign: sameId ? 'right' : 'left',
            fontSize: '12px',
            padding: '3px 4px',
            marginLeft: sameId ? 'auto' : '3px',
            width: sameId ? 'fit-content' : '100%',
            display: sameId ? 'block' : 'inline',
            borderRadius: '5px',
        }
    }
    const playerNameStyle = {
        marginLeft: '3px',
        color: '#ff0000ff',
        fontStyle: 'italic',
        fontSize: '10px',
        display: 'block'
    }
    return (
        <>
            <div className='showmessager'>
                <button disabled={!(messagesList.length > 0)} onClick={() => setShow(pre => !pre)} className='showMessages border' title={(!show ? 'Show' : 'Close') + 'Messages'}>{!show ? '▲' : '▼'}</button>
            </div>
            {show && messagesList.length > 0 && <div className='chatbox'>
                {messagesList.map((message, i) => {
                    return (
                        <div key={message?.id + i} style={boxStyle(message?.id)}>
                            {!isSameId(message?.id) && <span style={playerNameStyle}>{message?.playerName}</span>}
                            <span style={playerMessage(message?.id)}>{message?.message}</span>
                        </div>
                    )
                })}
            </div>
            }
        </>
    )
} 