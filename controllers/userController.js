const { User } = require('../models')

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status.json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err))
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },
    updateUser(req, res) {
        const { username, email } = req.body
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { username, email },
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },
    addFriend(req, res) {
        const { userId, friendId } = req.params;
        User.findById(userId)
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'No user found with that ID' })
                } else {
                    User.findById(friendId)
                        .then(friend => {
                            if (!friend) {
                                res.status(404).json({ message: 'No user found with that ID' })
                            } else if (user.friends.includes(friendId)) {
                                res.status(400).json({ message: 'That user is already in your friends list' })
                            } else {
                                user.friends.push(friendId)
                                user.save()
                                    .then(updatedUser => {
                                        res.status(200).json(updatedUser)
                                    })
                                    .catch(err => {
                                        res.status(500).json(err)
                                    })
                            }
                        }
                        )
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })

    },
    deleteFriend(req, res) {
        const { userId, friendId } = req.params;
        User.findById(userId)
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'No user found with that ID' })
                } else {
                    User.findById(friendId)
                        .then(friend => {
                            if (!friend) {
                                res.status(404).json({ message: 'No user found with that ID' })
                            } else {
                                let index = user.friends.indexOf(friendId)
                                if (index > -1){
                                    user.friends.splice(index, 1)
                                }
                                user.save()
                                    .then(updatedUser => {
                                        res.status(200).json(updatedUser)
                                    })
                                    .catch(err => {
                                        res.status(500).json(err)
                                    })
                            }
                        }
                        )
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }
}