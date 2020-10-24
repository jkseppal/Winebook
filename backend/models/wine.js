const mongoose = require('mongoose')

const wineSchema = mongoose.Schema({
  name: String,
  area: String,
  grapes: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
})

wineSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Wine', vineSchema)