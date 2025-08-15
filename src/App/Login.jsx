import { useState } from 'react';
import BingoBoard from './App';
import './main.css'

export default () => {
    const [playerNme, setPlayerName] = useState('');
    const [login, setLogin] = useState(false);

    const setBingoBoard = () => {
        setLogin(true);
    }

                    //     <div className='input-group'>
                    //     <input placeholder='Enter the User Name' type='text' onChange={e => { setLoginInfo(pre => ({ ...pre, userName: e.target.value })) }} />
                    // </div>
                    // <div className='input-group'>
                    //     <input placeholder='Enter the Password' type='password' onChange={e => { setLoginInfo(pre => ({ ...pre, password: e.target.value })) }} />
                    // </div>
                    // <button className="auth-button color-check5" onClick={e => { console.log(loginInfo) }}>Login</button>
                    // <button className="auth-button color-check6" onClick={e => { console.log(loginInfo) }}>Login</button>
                    // <button className="auth-button color-check7" onClick={e => { console.log(loginInfo) }}>Login</button>

    const logger = (
        <div className='player-container'>
            <input className='input-player' placeholder='Type Player Name' onChange={e => setPlayerName(e.target.value)} />
            <button className='btn-next' disabled={playerNme.length == 0} onClick={setBingoBoard}>Next</button>
        </div>
    )

    return !login ? logger : <BingoBoard playerName={playerNme} />;
}