import './bingo.css'
const Bingo = ({ bingo, setCrossSelectElement, otherPlay }) => {

    const getBoxStyle = (element) => {
        return element.crossed ? 'bingo-element-box crossed-box disabled' : 'bingo-element-box';
    }

    const bingoStyle = otherPlay ? 'bingo-board disabled' : 'bingo-board';

    return (
        <div className={bingoStyle}>
            {
                bingo.map(e => {
                    return (
                        <div className='bingo-container'>
                            {e.map(b => <div className={getBoxStyle(b)} onClick={() => setCrossSelectElement(b.value)} key={b.x + b.y}>{b.value}</div>)}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Bingo;