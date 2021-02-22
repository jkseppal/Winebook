const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  blogEntries: [
    {
      entryTitle: {
        type: String,
      },
      entryContent: {
        type: String,
      },
      entryDate: {
        type: String
      },
      likes: {
        type: Number
      },
      comments: [
        {
          text: {
            type: String
          },
          user: {
            type: String
          },
          commentDate: {
            type: String
          }
        }
      ]
    }
  ]
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog