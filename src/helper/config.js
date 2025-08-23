const formMessage = (playerId, playerName, message) => {
    return {
        id: playerId,
        message: message,
        dateTime: new Date(),
        playerName: playerName,
    };
}

export const MESSAGE_TYPE = {
    INIT: 'INIT',
    CHAT: 'CHAT',
    BINGO_PLAY: 'BINGO_PLAY',
    IS_BINGO: 'IS_BINGO',
    CREATE_ROOM: 'CREATE_ROOM'
}

export const getChatMessage = (playerId, playerName, message) => {
    const formedMessage = formMessage(playerId, playerName, message);
    formedMessage.type = MESSAGE_TYPE.CHAT;
    return formedMessage;
}

export const getBingoMessage = (playerId, playerName, message) => {
    const formedMessage = formMessage(playerId, playerName, message);
    formedMessage.type = MESSAGE_TYPE.BINGO_PLAY;
    return formedMessage;
}

export const isBingoMessage = (playerId, playerName) => {
    const formedMessage = formMessage(playerId, playerName, `${playerName} won the BINGO`);
    formedMessage.type = MESSAGE_TYPE.IS_BINGO;
    return formedMessage;
}

export const initializePlayer = (id) => {
    return {
        type: MESSAGE_TYPE.INIT,
        message: id
    }
}