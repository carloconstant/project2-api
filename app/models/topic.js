const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  side1: {
    type: String,
    required: true,
    unique: true
  },
  side2: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
})
module.exports = mongoose.model('Topic', topicSchema)
