const mongoose = require('mongoose')

const wineSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  region: String,
  grapes: String,
  type: String,
  country: String,
  appellation: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})

wineSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Wine = mongoose.model('Wine', wineSchema)

module.exports = Wine