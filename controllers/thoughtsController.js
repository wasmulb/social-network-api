const { Thought, Reaction, User } = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status.json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    createThought(req, res) {
        User.findById(req.body.userId)
        .then((user)=> {
            return Thought.create({
                thoughtText: req.body.thoughtText,
                username: req.body.username,
                userId: req.body.userId
            })
            .then((thought)=> {
                user.thoughts.push(thought._id);
                return user.save();
            })
            .then((user) => {
                res.json(user);
            })
            .catch((err)=> res.status(500).json(err));
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
    },
    updateThought(req, res) {
        const { thoughtText } = req.body
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { thoughtText },
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    createReaction(req, res) {
        Thought.findById(req.params.thoughtId)
            .then((thought) => {
                const newReaction = new Reaction({
                    reactionText: req.body.reactionText,
                    username: req.body.username,
                });

                thought.reactions.push(newReaction);

                return thought.save();
            })
            .then((thought) => {
                res.json(thought);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    deleteReaction(req, res){
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought){
                    res.status(404).json({ message: 'No thought found with that ID'})
                } else {
                    for(i=0; i<thought.reactions.length; i++){
                        if(thought.reactions[i]._id == req.params.reactionId){
                            thought.reactions.splice(i, 1)
                        }
                        thought.save()
                    .then(updatedThought => {
                        res.status(200).json(updatedThought)
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
                    }
                }
             })
            .catch((err) => res.status(500).json(err))
    },
}