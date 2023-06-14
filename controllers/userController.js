import User from "../models/User.js"
import Post from '../models/Post.js'

const getUser = async(req, res, next) =>{
   try {
     const {userName} = req.body
     const getUser = await User.findOne({userName: userName})
     res.send(getUser)
   } catch (error) {
    next(error)
   }
}
const getUserPosts = async(req, res, next) =>{
    try {
        const {userName} = req.body
        const getUserPosts = await Post.find({author: userName})
        res.send(getUserPosts)
    } catch (error) {
        
    }
}
const getUserFriends = async(req, res, next) =>{
  try {
      const {userName} = req.body
      const getUserFriends = await User.findOne({userName: userName})
      const friends = getUserFriends.followers
      res.send(friends)
  } catch (error) {
      
  }
}
const addUserFriend = async(req, res, next) =>{
  try {
    const {friendAdd, userName} = req.body
    const addFriend = await User.updateOne({userName: userName}, {$addToSet: {followers: friendAdd}})
    res.send(addFriend)
  } catch (error) {
    next(error)
  }
}
const deleteUserFriend = async(req, res, next) =>{
  try {
    const {friendRemove, userName} = req.body
    const delFriend = await User.updateOne({userName: userName}, {$pull: {followers: friendRemove}})
    res.send(delFriend)
  } catch (error) {
    next(error)
  }
}
const checkFriend = async (req, res, next) => {
  try {
    const { userName, friend } = req.body;
    const getUser = await User.findOne({userName: userName})

    const isFriend = getUser.followers.indexOf(friend);
    if(isFriend!=-1){
      res.send(true)
    }
    else{
      res.send(false)
    }

  } catch (error) {
    next(error);
  }
};

const getFollowingPost = async (req, res, next) => {
  try {
    const { userName } = req.body;
    const allUsers = await User.find({ followers: { $in: [userName] } }).select('_id');
    const userIds = allUsers.map(user => user._id);
    const allPosts = await Post.find({ userId: { $in: userIds } });
    res.send(allPosts);
  } catch (error) {
    next(error);
  }
};


export {getUser, getUserPosts, addUserFriend, getUserFriends, deleteUserFriend, checkFriend, getFollowingPost}