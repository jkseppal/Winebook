const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
  wine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wine'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String,
  points: Number
})

reviewSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Review', reviewSchema)