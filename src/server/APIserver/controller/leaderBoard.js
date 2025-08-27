const userDB = require('../mongoSchema/user');
const USER = require('../constants/userModal');
const { RESPONSES } = require('../../../helper/generalConstants');
const { nested } = require('../../../helper/common')
const { groupBy, keys } = require('../../../helper/util');

const leaderBoardModel = (userInfo) => {
    return ({
        id: userInfo._id,
        rank: userInfo.rank,
        [USER.USER_NAME]: userInfo[USER.USER_NAME],
        [USER.GAME.NO_OF_MATCHES]: userInfo[USER.GAMES][USER.GAME.NO_OF_MATCHES],
        [USER.GAME.NO_OF_WINS]: userInfo[USER.GAMES][USER.GAME.NO_OF_WINS],
        [USER.GAME.POINTS]: userInfo[USER.GAMES][USER.GAME.POINTS],
    })
}

const setRankBasedOnPoints = (userDetailsByPoints) => {
    keys(userDetailsByPoints).sort((a, b) => a <= b ? 1 : -1).forEach((point, index) => {
        const players = userDetailsByPoints[point];
        const rank = index + 1;
        players && players.forEach(player => {
            player.rank = rank
        })
    })
}

const updateRank = (usersDetails = [], playerId = '', limit = 20) => {
    const userDetailsByPoints = groupBy(usersDetails, (player) => player[USER.GAMES][USER.GAME.POINTS]);
    setRankBasedOnPoints(userDetailsByPoints);
    const currentPlayer = usersDetails.find(player => player._id.toString() === playerId);
    const result = [];
    if (currentPlayer) {
        result.push(leaderBoardModel(currentPlayer));
    }
    for (let i = 0; i < limit; i++) {
        const player = usersDetails[i];
        if (!player || currentPlayer?._id === player?._id) {
            continue;
        }
        result.push(leaderBoardModel(player));
    }
    return result;
}

const getLeaderBoard = async (req, res) => {
    try {
        const points = req?.query?.points || 0;
        const gamesPoints = nested(USER.GAMES, USER.GAME.POINTS);
        const gamesNoMatches = nested(USER.GAMES, USER.GAME.NO_OF_MATCHES);
        const gamesNoWins = nested(USER.GAMES, USER.GAME.NO_OF_WINS);
        const usersDetailsModel = await userDB.find({ [USER.GAMES]: { '$exists': true }, [gamesPoints]: { '$gte': points } }, null, { sort: { [gamesPoints]: -1, [gamesNoMatches]: -1, [gamesNoWins]: -1, createdAt: -1 } })
        const usersDetails = usersDetailsModel.map(model => model.toJSON());
        return res.status(200).json(RESPONSES.SUCCESS_REPONSE(updateRank(usersDetails, req?.query?.id)));
    } catch (err) {
        console.error(err);
        return res.status(500).json(RESPONSES.UNKNOWN_ERROR(err));
    }
}

module.exports = {
    getLeaderBoard: getLeaderBoard
};