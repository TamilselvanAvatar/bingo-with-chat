import { useState } from 'react';
import BingoBoard from './App';
import './main.css'

export default () => {
    const [playerNme, setPlayerName] = useState('');
    const [login, setLogin] = useState(false);

    const setBingoBoard = () => {
        setLogin(true);
    }

    const logger = (
        <div className='player-container'>
            <input className='input-player' placeholder='Type Player Name' onChange={e => setPlayerName(e.target.value)} />
            <button className='btn-next' disabled={playerNme.length == 0} onClick={setBingoBoard}>Next</button>
        </div>
    )

    return !login ? logger : <BingoBoard playerName={playerNme} />;
}