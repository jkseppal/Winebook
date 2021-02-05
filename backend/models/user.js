const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
    required: true
  },
  name: {
    type: String,
    minlength: 5,
    required: true
  },
  email: {
    type: String,
    unique: true,
    minlength: 3
  },
  showEmail: {
    type: Boolean,
  },
  passwordHash: String,
  description: String,
  facebook: String,
  showFacebook: Boolean,
  instagram: String,
  showInstagram: Boolean,
  twitter: String,
  showTwitter: Boolean,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  wines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wine'
    }
  ],
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User