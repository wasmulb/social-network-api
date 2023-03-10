const { User } = require('../models')

module.exports = {
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status.json(err));
    },
    getSingleUser(req, res) {
        console.log(req.params)
        User.findOne({ _id: req.params.userId})
        .then((user)=> 
        !user
        ? res.status(404).json({ message: 'No user found with that ID'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err))
    }
}