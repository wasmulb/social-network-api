const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, maxLength: 280, minLength: 1},
        createdAt: { type: Date, required: true, unique: true},
        username: { type: String, required:true, },
        reactions: {},
    }
)

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;