export const RESPONSE = (status, msg, code, error, data) => ({ status, msg, code, error, data })

export const ERROR_CODE = {
    INVALID_DATA: 'INVALID_DATA',
    INVALID_USER_NAME: 'INVALID_USER',
    INVALID_PASSWORD: 'INVALID_PASSWORD',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
    USER_ALREADY_EXIST: 'USER_ALREADY_EXIST'
}

export const SUCCESS_CODE = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    GENERAL_SUCCESS: 'GENERAL_SUCCESS'
}

export const DASHBOARD = {
    HOME: 'HOME',
    GAME_PLAY: 'GAME_PLAY',
    FRIENDS: 'FRIENDS',
    LEADER_BORAD: 'LEADER_BOARD',
    SETTINGS: 'SETTINGS',
    LOGOUT: 'LOGOUT',
}

export const RESPONSES = {
    UNKNOWN_ERROR: (err) => (RESPONSE(500, 'Something went wrong', ERROR_CODE.UNKNOWN_ERROR, err)),
    LOGIN_SUCCESS: (msg) => (RESPONSE(200, msg, SUCCESS_CODE.LOGIN_SUCCESS)),
    GENERAL_SUCCESS: (msg) => (RESPONSE(200, msg, SUCCESS_CODE.GENERAL_SUCCESS)),
    INVALID_DATA: (err) => (RESPONSE(400, 'Invalid Parameters', ERROR_CODE.INVALID_DATA, err)),
    INVALID_USER: () => (RESPONSE(400, 'Invalid User/Password', ERROR_CODE.INVALID_USER_NAME)),
    INVALID_PASSWORD: () => (RESPONSE(400, 'Invalid User/Password', ERROR_CODE.INVALID_PASSWORD)),
    USER_ALREADY_EXIST: () => (RESPONSE(400, 'User Already Exist', ERROR_CODE.USER_ALREADY_EXIST)),
    SUCCESS_REPONSE: (data) => (RESPONSE(200, 'Success', 'SUCCESS', null, data))
}

export function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000);
}