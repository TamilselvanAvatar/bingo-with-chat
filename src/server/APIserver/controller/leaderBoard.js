const userDB = require('../mongoSchema/user');
const USER = require('../constants/userModal');
const { RESPONSES } = require('../../../helper/generalConstants');
const { nested } = require('../../../helper/common')

const leaderBoardModel = (userInfo, index) => {
    return ({
        id: userInfo._id,
        rank: (index + 1),
        [USER.USER_NAME]: userInfo[USER.USER_NAME],
        [USER.GAME.NO_OF_MATCHES]: userInfo[USER.GAMES][USER.GAME.NO_OF_MATCHES],
        [USER.GAME.NO_OF_WINS]: userInfo[USER.GAMES][USER.GAME.NO_OF_WINS],
        [USER.GAME.POINTS]: userInfo[USER.GAMES][USER.GAME.POINTS],
    })
}

const updateRank = (usersDetails = []) => {
    return usersDetails.map(leaderBoardModel)
}

const getLeaderBoard = async (req, res) => {
    try {
        const gamesPoints = nested(USER.GAMES, USER.GAME.POINTS);
        const gamesNoMatches = nested(USER.GAMES, USER.GAME.NO_OF_MATCHES);
        const gamesNoWins = nested(USER.GAMES, USER.GAME.NO_OF_WINS);
        const usersDetails = await userDB.find({ [USER.GAMES]: { '$exists': true } }, null, { sort: { [gamesPoints]: -1, [gamesNoMatches]: -1, [gamesNoWins]: -1 }, limit: 20 })
        return res.status(200).json(RESPONSES.SUCCESS_REPONSE(updateRank(usersDetails)))
    } catch (err) {
        console.error(err);
        return res.status(500).json(RESPONSES.UNKNOWN_ERROR(err));
    }
}

module.exports = {
    getLeaderBoard: getLeaderBoard
};