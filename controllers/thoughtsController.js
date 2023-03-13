const { Thought } = require('../models')

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
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
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
                const newReaction = new reactionSchema({
                    reactionText: req.body.reactionBody,
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
}