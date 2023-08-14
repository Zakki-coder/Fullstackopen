const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'Url property missing']
  },
  title: {
    type: String,
    required: [true, 'Title property missing']
  },
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number,
    default: 0
  }
})

blogSchema.set('toJSON', {
  transform: (document, retrunedObject) => {
    retrunedObject.id = retrunedObject._id.toString()
    delete retrunedObject._id
    delete retrunedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog