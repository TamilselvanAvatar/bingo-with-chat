const userDB = require('../mongoSchema/user');
const { Types } = require("mongoose");
const USER = require('../constants/userModal');
const { RESPONSES } = require('../../../helper/generalConstants');
const { nested } = require('../../../helper/common')
const { groupBy, keys } = require('../../../helper/util');

const GAMES_POINTS = {
    DRAW: 1,
    WIN: 3,
    LOSS: 0,
}

const updateUserModelForPoints = (user) => {
    return (
        {
            updateOne: {
                filter: { '_id': user._id },
                update: { '$set': { [USER.GAMES]: user[USER.GAMES] } }
            }
        }
    )
}

const updateUsersPointsBasedOnInputInfo = (input, userDetails) => {
    const usersById = groupBy(input, ['id'])
    for (const user of userDetails) {
        const games = user[USER.GAMES];
        const inputInfo = usersById[user._id.toString()]
        if (games) {
            games[USER.GAME.NO_OF_MATCHES] = games[USER.GAMES][USER.GAME.NO_OF_MATCHES] + 1;
            games[USER.GAME.NO_OF_WINS] = games[USER.GAMES][USER.GAME.NO_OF_WINS] + (inputInfo.isPlayerWin ? 1 : 0);
            games[USER.GAME.POINTS] = games[USER.GAMES][USER.GAME.POINTS] + (inputInfo.isPlayerWin ? GAMES_POINTS.WIN : 0);
        }
    }
}

const updateUsersPoints = async (req, res) => {
    try {
        const users = req.body;
        const userIds = users?.map(user => Types.ObjectId(user.id));
        const userDetailsModel = await userDB.find({ '_id': { '$in': userIds } })
        const userDetails = userDetailsModel.map(model => model.toJSON());
        updateUsersPointsBasedOnInputInfo(users, userDetails);
        const getUserUpdatePointsModel = userDetails.map(updateUserModelForPoints);
        await userDB.collection.bulkWrite(getUserUpdatePointsModel);
        res.status(200).json(RESPONSES.SUCCESS_REPONSE({}))
    } catch (err) {
        console.error(err);
        return res.status(500).json(RESPONSES.UNKNOWN_ERROR(err));
    }
}

module.exports = {
    updateUsersPoints: updateUsersPoints
};