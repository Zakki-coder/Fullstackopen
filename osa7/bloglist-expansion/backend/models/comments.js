const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: [true, 'Blog missing for comment']
  },
  comment: {
    type: String,
    required: [true, 'Empty comment']
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
