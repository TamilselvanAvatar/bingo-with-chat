const userDB = require('../mongoSchema/user');
const USER = require('../constants/userModal');
const { RESPONSES } = require('../../../helper/generalConstants');
const { Types } = require("mongoose");

const fetchFriendsOfUser = async (req, res) => {
    try {
        const user = await userDB.find({ '_id': { '$in': [new Types.ObjectId(req.params.userId)] } })
        const userFriends = user?.[0]?.toJSON()?.friends || [];
        const friendsIds = userFriends?.map(friend => new Types.ObjectId(friend[USER.FRIEND.USER_ID]));
        const friends = await userDB.find({ '_id': { '$in': friendsIds } });
        const friendsModal = friends.map(friend => friend.toJSON());
        const friendsList = userFriends?.map(friend => {
            const friendInfo = friendsModal.find(friendModal => friendModal._id.toString() === friend[USER.FRIEND.USER_ID]) || {};
            return { ...friend, ...friendInfo };
        });
        return res.status(200).json(RESPONSES.SUCCESS_REPONSE(friendsList))
    } catch (err) {
        console.error(err);
        return res.status(500).json(RESPONSES.UNKNOWN_ERROR(err));
    }
}

module.exports = {
    fetchFriendsOfUser: fetchFriendsOfUser
};