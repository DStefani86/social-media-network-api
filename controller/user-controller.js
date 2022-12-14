const { User, Thought } = require("../models");


const userController = {
  createUser(req, res) {
    User.create(req.body).then((data) => res.json(data));
  },
  getAllUser(req, res) {
    User.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  getOneUser({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  deleteUser({ params }, res) {
    Thought.deleteMany({ userId: params.id })
      .then(() => {
        User.findOneAndDelete({ userId: params.id }).then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No User found with this id!" });
            return;
          }
          res.json(dbUserData);
        });
      })
      .catch((err) => res.json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((dbUserData) => {
      console.log('data: ', dbUserData)
      if (!dbUserData) {
        res.status(404).json({ message: "No User found with this id!" });
        return;
      }
      
      res.json(dbUserData);
    });
  },
addFriend({ params }, res) {
  User.findOneAndUpdate(
    { _id: params.userId },
    { $push: { friends: params.friendId } },
    { new: true }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
},

deleteFriend({ params }, res) {
  User.findOneAndUpdate(
    { _id: params.userId },
    { $pull: { friends: params.friendId } },
    { new: true }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
}
};
module.exports = userController;
