const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        // reactionId: {type: ObjectId},
        reactionText: {type: String, required: true, maxLength: 280 },
        username: {type: String, required: true},
        createdAt: { type: Date, default: Date.now },
        
    },
)

const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, maxLength: 280, minLength: 1},
        createdAt: { type: Date, default: Date.now },
        username: { type: String, required:true, },
        reactions: [
            reactionSchema
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema
.virtual('reactionCount')
.get(function () {
    return this.reactions.length
})

const Reaction = model('Reaction', reactionSchema);
const Thought = model('Thought', thoughtSchema);

module.exports = {Thought, Reaction};